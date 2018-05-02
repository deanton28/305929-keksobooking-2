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

  exports.removePinCard = function () {
    window.pin.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.remove();
    });

    if (window.card.article) {
      window.card.article.remove();
    }
  };

  function resetForm() {
    exports.form.reset();
    window.map.filterArea.reset();
    window.map.map.classList.add('map--faded');
    exports.form.classList.add('ad-form--disabled');
    exports.fieldsForm.forEach(function (f) {
      f.setAttribute('disabled', '');
    });

    window.filter.filters = {
      features: []
    };

    exports.removePinCard();

    window.map.pinMain.setAttribute('style', 'left: 570px; top: 375px;');
  }

  function onLoad() {
    var messageSuccess = document.querySelector('.success');

    resetForm();

    messageSuccess.classList.remove('hidden');
    document.addEventListener('click', function () {
      messageSuccess.classList.add('hidden');
    });
  }

  exports.onError = function (data) {
    var messageError = document.createElement('div');
    messageError.classList = 'message';
    messageError.innerHTML = '<p>' + data + '</p>';
    exports.form.appendChild(messageError);
    document.addEventListener('click', function () {
      messageError.remove();
    });
  };

  var formTitle = document.querySelector('#title');
  var typeHouse = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
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

  setMinPrice(typeHouse, formPrice);
  setTimeInOut(timeIn, timeOut);

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

  buttonFormSubmit.addEventListener('click', function () {
    formTitle.classList.toggle('error_filed', !formTitle.checkValidity());
    formPrice.classList.toggle('error_filed', !formPrice.checkValidity());
    exports.formAddress.classList.toggle('error_filed', !exports.formAddress.checkValidity());
  });

  buttonFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  exports.form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(exports.form), onLoad, exports.onError);
    evt.preventDefault();
  });
})(window.form);
