'use strict';

window.backend = {};

(function (exports) {
  var URLLOAD = 'https://js.dump.academy/keksobooking/data';
  var URLSAVE = 'https://js.dump.academy/keksobooking';

  exports.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URLLOAD);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединеия');
    });

    xhr.send();
  };

  exports.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // console.log('status ' + xhr.status);
      if (xhr.status < 300) {
        onLoad();
      } else {
        onError('Не известный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединеия');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('POST', URLSAVE);
    xhr.send(data);
  };
})(window.backend);
