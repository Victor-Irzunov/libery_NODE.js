// Node JS - Быстрый Курс за 1 час (Все Включено!)  Владилен Минин


//++path
// const path = require('path')
// console.log('название файла', path.basename(__filename))
// console.log('имя директория', path.dirname(__filename))
// console.log('расширение файла', path.extname(__filename))
// console.log('универсал метод Parse:', path.parse(__filename))
// console.log(path.join(__dirname, 'server', 'index.html'))

//++fs
//* File system
// const fs = require('fs')
// const { Buffer } = require('buffer')

// fs.mkdir(path.join(__dirname, 'test1'), (err) => {
// 	if (err) {
// 		throw err
// 	}
// 	console.log('папка создана')
// })
//--------------------------------------------------------------------
// const filePath = path.join(__dirname, 'test1', 'text.txt')
// fs.writeFile(filePath, 'hello hi-hi', err => {
// 	if (err) {
// 		throw err
// 	}
// 	console.log('файл создан')
// })
//-----------------
//*writeFile - может пирретирать уже существ файлы
// fs.writeFile(filePath, 'hello hi-hi', err => {              
// 	if (err) {
// 		throw err
// 	}
// 	console.log('файл создан')

// 	fs.writeFile(filePath, '\n hello ho-ho-ho', err => {              
// 		if (err) {
// 			throw err
// 		}
// 		console.log('файл создан')
// 	})

// })
//--------------------
//*appendFile -добавить 
// fs.writeFile(filePath, 'hello hi-hi', err => {              
// 	if (err) {
// 		throw err
// 	}
// 	console.log('файл создан')

// 	fs.appendFile(filePath, '\n hello ho-ho-ho', err => {              
// 		if (err) {
// 			throw err
// 		}
// 		console.log('файл создан')
// 	})
// })
//---------------------
//*readFile - 
// fs.readFile(filePath, (err, content) => {              
// 		if (err) {
// 			throw err
// 	}
// 	const data = Buffer.from(content)
// 		console.log('content:', data.toString())
// 	})
//? и более удобный спрособ
// fs.readFile(filePath, 'utf-8',(err, content) => {              
// 	if (err) {
// 		throw err
// }
// console.log(content)
// })
//++os
// const os = require('os')

// console.log('оперец систем', os.platform())
// console.log('процессор', os.arch())
// console.log('инфа по процессорам', os.cpus())   //писать более оптимизированное приложение 
// console.log('память', os.freemem())
// console.log('всего памяти', os.totalmem())
// console.log('домашняя директория', os.homedir())
// console.log('время включен:', os.uptime())

//++events
// const EventEmitter = require('events')

// const emitter = new EventEmitter()

// emitter.on = ('anything', data => {
// 	console.log('ON: anything', data)
// })
// emitter.emit('anything', {a:1})
// emitter.emit('anything', { b: 2 })
//------------class
// class Dispatcher extends EventEmitter{
// 	subscribe(eventName, cb) {
// 		console.log('[Sub...]')
// 		this.on(eventName, cb)
// 	}
// 	dispatch(eventName, data) {
// 		console.log(('[Dis]'))
// 		this.emit(eventName, data)
// 	}
// }
// const dis = new Dispatcher()
// dis.subscribe('aa', data => {
// 	console.log('ON: aa', data)
// })

// dis.dispatch('aa', {aa:2})


