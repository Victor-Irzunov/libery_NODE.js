// Урок 14. JavaScript. Запросы на сервер. Fetch, XMLHttpRequest (XHR), Ajax     Владилен Минин
// jsonplaceholder.typicode.com   
//fetch [feʧ] извлечь, получить
//делаем асинхронные запросы с новым API метод Fetch который доступен в браузерах


const requestURL = 'https://jsonplaceholder.typicode.com/users'


//--------------------GET
// function sendRequest(method, url, body = null) {

// 	return fetch(url).then(response => {
// 			return response.json()
// 	})
// }
// sendRequest('GET', requestURL)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))

//---------------------POST
// function sendRequest(method, url, body = null) {
// 	const headers = {
// 		'Content-Type': 'application/json'
// 	}

// 	return fetch(url, {                             //метод fetch возжращает промис
// 		method: method,
// 		body: JSON.stringify(body),
// 		headers: headers                                   //ключ
// 	}).then(response => {
// 		if (response.ok) {                                  // или response < 400
// 			return response.json()
// 		}

// 		return response.json().then(error => {              //тк сдесь промис значит then
// 			const e = new Error('Что-то пошло не так')
// 			e.data = error
// 			throw e
// 		})
// 	})
// }

// const body = {
// 	name: 'Victor',
// 	age: 36
// }
// sendRequest('POST', requestURL, body)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))