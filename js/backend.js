'use strict';

(function () {
  var MAX_TIMEOUT = 1000;

  var Codes = {
    SUCCESS: 200,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  var JSON_TYPE = 'json';

  var HttpMethods = {
    GET: 'GET',
    POST: 'POST'
  };

  var URL = 'https://javascript.pages.academy/keksobooking/data';

  var xhr = new XMLHttpRequest();
  xhr.responseType = JSON_TYPE;

  window.load = function (onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === Codes.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + MAX_TIMEOUT + 'мс');
    });

    xhr.timeout = MAX_TIMEOUT;

    xhr.open(HttpMethods.GET, URL);
    xhr.send();
  };
})();
