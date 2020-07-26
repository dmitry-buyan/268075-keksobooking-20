'use strict';

(function () {
  var MAX_TIMEOUT = 1000;

  var JSON_TYPE = 'json';

  var URL = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking'
  };

  var Codes = {
    SUCCESS: 200,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  var HttpMethods = {
    GET: 'GET',
    POST: 'POST'
  };

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;

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

    xhr.open(HttpMethods.GET, URL.LOAD);
    xhr.send();
  };

  var uploadData = function (data, onUpload, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === Codes.SUCCESS) {
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

    xhr.open(HttpMethods.POST, URL.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    upload: uploadData
  };
})();
