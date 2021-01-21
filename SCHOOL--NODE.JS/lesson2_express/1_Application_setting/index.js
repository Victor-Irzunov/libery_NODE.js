//Раздел 3:Практика: Express.js
//№18 - Настройка приложения

const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000                 //более гибкое   //

// app.listen(3000, () => console.log('Сервер запущен'))
//или 
app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))