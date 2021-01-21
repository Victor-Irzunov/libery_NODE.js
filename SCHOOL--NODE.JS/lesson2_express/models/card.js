//--Корзина
const path = require('path')
const fs = require('fs')

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'card.json'
)

class Card {
	static async add(course) {                        //чтобы добавить чтонибудь в корзину
		const card = await Card.fetch()

		const idx = card.courses.findIndex(c => c.id === course.id) //увелич кол-во (провер есть ли такойже курс в корзине)

		const candidate = card.courses[idx]

		if (candidate) {
			//курс уже есть
			candidate.count++
			card.courses[idx] = candidate
		}
		else {
			//нужно добавить
			course.count = 1         //тк курс static async add(course) { это обьект мы можем делать чтотзь  угодно //добавл поле count равн 1
			card.courses.push(course)
		}


		card.price += +course.price  //указываем общую стоимость в корзине

		return new Promise((resolve, reject) => {                  //обратно записываем в json 
			fs.writeFile(p, JSON.stringify(card), err => {           //(p,  путь уже заюит в переменной p
				if (err) {
					reject(err)
				}
				else {
					resolve()
				}
			})
		})
	}

	static async remove(id) {                     //метод remove будет получать id которыйнам необходмо удалить
		const card = await Card.fetch()               //обратимся к модеоли и получ данные из БД
		
		const idx = card.courses.findIndex(c => c.id === id)        //.findIndex( найдем курс
		const course = card.courses[idx]                                   //положим в отдельную перем

		if (course.count === 1) {
			//удалить
			card.courses = card.courses.filter(c => c.id !== id)  //такая логика позволить удалить нужжный элем
		}
		else {
			//изменить
			card.courses[idx].count--
		}

		//перещитываем цену
		card.price -= course.price

		//перезап что получ в корину
		return new Promise((resolve, reject) => {                  //обратно записываем в json 
			fs.writeFile(p, JSON.stringify(card), err => {           //(p,  путь уже заюит в переменной p
				if (err) {
					reject(err)
				}
				else {
					resolve(card)
				}
			})
		})
}




	static async fetch() {
		return new Promise((resolve, reject) => {
			fs.readFile(p, 'utf-8', (err, content) => {
				if (err) {
					reject(err)
				}
				else {
					resolve(JSON.parse(content))
				}
			})
		})
	}
}

module.exports = Card