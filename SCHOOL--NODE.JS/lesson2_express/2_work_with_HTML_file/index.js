//Раздел 3:Практика: Express.js
//№19 - Работа с HTML-файлами

const express = require('express')
const path = require('path')
const app = express()

app.get('/', (req, res) => {                                           //обрабатывать различные запросы          //         '/' показывает кокой url мы обрабатываем
	// res.status(200)                                                 //можно и не указывать тк в экспресе он по умолчанию
	//чтобы отдать html файл по по запросу на главный роут '/'
	res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))