'use strict';

window.map = {};

(function (exports) {
  var PIN_MAIN_HEIGHT = 84;
  var PIN_MAIN_WIDTH = 62;
  var TOKYO_BORDER_TOP = 150;
  var TOKYO_BORDER_BOTTOM = 500;
  var TOKYO_BORDER_LEFT = 0;
  var TOKYO_BORDER_RIGHT = 1200;

  exports.pinMainHalfWidth = PIN_MAIN_WIDTH / 2;
  exports.pinMainHalfHeight = PIN_MAIN_HEIGHT / 2;

  var close = window.card.article.querySelector('.popup__close');

  exports.map = document.querySelector('.map');
  exports.pinMain = document.querySelector('.map__pin--main');
  exports.filterArea = document.querySelector('.map__filters');

  exports.pinMainLocationX = exports.pinMain.offsetLeft;
  exports.pinMainLocationY = exports.pinMain.offsetTop;

  exports.pinMain.addEventListener('mouseup', function () {
    if (exports.map.className !== 'map') {
      exports.map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');

      window.form.fieldsForm.forEach(function (field) {
        field.removeAttribute('disabled', '');
      });

      window.backend.load(window.pin.onLoad, window.form.onError);

      window.form.formAddress.value = (exports.pinMainLocationX + exports.pinMainHalfWidth) + ', ' + (exports.pinMainLocationY + PIN_MAIN_HEIGHT);
    }
  });

  close.addEventListener('click', function () {
    window.card.closeOfferDialog();
  });
  close.addEventListener('keydown', function (evt) {
    if (evt.keydown === window.utils.ENTER) {
      window.card.closeOfferDialog();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC) {
      window.card.closeOfferDialog();
    }
  });

  exports.pinMain.addEventListener('mousedown', function (evt) {
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

      var pinDragLeft = exports.pinMain.offsetLeft - shift.x;
      var pinDragTop = exports.pinMain.offsetTop - shift.y;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinDragTop = clamp(pinDragTop, TOKYO_BORDER_TOP - PIN_MAIN_HEIGHT, TOKYO_BORDER_BOTTOM - PIN_MAIN_HEIGHT);
      pinDragLeft = clamp(pinDragLeft, TOKYO_BORDER_LEFT, TOKYO_BORDER_RIGHT - PIN_MAIN_WIDTH);

      exports.pinMain.style.top = (pinDragTop) + 'px';
      exports.pinMain.style.left = (pinDragLeft) + 'px';

      window.form.formAddress.value = (pinDragLeft + exports.pinMainHalfWidth) + ', ' + (pinDragTop + PIN_MAIN_HEIGHT);
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
})(window.map);
