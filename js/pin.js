'use strict';

window.pin = {};

(function (exports) {
  function getDocumentFragment(list) {
    var fragment = document.createDocumentFragment();

    var pinHeight = 70;
    var halfPinWidth = 50 / 2;

    for (var i = 0; i < list.length; i++) {
      var pin = pinTemplate.cloneNode(true);
      var positionX = list[i].location.x - halfPinWidth + 'px';
      var positionY = list[i].location.y - pinHeight + 'px';

      pin.style.left = positionX;
      pin.style.top = positionY;
      window.utils.fillSetAttribute(pin, 'img', 'src', list[i].autor.avatar);
      window.utils.fillSetAttribute(pin, 'img', 'alt', 'Заголовок объявления');

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
