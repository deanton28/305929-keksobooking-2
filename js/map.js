'use strict';

window.map = {};

(function (exports) {
  // Подробности
  // Нужен ли tabindex?
  var pinMainHeight = 84;
  var pinMainWidth = 62;
  var pinMainHalfWidth = pinMainWidth / 2;
  var pinMainHalfHeight = pinMainHeight / 2;
  var close = window.card.article.querySelector('.popup__close');


  exports.map = document.querySelector('.map');
  exports.pinMain = document.querySelector('.map__pin--main');

  exports.pinMainLocationX = exports.pinMain.offsetLeft;
  exports.pinMainLocationY = exports.pinMain.offsetTop;

  window.form.formAddress.value = (exports.pinMainLocationX + pinMainHalfWidth) + ', ' + (exports.pinMainLocationY + pinMainHalfHeight);

  // Может быть добавить это в mousedown? ----------------------------
  exports.pinMain.addEventListener('mouseup', function () {
    if (exports.map.className !== 'map') {
      exports.map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');

      window.form.fieldsForm.forEach(function (field) {
        field.removeAttribute('disabled', '');
      });

      window.pin.getPins(window.data.ads);

      window.pin.pins.forEach(function (pin, index) {
        pin.addEventListener('click', window.card.displayOfferDialog(window.data.ads, index));
        pin.addEventListener('keydown', window.card.displayOfferDialog(window.data.ads, index));
      });

      window.form.formAddress.value = (exports.pinMainLocationX + pinMainHalfWidth) + ', ' + (exports.pinMainLocationY + pinMainHeight);
    }
  });

  // тут еще подумать
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
  // --------------------------------------------

  // Максимум подвижности
  var tokyoBorderTop = 150;
  var tokyoBorderBottom = 500;
  var tokyoBorderLeft = 0;
  var tokyoBorderRigth = 1200;

  exports.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // Ограничитель по краям -------------------------------------
      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }
      // -----------------------------------------------------------

      // Определяем смещение ------------------------------------------
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

      pinDragTop = clamp(pinDragTop, tokyoBorderTop - pinMainHeight, tokyoBorderBottom - pinMainHeight);
      pinDragLeft = clamp(pinDragLeft, tokyoBorderLeft, tokyoBorderRigth - pinMainWidth);

      exports.pinMain.style.top = (pinDragTop) + 'px';
      exports.pinMain.style.left = (pinDragLeft) + 'px';
      // -------------------------------------------------------------------

      window.form.formAddress.value = (pinDragLeft + pinMainHalfWidth) + ', ' + (pinDragTop + pinMainHeight);
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
