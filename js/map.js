'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 84;
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HALF_WIDTH = PIN_MAIN_WIDTH / 2;
  var TOKYO_BORDER_TOP = 150;
  var TOKYO_BORDER_BOTTOM = 500;
  var TOKYO_BORDER_LEFT = 0;
  var TOKYO_BORDER_RIGHT = 1200;

  var buttonClose = window.card.article.querySelector('.popup__close');

  window.map = {
    map: document.querySelector('.map'),
    pinMain: document.querySelector('.map__pin--main'),
    filterArea: document.querySelector('.map__filters')
  };

  var pinMainLocationX = window.map.pinMain.offsetLeft;
  var pinMainLocationY = window.map.pinMain.offsetTop;

  window.map.pinMain.addEventListener('mouseup', function () {
    if (window.map.map.classList.contains('map--faded')) {
      window.map.map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');

      window.form.fieldsForm.forEach(function (field) {
        field.removeAttribute('disabled', '');
      });

      window.backend.load(window.pin.onLoad, window.form.onError);

      window.form.formAddress.value = (pinMainLocationX + PIN_MAIN_HALF_WIDTH) + ', ' + (pinMainLocationY + PIN_MAIN_HEIGHT);
    }
  });

  buttonClose.addEventListener('click', function () {
    window.card.closeOfferDialog();
  });
  buttonClose.addEventListener('keydown', function (evt) {
    if (evt.keydown === window.utils.ENTER) {
      window.card.closeOfferDialog();
    }
  });

  window.map.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinDragLeft = window.map.pinMain.offsetLeft - shift.x;
      var pinDragTop = window.map.pinMain.offsetTop - shift.y;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinDragTop = clamp(pinDragTop, TOKYO_BORDER_TOP - PIN_MAIN_HEIGHT, TOKYO_BORDER_BOTTOM - PIN_MAIN_HEIGHT);
      pinDragLeft = clamp(pinDragLeft, TOKYO_BORDER_LEFT, TOKYO_BORDER_RIGHT - PIN_MAIN_WIDTH);

      window.map.pinMain.style.top = (pinDragTop) + 'px';
      window.map.pinMain.style.left = (pinDragLeft) + 'px';

      window.form.formAddress.value = (pinDragLeft + PIN_MAIN_HALF_WIDTH) + ', ' + (pinDragTop + PIN_MAIN_HEIGHT);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
