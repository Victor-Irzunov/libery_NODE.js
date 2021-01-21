const { Router } = require('express')                              //можно const express.Router  //но сраже заберем что нас интересует {Router}
const router = Router()
const Course = require('../models/course')


router.get('/', (req, res) => {                                           //обрабатывать различные запросы          //         '/' показывает кокой url мы обрабатываем
	res.render('add', {
		title: 'Добавитььь',
		isAdd: true
	})
})

router.post('/', async (req, res) => {
	// console.log(req.body, '*/-/--******--**---///')
	const course = new Course(req.body.title, req.body.price, req.body.img)                        //результатом констрактора
	
	await course.save()                                 //тк возвращает промис можем подождать с помощью await

	res.redirect('/kurs')
})

module.exports = router