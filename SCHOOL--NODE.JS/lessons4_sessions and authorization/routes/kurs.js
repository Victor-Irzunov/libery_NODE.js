const { Router } = require('express')                           //можно const express.Router  //но сразу же заберем что нас интересует {Router}
const Course = require('../models/course')                      //получить списоккурсов изфайла
const router = Router()
const auth = require('../middleware/auth')                         //№55 - Защита роутов


//* Задача получ все курс какие есть в БД           //просматривать
router.get('/', async (req, res) => {                           //обрабатывать различные запросы  // '/' показывает кокой url мы обрабатываем
	const courses = await Course.find()                          //.find() если без парам то значит все курсы с БД
		                                                         //? в mongoose очень удобно с помьщью этих методов настраивать взаимосвязь //#43 Добавление пользователя 
		.populate('userId', 'email name')                         //.populate() вместо id получ полноцен данные  //#43 Добавление пользователя 
		.select('price title img')                                //.select() какие имено поля достать из БД  //#43 Добавление пользователя 

	// console.log(courses, 'курсы курсы курсы ----------kurs.js string14')

	res.render('kurs', {                                         //метод гет который выдает нам страницу курос
		title: "курсыыы",
		isKurs: true,
		courses                                                   //передаем в страницу
	})
})

//--№30 - Динамические параметры (редоктировать курс) обработчик
router.get('/:id/edit', auth, async (req, res) => {                        //страница отвеч за редоктир                     //auth №55 - Защита роутов
	if (!req.query.allow) {                                           //query параметрт отвечает что можем редак курс
		return res.redirect('/')                                      //return чтобы ф-ция не продолжалась
	}

	const course = await Course.findById(req.params.id)

	res.render('course-edit', {
		title: `Редактировать ${course.title}`,
		course
	})
})

router.post('/edit', auth, async (req, res) => {                                 //auth №55 - Защита роутов
	const { id } = req.body
	delete req.body.id
	await Course.findByIdAndUpdate(id, req.body)    //monoose по умолчанию задаёт id через _id здесь мы его убираем
	res.redirect('/kurs')
})
//----------------------№30 end

//* -------------------№41 - Удаление курса
router.post('/remove', auth, async (req, res) => {                           //auth №55 - Защита роутов
	try {
		await Course.deleteOne({ _id: req.body.id })           //указываем какой курс необходимо удалить
		res.redirect('/kurs')
	}
	catch (e) {
		console.log(e)
	}
})
//* ------------------№41 end

//-- №29 - Динамические параметры   №40 Получение отдельного курса
router.get('/:id', async (req, res) => {                              //'/:id' динамичный
	const course = await Course.findById(req.params.id)
	res.render('course', {
		layout: 'empty',                           //в новой странице
		title: `Курс ${course.title}`,
		course
	})
})
//------------------------№29/№40 end

module.exports = router