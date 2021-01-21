//-------------START----------------
const express = require('express')
const path = require('path')
const csrf = require('csurf')                                              //возвращает ф-цию №60 - Добавление CSRF-защиты
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const session = require('express-session')                                //№52 - Добавление сессии
const MongoStore = require('connect-mongodb-session')(session)           //№54 - Сессия в базе данных    //(session) пакет который нужен для синхронизации
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')
const flash = require('connect-flash')                              //№61 - Сообщения об ошибке
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const kursRouter = require('./routes/kurs')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')                                     //№48 - Подготовка страницы заказов
const authRoutes = require('./routes/auth')                         //№51 - Страница логина
// const User = require('./models/user')                                //№53 - Сохранение сессии                   больше не трубуется       удалил №61 - Сообщения об ошибке
const varMiddleware = require('./middleware/variables')              //№52 - Добавление сессии
const userMiddleware = require('./middleware/user')                    //№56 - Исправление работы корзины
const MONGODB_URI = `mongodb+srv://Victor-school:uG73dLnsUETlKVzf@cluster0.6aeiv.mongodb.net/shop`
const app = express()
const store = new MongoStore({                                   //№54 - Сессия в базе данных
	collection: 'sessions',                                      //БД
	uri: MONGODB_URI
})



app.engine('hbs', exphbs({
	defaultLayout: 'main',
	extname: 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))                   //№22 - Добавление навигации
app.use(express.urlencoded({ extended: true }))                   //№25 - Обработка формы
app.use(session({                                                //№52 - Добавление сессии
	secret: "some secret value",
	resave: false,
	saveUninitialized: false,
	store: store                                                   //№54 - Сессия в базе данных
}))
app.use(csrf())                                             // №60 - Добавление CSRF-защиты           //csrf()  вызываем
app.use(flash())                                            //№61 - Сообщения об ошибке
app.use(varMiddleware)                                      //№52 - Добавление сессии
app.use(userMiddleware)                                     //№56 - Исправление работы корзины
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/kurs', kursRouter)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)                              //№48 - Подготовка страницы заказов
app.use('/auth', authRoutes)                                  //№51 - Страница логина



const PORT = process.env.PORT || 3000


async function start() {
	try {
		await mongoose.connect(MONGODB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			})
		app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))
	}
	catch (e) {
		console.log('+++ошибка1 index.js--------string 70', e, '+++ошибка2 index.js-------------string 70')
	}
}
start()

//! Victor-school:uG73dLnsUETlKVzf

