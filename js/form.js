'use strict';

(function () {
  var INDEX_VALUE_ONE_GUEST = 2;
  var INDEX_VALUE_HUNDRED_GUEST = 3;
  var VALUE_HUNDRED_GUEST = '100';

  function setMinPrice(sourseElement, targetelement) {
    sourseElement.addEventListener('change', function () {
      targetelement.placeholder = VariantHousePrice[sourseElement.value];
      targetelement.min = VariantHousePrice[sourseElement.value];
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
    var capacityVariants = GuestRoomCount[roomNumber.value];
    var exists = capacityVariants.indexOf(item.value) < 0;
    if (exists) {
      item.setAttribute('hidden', '');
    } else {
      item.removeAttribute('hidden');
    }
  }

  function resetForm() {
    window.form.form.reset();
    window.map.filterArea.reset();
    window.map.map.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
    window.form.fieldsForm.forEach(function (f) {
      f.setAttribute('disabled', '');
    });

    window.filter.filter = {
      features: []
    };

    window.form.removePinCard();

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

  var notice = document.querySelector('.notice');
  var formTitle = notice.querySelector('#title');
  var typeHouse = notice.querySelector('#type');
  var formPrice = notice.querySelector('#price');
  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');
  var roomNumber = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
  var buttonFormSubmit = notice.querySelector('.ad-form__submit');
  var buttonFormReset = notice.querySelector('.ad-form__reset');

  var VariantHousePrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var GuestRoomCount = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  window.form = {
    removePinCard: function () {
      window.pin.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
        pin.remove();
      });

      if (window.card.article) {
        window.card.article.remove();
      }
    },
    onError: function (data) {
      var messageError = document.createElement('div');
      messageError.classList = 'message';
      messageError.innerHTML = '<p>' + data + '</p>';
      window.form.form.appendChild(messageError);
      document.addEventListener('click', function () {
        messageError.remove();
      });
    },
    form: notice.querySelector('.ad-form'),
    fieldsForm: notice.querySelectorAll('fieldset'),
    formAddress: notice.querySelector('#address'),
  };

  setMinPrice(typeHouse, formPrice);
  setTimeInOut(timeIn, timeOut);

  for (var c = 0; c < capacity.options.length; c++) {
    capacity.options[c].setAttribute('hidden', '');
  }
  capacity.options[INDEX_VALUE_ONE_GUEST].removeAttribute('hidden');

  roomNumber.addEventListener('change', function () {
    window.utils.forEach(capacity.options, setCapacity);

    var valueRumNumber = INDEX_VALUE_ONE_GUEST;
    if (roomNumber.value === VALUE_HUNDRED_GUEST) {
      valueRumNumber = INDEX_VALUE_HUNDRED_GUEST;
    }
    capacity.options[valueRumNumber].selected = true;
  });

  buttonFormSubmit.addEventListener('click', function () {
    formTitle.classList.toggle('error_filed', !formTitle.checkValidity());
    formPrice.classList.toggle('error_filed', !formPrice.checkValidity());
    window.form.formAddress.classList.toggle('error_filed', !window.form.formAddress.checkValidity());
  });

  buttonFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  window.form.form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.form.form), onLoad, window.form.onError);
    evt.preventDefault();
  });
})();
