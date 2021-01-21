const { Router } = require('express')                              //можно const express.Router  //но сраже заберем что нас интересует {Router}
const router = Router()
const Course = require('../models/course')                          //№26 - Создание модели
const auth = require('../middleware/auth')                         //№55 - Защита роутов


router.get('/', auth, (req, res) => {             //обрабатывать различные запросы    //   '/' показывает кокой url мы обрабатываем        //auth №55 - Защита роутов
	res.render('add', {
		title: 'Добавитььь',
		isAdd: true
	})
})

router.post('/', auth, async (req, res) => {                       //router.post позволяет создать новый курс                //auth №55 - Защита роутов

	console.log(req.body, '*/-/--******--**---/// add.js string 16')

	const course = new Course({                           //№26 - Создание модели
		title: req.body.title,
		price: req.body.price,
		img: req.body.img,
		userId: req.user                 //id польз который создал курс #43 Добавление пользователя 
	})

	console.log(req.user, '--- add.js ___ удали-----строка 21')
	
	try {
		await course.save()     //тк возвращает промис можем подождать с помощью await //.save() идет в БД и сохраняет данную модель в опред колекции
		res.redirect('/kurs')
	}
	catch (e){
		console.log(e, 'add.js -------------------------------string 32')
	}
})

module.exports = router

//https://images.ua.prom.st/1440764527_w640_h640_1440764527.jpg
//https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png
//https://novator.io/wp-content/uploads/2018/06/XExE4dPWbYQ.jpg

//D:\Family Photos\photo5337194819396677252.jpg