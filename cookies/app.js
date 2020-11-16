//Node.js. Урок 7. Работа с сессиями и cookies     ITVDN
let express = require('express')
let app = express()
//---------------------отпр на серве cookie
// app.use((req, res) => {
// 	console.log(req.headers['cookie'])              //из колекции headers
// 	//отправ файл
// 	res.sendFile(__dirname + '/index.html')
// })
// app.listen(8002, ()=> console.log('Server started'))

//--------------------Header (отпр кукисы пользователю)  этот медот не очень тк надо парсить и искать
// app.use('/', (req, res) => {
// 	console.log('Cookies fom client:', req.headers['cookie'])

// 	//Метод позволяет записать в заголовок только один кукис
// 	//setHeader устанавливает заголовок отпр браузеру
// 	//указ браузеру что кукисы Set-Cookie
// 	//кукис TestHeader и значением HeaderValue
// 	// res.setHeader('Set-Cookie', 'TestHeader=HeaderValue')             

// 	//Метод принимает имя заголовка-первым парам и его значение - вторым параметром
// 	//если надо передать несколько параметров
// 	res.setHeader('Set-Cookie', ['item3=value3', 'item4=value4'])

// 	//Метод позволяет задать статус код ответа и обьект с заголовками
// 	// res.writeHead(200, {'Set-Cookie': ['item1=value1', 'item2=value2']})

// 	console.log('Method getCookie():', res.getHeader('Set-Cookie'))
// 	//записываем в ответ содержимое файла
// 	res.sendFile(__dirname + '/index.html')
// })

// app.listen(8001, () => console.log('Server start on port', 8001))
//-------------------------Модули cookie
let http = require('http')
//Модуль cookie позволяет 
let Cookies = require('cookies')

// http.createServer((req, res) => {
// 	//для работы с куками через модуль cookies необходимо создать обьект куки
// 	let cookies = new Cookies(req, res)
// 	if (req.url == '/favicon.ico') {
// 		res.end()
// 		return
// 	}
// 	cookies.set('admin', 'true')

// 	console.log(cookies.get('node'))
// 	res.end()

// }).listen(8001, () => console.log('SERVER START ON PORT', 8001))
//------------------------Cookie options
http.createServer((req, res) => { 
	let cookies = new Cookies(req, res, { 'keys': ['SECRET-string'] })
	
	console.log(cookies.get('login', { signed: true }))
	
	let cookieOptions = {
		//с-во задает время жизни куки
		maxAge: 12000,
		//дата когда куки будет просрочен (браузер автомат его удалит)
		//! expires : (Data.now() +7).toLocaleString(),                          //+семь дней
		//по умолчанию '/' это значит что кука видима на уровне всего приложения
		path: '/admin',        //сво-во path можно избежать перезаписи
		//указывает что кука должна передоваться  по https, если значение true
		secure: false,               //будет ли передоваться по защищеному протоколу
		//подпись кукиса
		signed: true //изменить на true
	}
	//используя модуль cookies можно конфигурировать куки сдоп парамтриами, для этого в метод set нужно передать доп обьект
	cookies.set('login', 'test@ex.com', cookieOptions)

	res.end()
}).listen(8003, () => console.log('SERVER START ON PORT', 8003))