module.exports = function (req, res, next) {
	res.locals.isAuth = req.session.isAuthenticated                //что бы добавить данные которые с каждым ответом будут отдоваься обратно в шаблон создаем перем isAuth
	res.locals.csrf = req.csrfToken()
	next()
}