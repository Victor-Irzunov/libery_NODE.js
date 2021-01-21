// Раздел 2:Основы NodeJS
//№14 - Создание простого Web-сервера

const http = require('http')

const server = http.createServer((req, res) => {
	if (req.method === 'GET') {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		})
		res.end(`
		<h1>Form</h1>
		<form method='post' action='/'>
		<input name=title' type='text'>
		<button type='submit'>Send</button>
		</form>
	`)
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