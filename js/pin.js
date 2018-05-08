'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var HALF_PIN_WIDTH = 50 / 2;

  function getDocumentFragment(data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length && i <= 4; i++) {
      var pin = pinTemplate.cloneNode(true);
      var positionX = data[i].location.x - HALF_PIN_WIDTH + 'px';
      var positionY = data[i].location.y - PIN_HEIGHT + 'px';

      pin.style.left = positionX;
      pin.style.top = positionY;
      window.utils.fillSetAttribute(pin, 'img', 'src', data[i].author.avatar);
      window.utils.fillSetAttribute(pin, 'img', 'alt', 'Заголовок объявления');

      fragment.appendChild(pin);
    }
    return fragment;
  }

  window.pin = {
    onLoad: function (data) {
      window.filter.ads = data;
      window.pin.renderPin(window.filter.ads);
    },
    renderPin: function (data) {
      window.pin.mapPins.appendChild(getDocumentFragment(window.filter.getFilteredData(data)));
      window.pin.pins = window.pin.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      window.pin.pins.forEach(function (pin, index) {
        pin.addEventListener('click', window.card.onPinClickOrEnterPress(window.filter.getFilteredData(data), index));
        pin.addEventListener('keydown', window.card.onPinClickOrEnterPress(window.filter.getFilteredData(data), index));
      });
    },
    mapPins: document.querySelector('.map__pins'),
    template: document.querySelector('template').content,
  };

  var pinTemplate = window.pin.template.querySelector('.map__pin');

})();
