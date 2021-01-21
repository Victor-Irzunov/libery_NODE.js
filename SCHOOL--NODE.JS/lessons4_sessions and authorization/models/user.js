//описание модели в mongoose №42 - Модель пользователя
const { Schema, model } = require('mongoose')

//создаем пользователя №42 - Модель пользователя
const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	name: String,
	password: {
		type: String,
		required: true
	},
	//своя корзина №42 - Модель пользователя
	//создаем карточку №42 - Модель пользователя
	cart: {                               //у каждого польз есть карта с сылкой на courseId для связки БД  #43 Добавление пользователя  
		items: [
			{
				//кол-во №42 - Модель пользователя
				count: {
					type: Number,
					required: true,
					default: 1             //если неукажем кол-во (count) будет 1 по умолчанию тк вначале мы добовляем один товар  №42 - Модель пользователя
				},
				//название продукта №42 - Модель пользователя
				courseId: {
					type: Schema.Types.ObjectId,               //mongoose будет проверять на тот формат с которым он работает  №42 - Модель пользователя
					ref: 'Course',                                //должна совпадать с course.js module.exports = model('Course', course)   №42 - Модель пользователя
					required: true
				}
			}
		]
	}
})

//--  №44 - Добавление товара в корзину
userSchema.methods.addToCart = function (course) {             //function важно тк this
	const items = [...this.cart.items]                    //№47 - Трансформация данных на клиенте  //... развернуть массив №44 - Добавление товара в корзину
	const idx = items.findIndex(c => {
		return c.courseId.toString() === course._id.toString()                              //если задаем Types.ObjectId то обязательно .toString()
	})
	//если idx найдется значит мы товар уже добавили надо увел кол-во  //если не нашелся то добавить в корзину
	if (idx >= 0) {
		items[idx].count = items[idx].count + 1
	}
	else {
		items.push({
			courseId: course._id,
			count: 1
		})
	}
	this.cart = { items: items }
	return this.save()
}

//--№46 - Удаление из корзины
userSchema.methods.removeFromCart = function (id) {
	let items = [...this.cart.items]
	const idx = items.findIndex(c => c.courseId.toString() === id.toString())

	if (items[idx].count === 1) {
		items = items.filter(c => c.courseId.toString() !== id.toString())
	}
	else {
		items[idx].count--
	}

	this.cart = { items }
	return this.save()
}

//--№49 - Получение данных заказов
//очистить корзину
userSchema.methods.clearCart = function () {
	this.cart = { items: [] }
	return this.save()

}

module.exports = model('User', userSchema)       //регистрируем новою модель юсер с схемой userSchema  №42 - Модель пользователя










