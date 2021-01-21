//!здесь описыаем св-ва данной модели в схеме(её регистрируем в mongoose, описываеи какие будут поля)
// №38 - Создание модели
const { Schema, model } = require('mongoose')     //{} забрать опред обьекты из пакета мангус //Schema класс // model ф-ция

const courseSchema = new Schema({                         //№47 - Трансформация данных на клиенте
	title: {                          //название курса
		type: String,
		required: true                 //обозначаем что данное поле необходимо для создания модели без него будет ошибка
	},
	price: {
		type: Number,
		required: true
	},
	img: String,
	userId: {                                       //у каждого курса есть id создателя курса #43 Добавление пользователя
		type: Schema.Types.ObjectId,
		ref: 'User'                             //должно совпадать с user.js   #43 Добавление пользователя
	}
})

//--№47 - Трансформация данных на клиенте  (_id)
courseSchema.method('toClient', function () {
	const course = this.toObject()                       //получаем обьект курса №47 - Трансформация данных на клиенте

	course.id = course._id
	delete course._id

	return course
})

module.exports = model('Course', courseSchema)           //№47 - Трансформация данных на клиенте


