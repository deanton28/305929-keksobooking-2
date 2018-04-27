'use strict';

window.pin = {};

(function (exports) {
  function getDocumentFragment(data) {
    var fragment = document.createDocumentFragment();

    var pinHeight = 70;
    var halfPinWidth = 50 / 2;

    for (var i = 0; i < data.length; i++) {
      var pin = pinTemplate.cloneNode(true);
      var positionX = data[i].location.x - halfPinWidth + 'px';
      var positionY = data[i].location.y - pinHeight + 'px';

      pin.style.left = positionX;
      pin.style.top = positionY;
      window.utils.fillSetAttribute(pin, 'img', 'src', data[i].author.avatar);
      window.utils.fillSetAttribute(pin, 'img', 'alt', 'Заголовок объявления');

      fragment.appendChild(pin);
    }
    return fragment;
  }

  exports.onLoad = function (data) {
    exports.mapPins.appendChild(getDocumentFragment(data));
    exports.pins = exports.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    exports.pins.forEach(function (pin, index) {
      pin.addEventListener('click', window.card.displayOfferDialog(data, index));
      pin.addEventListener('keydown', window.card.displayOfferDialog(data, index));
    });
  };

  exports.mapPins = document.querySelector('.map__pins');
  exports.template = document.querySelector('template').content;
  var pinTemplate = exports.template.querySelector('.map__pin');
})(window.pin);
