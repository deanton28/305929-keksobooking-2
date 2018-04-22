'use strict';

window.utils = {};

(function (exports) {
  exports.ENTER = 13;
  exports.ESC = 27;

  exports.fillTextContent = function (el, key, content) {
    el.querySelector(key).textContent = content;
  };

  exports.fillInnerHtml = function (el, key, content) {
    el.querySelector(key).innerHTML = content;
  };

  exports.fillSetAttribute = function (el, key, attribute, content) {
    el.querySelector(key).setAttribute(attribute, content);
  };

  exports.forEach = function (array, collback) {
    for (var i = 0; i < array.length; i++) {
      collback(array[i], i);
    }
  };
})(window.utils);
