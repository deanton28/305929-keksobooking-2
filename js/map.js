'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function compareRandom() {
  return Math.random() - 0.5;
}

function fillSetAttribute(el, key, attribute, content) {
  el.querySelector(key).setAttribute(attribute, content);
}

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
    fillSetAttribute(pin, 'img', 'src', list[m].autor.avatar);
    fillSetAttribute(pin, 'img', 'alt', 'Заголовок объявления');

    fragment.appendChild(pin);
  }
  return fragment;
}

function fillTextContent(el, key, content) {
  el.querySelector(key).textContent = content;
}

function fillInnerHtml(el, key, content) {
  el.querySelector(key).innerHTML = content;
}

function fillPopup(el, data) {
  fillTextContent(article, '.popup__title', data.offer.title);
  fillTextContent(article, '.popup__text--address', data.offer.address);
  fillTextContent(article, '.popup__text--price', data.offer.price + ' \u20bd/ночь');
  fillTextContent(article, '.popup__type', typesHouseRussian[data.offer.type]);
  fillTextContent(article, '.popup__text--capacity', data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей');
  fillTextContent(article, '.popup__text--time', 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
  fillTextContent(article, '.popup__description', data.offer.description);

  var iconFeatures = [];
  var images = [];

  for (var f = 0; f < data.offer.features.length; f++) {
    iconFeatures.push('<li class="popup__feature popup__feature--' + data.offer.features[f] + '"></li>');
  }

  for (var p = 0; p < data.offer.photos.length; p++) {
    images.push('<img src="' + data.offer.photos[p] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }

  fillInnerHtml(article, '.popup__features', iconFeatures.join(''));
  fillInnerHtml(article, '.popup__photos', images.join(''));
}

function showCard(el, data) {
  fillSetAttribute(el, '.popup__avatar', 'src', data.autor.avatar);
  fillPopup(el, data);
}

var typesHouseRussian = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var ads = [];

for (var i = 0; i < 8; i++) {
  var numberUserAvatar = i + 1;
  var room = getRandomNumber(1, 5);
  var locationX = getRandomNumber(900, 300);
  var locationY = getRandomNumber(500, 150);

  ads[i] = {
    autor: {
      avatar: 'img/avatars/user0' + numberUserAvatar + '.png'
    },
    offer: {
      title: TITLES[i],
      address: [locationX, locationY].join(', '),
      price: getRandomNumber(1000, 1000000),
      type: getRandomItem(TYPES_HOUSE),
      rooms: room,
      guests: getRandomNumber(room, room * 2),
      checkin: getRandomItem(TIMES),
      checkout: getRandomItem(TIMES),
      features: FEATURES.slice(0, getRandomNumber(0, FEATURES.length)),
      description: '',
      photos: PHOTOS.sort(compareRandom)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var template = document.querySelector('template').content;
var pinTemplate = template.querySelector('.map__pin');
var articleTemplate = template.querySelector('.map__card');
var article = articleTemplate.cloneNode(true);

// map.insertBefore(article, map.querySelector('.map__filters-container')).setAttribute('hidden', '');


// map.classList.remove('map--faded');
// mapPins.appendChild(getDocumentFragment(ads));
// showCard(article, ads[0]);

// Подробности

// Нужен ли tabindex?

var ENTER = 13;
var ESC = 27;

function displayOfferDialog(data, index) {
  return function (evt) {
    if (evt.keyCode === ENTER || typeof evt.keyCode === 'undefined') {
      showCard(article, ads[index]);
      map.insertBefore(article, map.querySelector('.map__filters-container'));
    }
  };
}

// function closeOfferDialog() {
//   return function (evt) {
//     if (evt.keyCode === ENTER || typeof evt.keyCode === 'undefined') {
//       article.setAttribute('hidden', '');
//     }
//   };
// }

function closeOfferDialog() {
  // article.setAttribute('hidden', '');
  map.removeChild(article);

}

var pinMainHeight = 84;
var pinMainWidth = 62;
var pinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var fieldsForm = form.querySelectorAll('fieldset');
var formAddress = form.querySelector('#address');
var close = article.querySelector('.popup__close');

// Может быть прописать это в index.html
fieldsForm.forEach(function (f) {
  f.setAttribute('disabled', '');
});
// --------------------------------------------

// не забыть добавить это в адрес посде активации формы
var pinMainLocationX = pinMain.offsetLeft;
var pinMainLocationY = pinMain.offsetTop;
// ---------------------------------------------

formAddress.value = (pinMainLocationX + pinMainWidth / 2) + ', ' + (pinMainLocationY + pinMainHeight / 2);

pinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  fieldsForm.forEach(function (f) {
    f.removeAttribute('disabled', '');
  });

  mapPins.appendChild(getDocumentFragment(ads));

  var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

  pins.forEach(function (pin, index) {
    pin.addEventListener('click', displayOfferDialog(ads, index));
    pin.addEventListener('keydown', displayOfferDialog(ads, index));
  });
});

// тут еще подумать
close.addEventListener('click', function () {
  closeOfferDialog();
});
close.addEventListener('keydown', function (evt) {
  if (evt.keydown === ENTER) {
    closeOfferDialog();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC) {
    closeOfferDialog();
  }
});
// --------------------------------------------

// Доверяй но проверяй

var variantHousePrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var guestRoomCount = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var typeHouse = document.getElementById('type');
var formPrice = document.getElementById('price');
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');
var buttonFormSubmit = document.querySelector('.ad-form__submit');
var buttonFormReset = document.querySelector('.ad-form__reset');
var formTitle = document.getElementById('title');

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

setMinPrice(typeHouse, formPrice);

setTimeInOut(timeIn, timeOut);

for (var c = 0; c < capacity.options.length; c++) {
  capacity.options[c].setAttribute('hidden', '');
}
capacity.options[2].removeAttribute('hidden');

roomNumber.addEventListener('change', function () {
  for (var f = 0; f < capacity.options.length; f++) {
    var roomsCount = guestRoomCount[roomNumber.value];
    var exists = roomsCount.indexOf(capacity.options[f].value) < 0;
    if (exists) {
      capacity.options[f].setAttribute('hidden', '');
    } else {
      capacity.options[f].removeAttribute('hidden');
    }
  }

  var valueRumNumber = 2;
  if (roomNumber.value === '100') {
    valueRumNumber = 3;
  }
  capacity.options[valueRumNumber].selected = true;
});

buttonFormSubmit.addEventListener('click', function () {
  formTitle.classList.toggle('error_filed', !formTitle.checkValidity());
  formPrice.classList.toggle('error_filed', !formPrice.checkValidity());
  formAddress.classList.toggle('error_filed', !formAddress.checkValidity());
});

buttonFormReset.addEventListener('click', function (evt) {
  evt.preventDefault();
  form.reset();
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (pin) {
    mapPins.removeChild(pin);
  });

  if (map.querySelector('article')) {
    map.removeChild(article);
  }

  pinMain.setAttribute('style', 'left: 570px; top: 375px;');

  formAddress.value = (pinMainLocationX + pinMainWidth / 2) + ', ' + (pinMainLocationY + pinMainHeight / 2);
});
