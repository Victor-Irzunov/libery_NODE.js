// Раздел 2:Основы NodeJS
// №16 - Создание простого REST-сервера

const http = require('http')
const path = require('path')
const fs = require('fs')    //можем считывать опред файлы забирать их контент и отдовать пользователю в ответ

const server = http.createServer((req, res) => {
	if (req.method === 'GET') {                                //если есть гет запрос обычный
		res.writeHead(200, {                                       //то отдать html страницу
			'Content-Type': 'text/html; charset=utf-8'
		})

		if (req.url === '/') {                                                //проверяем какую страницу нужно отдать //можно испол swicg (свечу)
			fs.readFile(
				path.join(__dirname, 'views', 'index.html'),
				'utf-8',
				(err, content) => {
					if (err) {
						throw err
					}
					res.end(content)
				}
			)
		}
		else if (req.url === '/about') {
			fs.readFile(
				path.join(__dirname, 'views', 'about.html'),
				'utf-8',(err, content) => {
					if (err) {
						throw err
					}
					res.end(content)
				})
		}
		else if (req.url === '/api/users') {                        //обрабатываем и отдаем только лишь данные а не html
			res.writeHead(200, {
				'Content-Type': 'text/json'
			})
			const users = [                                //симетируем что сходили в БД и получили json и отдали книетну
				{ name: 'Victor', age: 36 },
				{name: 'Marat', age: 2}
			]

			res.end(JSON.stringify(users))
		}




//--------------------------------
	} else if (req.method === 'POST') {
		const body = []
		res.writeHead(200, {                          //браузеру сообщаю формат и кадировку (в Network вспомни)
			'Content-Type': 'text/html; charset=utf-8'
		})
		//делим все на чанки и буферирум опред парамет чтобы оптимизировать размер
		req.on('data', data => {         //тк req является наследником eventEmiter то обращаемся к методу .on  //слушаю событие 'data'
			// console.log(data)
			body.push(Buffer.from(data))    //передам обработанный буфер
		})

		req.on('end', () => {             //будем знать что данныевсе пришли
			// console.log(body)                           //[ <Buffer 74 69 74 6c 65 25 32 37 3d 35 35 35 35 35 35 35 35> ]
			// console.log(body.toString())                //title%27=55555555
			// console.log(body.toString().split('='))     //[ 'title%27', '55555555' ]
			// console.log(body.toString().split('=')[1])  //55555555

			const message = body.toString().split('=')[1]

			res.end(`
		<h1>Ваше собщение: ${message}</h1>
		`)
		})
	}
})
server.listen(3000, () => console.log('Server is running...'))