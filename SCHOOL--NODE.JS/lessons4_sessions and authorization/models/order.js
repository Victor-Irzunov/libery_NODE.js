// №48 - Подготовка страницы заказов
const { Schema, model } = require('mongoose')

const orderSchema = new Schema({            //те поля которые присутствуют у каждого из заказа (какие курс и какой польз)№48 - Подготовка страницы заказов
	//курсы №48 - Подготовка страницы заказов
	courses: [
		{
			course: {
				type: Object,
				required: true
			},
			count: {
				type: Number,
				required: true
			}
		}
	],
	//пользователь №48 - Подготовка страницы заказов
	user: {
		name: String,
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',                            //ref на модель пользователя, чтобы моглди делать populate №48 - Подготовка страницы заказов
			required: true
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
})


module.exports = model('Order', orderSchema)