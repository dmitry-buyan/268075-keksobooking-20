'use strict';

(function () {
  var MAX_TIMEOUT = 1000;

  var JSON_TYPE = 'json';

  var URL = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking'
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

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;

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

    xhr.open(HttpMethod.GET, URL.LOAD);
    xhr.send();
  };

  var upload = function (data, onUpload, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
        onUpload(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Отправка данных не успела выполниться за ' + MAX_TIMEOUT + 'мс');
    });

    xhr.timeout = MAX_TIMEOUT;

    xhr.open(HttpMethod.POST, URL.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
