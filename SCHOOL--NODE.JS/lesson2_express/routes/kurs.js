const { Router } = require('express')                              //можно const express.Router  //но сразу же заберем что нас интересует {Router}
const Course = require('../models/course')                        //получить списоккурсов изфайла
const router = Router()


router.get('/', async (req, res) => {                                  //обрабатывать различные запросы  // '/' показывает кокой url мы обрабатываем
	const courses = await Course.getAll()                               //достаем с помущью getAll()
	res.render('kurs', {                                         //метод гет который выдает нам страницу курос
		title: "курсыыы",
		isKurs: true,
		courses                                                   //передаем в страницу
	})
})

//--№30 - Динамические параметры (редоктировать курс) обработчик
router.get('/:id/edit', async (req, res) => {                        //страница отвеч за редоктир
	if (!req.query.allow) {                                                //query параметрт отвечает что можем редак курс
		return res.redirect('/')                                      //return чтобы ф-ция не продолжалась
	}

	const course = await Course.getById(req.params.id)

	res.render('course-edit', {
		title: `Редактировать ${course.title}`,
		course
	})
})

router.post('/edit', async (req, res) => {
	await Course.update(req.body)
	res.redirect('/kurs')
})
//----------------------№30 end
//-- №29 - Динамические параметры
router.get('/:id', async (req, res) => {                              //'/:id' динамичный
	const course = await Course.getById(req.params.id)
	res.render('course', {
		layout: 'empty',                           //в новой странице
		title: `Курс ${course.title}`,
		course
	})
})
//------------------------№29 end
module.exports = router