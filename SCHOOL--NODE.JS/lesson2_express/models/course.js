const { v4: uuidv4 } = require('uuid')                       //v4  версия
const fs = require('fs')
const path = require('path')

class Course {
	constructor(title, price, img) {
		this.title = title
		this.price = price
		this.img = img
		this.id = uuidv4()
	}

	toJSON() {                     //добавить данные этого курса
		return {
			title: this.title,
			price: this.price,
			img: this.img,
			id: this.id
		}
	}
	
	//-- №30 - Динамические параметры

	static async update(course) {
		const courses = await Course.getAll()

		const idx = courses.findIndex(c => c.id === course.id) //получаем индекс
		courses[idx] = course                                       //у индекса заменяем обьект на обьект курс

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses),
				(err) => {
					if (err) {
						reject(err)
					}
					else {
						resolve()
					}
				}
			)
		})
	}
	//------- №30-end 

	async save() {                                  //медот будет сохранять все эти данные о курсе в файлы
		const courses = await Course.getAll()       //метод должен возвращать нам результаты //обраб промис
		courses.push(this.toJSON())

		console.log('Courses', courses)

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses),
				(err) => {
					if (err) {
						reject(err)
					}
					else {
						resolve()
					}
				}
			)
		})
	}

	static getAll() {                  //стат чтобы получ все данные о курсе (заполнил форму)
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'data', 'courses.json'),        //путь до того файла который необх подк
				'utf-8',
				(err, content) => {
					if (err) {
						reject(err)
					}
					else {
						resolve(JSON.parse(content)) //получае строку нужно распарсить
					}
				}
			)
		})
	}
	static async getById(id) {
		const courses = await Course.getAll()                  //.getAll() чтобыаолучить все курсы
		return courses.find(c => c.id === id)
	}
}

module.exports = Course