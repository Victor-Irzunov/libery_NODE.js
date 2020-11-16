// ! WebDev с нуля. Канал Алекса Лущенко

//++                        NodeJS. 05. Передача параметров в Node.js #5
// const arg = process.argv
// console.log(arg[2])
// const a = +arg[2]
// const b = +arg[3]
// if (a > b) {
// 	console.log(a)
// }
// else {
// 	console.log(b)
// }
//-------------------------------
// let c = (a > b) ? a : b   // && ||
// console.log(c)
//-------------------------------
// for (let i = 5; i >= 0; i--){
// 	console.log(i)
// }
//-------------------------------в строку
// let t = ''
// for (let i = 5; i >= 0; i--){
// 	t += i + ' '
// }
// console.log(t)
//-------------------------------в массив
// let d = [6, 7, 8]
// let e = d.map(el => el * 3)
// console.log(e)
//-------------------------------
// const f = { one: 44, two: 'hi-hi' }
// console.log(f)

//++                           NodeJS. 06. Читаем папки и файлы. Создаем файлы #6.
//? fs -модуль файловой системы
//---асинхронный (когда не остан прогр и продолжаем)
// const fs = require('fs')
// const path = require('path')
// fs.readFile('./test1/text.txt', 'utf-8', (err, data) => {
// 	console.log(data)
// })
//---cинхроный (останавл програм и ждем)
// const text = fs.readFileSync('./test1/text.txt', 'utf-8')
// console.log(text, '***')
// console.log('___________')

//--------------------------------------------------------------
// fs.readdir('test1', (err, data) => {
// 	console.log(data)
// 	data.forEach(file => {
// 		// console.log(file)
// 		// console.log('extension: ', path.extname(file))
// 		// console.log(file + '  ' + path.extname(file))   //расширение
// 		// console.log(fs.statSync('test1/'+file).size)       //в килобайтах

// 	})
// })
//-------------------------------------добавить фийл и текст в неге
// fs.writeFile('test1/newfile.txt', '/*/*/*/*/*', err => { if (err) console.log(err) })

//++     Читаем и пишем CSV и JSON файлы в Node.js #7

// const fs = require('fs')
// const path = require('path')
// const student = require('./test.json')
// const csv = require('csv-parser')
// fs.writeFile('test.txt', 'work', err => {
// 	if (err) {
// 		console.log('error')
// 	}
// })
//появилася файл с текстом
//------------------------------------читаем json файл
// const man = {
// 	name: 'Alex',
// 	age: 30,
// 	depatment: 'History',
// 	car: 'vaz',
// }
// fs.writeFile('test.json', JSON.stringify(man), err => {
// 	if (err) console.log('error')
// })
//stringify - делает JSON строку
// console.log(student)
//------------------------------------читаем CSV файл-2
// npm i csv-parser установить   (node-modules)
// читаем npmjs.com
// fs.createReadStream('data.csv')
// 	.pipe(csv())
// 	.on('data', (data) => results.push(data))
// 	.on('end', () => {
// 		console.log(results);
// 	});
//-----------------------------------пишем csv
//устанавливаем npm i csv-write
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
// 	path: 'out.csv',
// 	header: [
// 		{ id: 'name', title: 'Name' },
// 		{ id: 'surname', title: 'Surname' },
// 		{ id: 'age', title: 'Age' },
// 		{ id: 'gender', title: 'Gender' },
// 	]
// }); 
// const data = [ 
// 	{name: 'John', surname: 'Snow', age: 26, gender: 'M' }, 
// 	{name: 'Clair', surname: 'White', age: 33, gender: 'F', }, 
// 	{name: 'Fancy', surname: 'Brown', age: 78, gender: 'F' } 
// ]; 
// csvWriter .writeRecords(data) 
// .then(() => console.log('The CSV file was written successfully')); 
//+++ Получение GET и POST запросов на Node.js  #8
//* отправляем GET на сервер и полуем и обрабатываем
// const http = require('http');
// const url = require('url');
// http.createServer((request, response) => {
// 	console.log('server work');
// 	console.log(request.method)   //!!!! важно
// 	let urlRequest = url.parse(request.url, true)
// 	console.log(urlRequest)
// 	console.log(urlRequest.query.test)
// 	response.end('work');                             //завершает работу и дает ответ

// }).listen(3000);
//--------------------------------------
// const http = require('http');
// const url = require('url');
// http.createServer((request, response) => {
// 	console.log('server work');
// 	console.log(request.method)   //!!!! важно
// 	let urlRequest = url.parse(request.url, true)
// 	console.log(urlRequest.query.test)  // GET параметр
// 	if (urlRequest.query.test % 2 == 0) {
// 		response.end('even')
// 	}
// 	response.end('odd');                             //завершает работу и дает ответ

// }).listen(3000);
//-----------------------------------------https://www.postman.com/ так и не скачал
const http = require('http');
const url = require('url');
const {parse} = require('querystring')

http.createServer((request, response) => {
	console.log('server work');
	if (request.method == 'GET') {
		//GET запрос
		console.log(request.method)
		let urlRequest = url.parse(request.url, true)
		console.log(urlRequest.query.test)  // GET параметр
		if (urlRequest.query.test % 2 == 0) {
			response.end('even')
		}
		response.end('odd');                             //завершает работу и дает ответ
	}
	else {
		//POST запрос
		let body = ''
		request.on('data', chunk => {
			body += chunk.toString()    //кусочки данных
		})
		request.on('end', () => {
			console.log(body)
			let params = parse(body)
			console.log(params)
			console.log(params.hi)
			response.end('ok')
		})
	}
}).listen(3000);