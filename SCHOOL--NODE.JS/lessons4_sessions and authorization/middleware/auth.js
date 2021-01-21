// №55 - Защита роутов
module.exports = function (req, res, next) {
	//проверяем авторизацию
	if (!req.session.isAuthenticated) {
		console.log(req.session.isAuthenticated, '>>>>>>>>>>>>>>>>>>>>>>>> auth.js string 5')
		return res.redirect('/auth/login')             //если не зареген то перенаправл на страницу логина //return прекратить
	}
	next()
}