//№48 - Подготовка страницы заказов

const { Router } = require('express')
const Order = require('../models/order')
const router = Router()
const auth = require('../middleware/auth')                         //№55 - Защита роутов


router.get('/', auth, async (req, res) => {           //получк=ение списка                  //auth №55 - Защита роутов
	
	//-- №49 - Получение данных заказов
	try {
		const orders = await Order.find({
			'user.userId': req.user._id       //указываем то id надо искат в модели			
		}).populate('user.userId')
		res.render('orders', {
			isOrder: true,
			title: 'Заказы',
			orders: orders.map(o => {
				return {
					...o._doc,
					price: o.courses.reduce((total, c) => {
					return total += c.count * c.course.price
					}, 0)
				}
			})
		})
	}
	catch (e) {
		console.log(e)
	}
	
})

router.post('/', auth, async (req, res) => {              //создание         //auth №55 - Защита роутов
	//--№49 - Получение данных заказов
	//при создании заказа получ все что есть в корзине №49 - Получение данных заказов

	try {
		const user = await req.user
		.populate('cart.items.courseId')
		.execPopulate()
	
	const courses = user.cart.items.map(i => ({
		count: i.count,
		course: {...i.courseId._doc}             //оператор spret (...) что бы развернуть весь этот обьект
	}))

	const order = new Order({
		user: {
			name: req.user.name,
			userId: req.user
		},
		courses: courses
	})

	await order.save()                        //подождать пока создат новый заказ
	await req.user.clearCart()             //почистить корзину

	res.redirect('/orders')                      //сделаем заказ и получим 
	}
	catch (e) {
		console.log(e)
	}
	
})

module.exports = router