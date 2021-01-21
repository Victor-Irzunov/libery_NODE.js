// №51 - Страница логина
const { Router } = require('express')
const router = Router()
const User = require('../models/user')                   //№53 - Сохранение сессии
const bcrypt = require('bcryptjs')                       //№59 - Шифрование пароля


router.get('/login', async (req, res) => {
	res.render('auth/login', {
		title: 'Авторизация',
		isLogin: true,
		loginError: req.flash('loginError'),                  //№61 - Сообщения об ошибке
		registerError: req.flash('registerError')             //№61 - Сообщения об ошибке
	})
})



//№52 - Добавление сессии            ВЫЙТИ
router.get('/logout', async (req, res) => {
	//очистить сесию
	// req.session.isAuthenticated = false
	//более элегант метод
	req.session.destroy(() => {                       //.destroy(    очищать данные из БД
		res.redirect('/auth/login#login')
	})
})



router.post('/login', async (req, res) => {
	try {                                          //№58 - Логин пользователя
		const { email, password } = req.body

		//когда мы делаем логи необх провер сущ такой польз или нет , если нет то это оибка и мы не можем войти в систем  //№58 - Логин пользователя
		const candidate = await User.findOne({ email })

		if (candidate) {

			//если польз сущ необх провер пороли на совпадение  //№58 - Логин пользователя
			// const areSame = password === candidate.password         //изменил №59 - Шифрование пароля

			const areSame = await bcrypt.compare(password, candidate.password)              //№59 - Шифрование пароля

			if (areSame) {
				// const user = await User.findById('5fc52a117e89691d50180028')             //№53 - Сохранение сессии       //он удалил №58 - Логин пользователя
				// req.session.user = user                                                         //№53 - Сохранение сессии  //user заменил  №58 - Логин пользователя

				req.session.user = candidate                       //№58 - Логин пользователя
				req.session.isAuthenticated = true                                 //своя перем isAuthenticated
				req.session.save(err => {
					if (err) {
						throw err
					}
					else {
						res.redirect('/')
					}
				})
			}
			else {
				req.flash('loginError', 'Неверный пароль')                   //№61 - Сообщения об ошибке
				res.redirect('/auth/login#login')
			}
		}
		else {
			req.flash('loginError', 'Такого польз не сущ')                      //№61 - Сообщения об ошибке
			res.redirect('/auth/login#login')
		}
	}
	catch (e) {
		console.log(e, '^^^^^^^^^^^^auth.js string 60^^^^^^^^^^^^^^')
	}
})




//№57 - Регистрация пользователя                                  //реализ регистрац чтобы создовать новых пользователей
router.post('/register', async (req, res) => {
	try {
		const { email, password, repeat, name } = req.body          //создаем нового польз на основе тех данных которые мы передаем из формы    //№57 - Регистрация пользователя

		//проверяем существует такой польз если сущест то ошобка    //№57 - Регистрация пользователя
		const candidate = await User.findOne({ email })
		if (candidate) {
			//если имеил такой есть сообщить польз что имеил уже занят     //№61 - Сообщения об ошибке
			req.flash('registerError', 'Польз с таким email уже существует')       //№61 - Сообщения об ошибке

			res.redirect('/auth/login#register')
		}
		else {                                                         //если польз нету то делаем регистрацию   //№57 - Регистрация пользователя
			const hashPassword = await bcrypt.hash(password, 10)                  //№59 - Шифрование пароля  //.hash( возвращает промис он асинхроный
			const user = new User({
				email, name, password: hashPassword, cart: { items: [] }                //тк клч и значение совподают то оставл так   //№57 - Регистрация пользователя  //: hashPassword  №59 - Шифрование пароля
			})
			await user.save()                                               //ждем когда пользователь сохраниться   //№57 - Регистрация пользователя
			res.redirect('/auth/login#login')                               //когда польз уже создан   //№57 - Регистрация пользователя
		}
	}
	catch (e) {
		console.log(e, '````````````auth.js sring 84```````````')
	}
})

module.exports = router