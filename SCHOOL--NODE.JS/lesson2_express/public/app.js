// const { json } = require("express")
// const { delete } = require("../routes/add")
//№28 - Подключение клиентских скриптов
const toCurrency = price => {
	return new Intl.NumberFormat('en-US', {              //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
		currency: 'USD',
		style: 'currency'
	}).format(price)
}


document.querySelectorAll('.price').forEach(a => {
	a.textContent = toCurrency(a.textContent)
})

//если ли элем #card
const $card = document.querySelector('#card')             //$ либо jquery либо html элем
if ($card) {
	$card.addEventListener('click', event => {
		if (event.target.classList.contains('js-remove')) {                  //есть ли такой класс
			const id = event.target.dataset.id
			// console.log(id)


			//вызвать аякс запрос с клиента и отпр на сервер
			fetch('/card/remove/' + id, {               //+ id будем понимать какой именно id нужно удалить
				method: 'delete'                        //спец http медот говорит что необх удалять элем
			}).then(res => res.json())               //не можем испл async awai тк работаем в браузере(поэтому воспольз промисом)
				.then(card => {
					if (card.courses.length) {                     //будем обновлять таблицу
						const html = card.courses.map(c => {
							return `
							<tr>
							<td>${c.title}</td>
							<td>${c.count}</td>
							<td>
								<button class="btn btn-small js-remove" data-id='${c.id}'>Удалить </button>
							</td>
						</tr>
							`
						}).join('')              //т к html это массив применяем медот join к строке
						$card.querySelector('tbody').innerHTML = html
						$card.querySelector('.price').textContent = toCurrency(card.price)            //перещитываем цену
					}
					else {
						$card.innerHTML = '<p>Корзина пуста</p>'
					}
				})
		}
	})
}