const { Router } = require('express')                              //можно const express.Router  //но сраже заберем что нас интересует {Router}
const router = Router()


router.get('/', (req, res) => {                                           //обрабатывать различные запросы          //         '/' показывает кокой url мы обрабатываем
	res.render('index', {
		title: "Главнаяяя",                                               //title закладки страницы
		isHome: true                                                       //переменную уникальную для active ссылки
	})
})

module.exports = router