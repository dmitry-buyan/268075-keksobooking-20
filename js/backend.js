'use strict';

(function () {
  var MAX_TIMEOUT = 1000;

  var JSON_TYPE = 'json';

  var URL = {
    load: 'https://javascript.pages.academy/keksobooking/data',
    upload: 'https://javascript.pages.academy/keksobooking'
  };

  var Code = {
    SUCCESS: 200,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  var HttpMethod = {
    GET: 'GET',
    POST: 'POST'
  };

  var xhr = new XMLHttpRequest();
  xhr.responseType = JSON_TYPE;

  var load = function (onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
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

    xhr.open(HttpMethod.GET, URL.load);
    xhr.send();
  };

  var upload = function (onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
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

    xhr.open(HttpMethod.POST, URL.upload);
    xhr.send();
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
