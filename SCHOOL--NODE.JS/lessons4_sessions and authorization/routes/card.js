//--Корзина

const { Router } = require('express')
const Course = require('../models/course')
const router = Router()
const auth = require('../middleware/auth')                         //№55 - Защита роутов



function mapCartItems(cart) {                       //({  обьект
	return cart.items.map(c => ({
		                    //возвращаем новый обьект которой содержит нужные нам поля
		...c.courseId._doc,
		id: c.courseId.id,                           //№47 - Трансформация данных на клиенте    
		count: c.count
		
	}))
	
}

function computePrice(courses) {
	return courses.reduce((total, course) => {
		return total += course.price * course.count
	}, 0)
}



router.post('/add', auth, async (req, res) => {                    //позволяет новый курс добавить в корзину
	const course = await Course.findById(req.body.id)            //№44 - Добавление товара в корзину   изменил get на find
	await req.user.addToCart(course)                      //await чтобы node подождал пока выполн данный запрос №44 - Добавление товара в корзину
	res.redirect('/card')
})

router.delete('/remove/:id', auth, async (req, res) => {          //:id' динамический id                       //auth №55 - Защита роутов
	//--№46 - Удаление из корзины
	await req.user.removeFromCart(req.params.id)             //params тк берем из адресной строки                //req.params.id - id курса котор нужно удалить 
	const user = await req.user.populate('cart.items.courseId').execPopulate()
	const courses = mapCartItems(user.cart)
	const cart = {
		courses,
		price: computePrice(courses)
	}
	//---------------------
		res.status(200).json(cart)
})


router.get('/', auth, async (req, res) => {                                              // auth №55 - Защита роутов
	const user = await req.user                         //создаем пользователя  // req.user пользователь
		.populate('cart.items.courseId')                     //путь 'cart.items.coursesId'
		.execPopulate()
	const courses = mapCartItems(user.cart)
	res.render('card', {
		title: 'Корзина',
		isCard: true,                //чтобы навигация отображ корректно
		courses: courses,
		price: computePrice(courses)
	})
})

module.exports = router