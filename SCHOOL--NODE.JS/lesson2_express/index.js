//Раздел 3:Практика: Express.js
//№20 - Подключение Handlebars //№21 - Настройка Layout //№22 - Добавление навигации //№23 - Рендеринг данных (динанимические значения) //№24 - Регистрация роутов //№25 - Обработка формы //№26 - Создание модели //№27 - Вывод списка курсов //№28 - Подключение клиентских скриптов // №29 - Динамические параметры //№30 - Динамические параметры //№31 - Подготовка корзины //№32 - Модель корзины не начал  //№33 - Вывод данных в корзине //№34 - Обработка асинхронных запросов //№35 - Динамическое изменение корзины

const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

//-----------------------------------------вынес в отдельный файл home.js
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const kursRouter = require('./routes/kurs')
const cardRoutes = require('./routes/card')
//-----------------------------------------
const app = express()

const hbs = exphbs.create({
	defaultLayout: 'main',                     //Layout - расположение, размещение   /default по умолчанию   // опции
	extname: 'hbs'                                //сократить код чтобы не писать handlebars
})


app.engine('hbs', hbs.engine)                  //регистрировать движок handlebars(const hbs = exphbs.creat) для рендаринга html страниц
app.set('view engine', 'hbs')                          //здесь мы handlebars начинаем использвать
app.set('views', 'views')                                  //(переменая, папка)  

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({extended: true}))                   //POST           //ключ  extended в значении true

app.use('/', homeRoutes)                                //подключаю то что вынес в отдельный файл home.js
app.use('/add', addRoutes)                               //префикс пути '/add'
app.use('/kurs', kursRouter)
app.use('/card', cardRoutes)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))