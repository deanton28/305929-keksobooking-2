'use strict';

(function () {
  var lastTimeout;

  window.utils = {
    ENTER: 13,
    ESC: 27,
    debounce: function (func, interval) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
        lastTimeout = null;
      }
      lastTimeout = window.setTimeout(func, interval);
    },
    fillTextContent: function (el, key, content) {
      el.querySelector(key).textContent = content;
    },
    fillInnerHtml: function (el, key, content) {
      el.querySelector(key).innerHTML = content;
    },
    fillSetAttribute: function (el, key, attribute, content) {
      el.querySelector(key).setAttribute(attribute, content);
    },
    forEach: function (array, collback) {
      for (var i = 0; i < array.length; i++) {
        collback(array[i], i);
      }
    }
  };
})(window.utils);
