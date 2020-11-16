/****************************
Урок Javascript #27. Localstorage и cookie.           WebGo
****************************/

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// устанавливает cookie c именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, days) {
  var date = new Date;
  date.setDate(date.getDate() + days);
  value = encodeURIComponent(value);
  document.cookie = name + "=" + value + ";path=/; expires=" + date.toUTCString();
};

// удаляет cookie с именем name
function deleteCookie(name) {
  setCookie(name, "", -1);
};

//if (!navigator.cookieEnabled) alert('Включите, пожалуйста, cookie для запоминания сайтом выбранного Вами цвета');

// Сохраняем куку выбранного пользователем цвета на 2000 дней
//setCookie("userColor", color, 2000);

//document.cookie="userColor=" + color + ";path=/; expires="+date.toUTCString();

//  userColor = getCookie("userColor");
