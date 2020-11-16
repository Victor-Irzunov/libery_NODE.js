//отправляем асинхроные запросы без библиотек на нативном js

const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null) {
	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest()                 //new XMLHttpRequest() - через констпуктор глобального класса

		xhr.open(method, url)                             //откроет новое соединение xhr.open(method, url) 
		xhr.responseType = 'json'                              //ответ тип
		xhr.setRequestHeader('Content-Type', 'application/json')    //установить хедары которые отп вместе с запросом
		xhr.onload = () => {                                  //чтобы обработать эти данные (! важно перед тем как отпр запрос)
			// console.log(typeof xhr.response)                  //строка
			// console.log(JSON.parse(xhr.response))
			if (xhr.status >= 400) {
				reject(xhr.response)                        //если есть ошибка
			} else {
				resolve(xhr.response)
			}
		}
		xhr.onerror = () => {                                    //обраб ошибки(Network)
			reject(xhr.response)
		}
		xhr.send(JSON.stringify(body))                 //отпровляем
	})
}

// sendRequest('GET', requestURL)                       //вызываем ф-цию
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))

const body = {
	name: 'Victor',
	age: 36,
}

sendRequest('POST', requestURL, body)                       //вызываем ф-цию
	.then(data => console.log(data))
	.catch(err => console.log(err))