'use strict';

window.form = {};

(function (exports) {
  function setMinPrice(sourseElement, targetelement) {
    sourseElement.addEventListener('change', function () {
      targetelement.placeholder = variantHousePrice[sourseElement.value];
      targetelement.min = variantHousePrice[sourseElement.value];
    });
  }

  function setTimeInOut(fieldIn, fieldOut) {
    fieldIn.addEventListener('change', function () {
      fieldOut.value = fieldIn.value;
    });
    fieldOut.addEventListener('change', function () {
      fieldIn.value = fieldOut.value;
    });
  }

  function setCapacity(item) {
    var capacityVariants = guestRoomCount[roomNumber.value];
    var exists = capacityVariants.indexOf(item.value) < 0;
    if (exists) {
      item.setAttribute('hidden', '');
    } else {
      item.removeAttribute('hidden');
    }
  }

  var formTitle = document.getElementById('title');
  var typeHouse = document.getElementById('type');
  var formPrice = document.getElementById('price');
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var buttonFormSubmit = document.querySelector('.ad-form__submit');
  var buttonFormReset = document.querySelector('.ad-form__reset');

  exports.form = document.querySelector('.ad-form');
  exports.fieldsForm = exports.form.querySelectorAll('fieldset');
  exports.formAddress = exports.form.querySelector('#address');


  var variantHousePrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var guestRoomCount = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  // Может быть прописать это в index.html
  exports.fieldsForm.forEach(function (f) {
    f.setAttribute('disabled', '');
  });
  // --------------------------------------------

  setMinPrice(typeHouse, formPrice);
  setTimeInOut(timeIn, timeOut);

  // Соответствие комнат и гостей-------------------------
  for (var c = 0; c < capacity.options.length; c++) {
    capacity.options[c].setAttribute('hidden', '');
  }
  capacity.options[2].removeAttribute('hidden');

  roomNumber.addEventListener('change', function () {
    window.utils.forEach(capacity.options, setCapacity);

    var valueRumNumber = 2;
    if (roomNumber.value === '100') {
      valueRumNumber = 3;
    }
    capacity.options[valueRumNumber].selected = true;
  });
  // --------------------------------------------------------

  buttonFormSubmit.addEventListener('click', function () {
    formTitle.classList.toggle('error_filed', !formTitle.checkValidity());
    formPrice.classList.toggle('error_filed', !formPrice.checkValidity());
    exports.formAddress.classList.toggle('error_filed', !exports.formAddress.checkValidity());
  });

  // Сброс формы-------------------
  // межет быть подредактировать?
  buttonFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    exports.form.reset();
    window.map.map.classList.add('map--faded');
    exports.form.classList.add('ad-form--disabled');
    var pins = window.pin.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      window.pin.mapPins.removeChild(pin);
    });

    if (window.map.map.querySelector('article')) {
      exports.map.removeChild(window.card.article);
    }

    window.map.pinMain.setAttribute('style', 'left: 570px; top: 375px;');

    exports.formAddress.value = (window.pin.pinMainLocationX + window.pin.pinMainHalfWidth) + ', ' + (window.pin.pinMainLocationY + window.pin.pinMainHalfHeight);
  });
})(window.form);
