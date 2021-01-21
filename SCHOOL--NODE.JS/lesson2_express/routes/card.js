//--Корзина

const { Router } = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()


router.post('/add', async (req, res) => {
	const course = await Course.getById(req.body.id)
	await Card.add(course)
	res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {          //:id' динамический id
	//передать в карточку id который хотим удалить
	const card = await Card.remove(req.params.id)                      //params потомучто он храниться в адресной строке //ф-ция будет возвращать обновленый обьект
	res.status(200).json(card)              //отвечем клиенту отпр карточкуобратно

	//логика будет находиться  в модели Card
})


router.get('/', async (req, res) => {
	const card = await Card.fetch()               //получаем всюкорзину
	res.render('card', {
		title: 'Корзина',
		isCard: true,                //чтобы навигация отображ корректно
		courses: card.courses,
		price: card.price
		
	})
})

module.exports = router