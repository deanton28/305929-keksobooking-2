'use strict';

window.pin = {};

(function (exports) {
  exports.fillSetAttribute = function (el, key, attribute, content) {
    el.querySelector(key).setAttribute(attribute, content);
  };

  function getDocumentFragment(list) {
    var fragment = document.createDocumentFragment();

    var pinHeight = 70;
    var halfPinWidth = 50 / 2;

    for (var m = 0; m < list.length; m++) {
      var pin = pinTemplate.cloneNode(true);
      var positionX = list[m].location.x - halfPinWidth + 'px';
      var positionY = list[m].location.y - pinHeight + 'px';

      pin.style.left = positionX;
      pin.style.top = positionY;
      exports.fillSetAttribute(pin, 'img', 'src', list[m].autor.avatar);
      exports.fillSetAttribute(pin, 'img', 'alt', 'Заголовок объявления');

      fragment.appendChild(pin);
    }
    return fragment;
  }
  exports.getPins = function (list) {
    exports.mapPins.appendChild(getDocumentFragment(list));
    exports.pins = exports.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    return exports.pins;
  };

  exports.mapPins = document.querySelector('.map__pins');
  exports.template = document.querySelector('template').content;
  var pinTemplate = exports.template.querySelector('.map__pin');
})(window.pin);
