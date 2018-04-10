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
  fillTextContent(article, '.popup__text--capacity', data.offer.rooms + ' комнаты для ' + ads[0].offer.guests + ' гостей');
  fillTextContent(article, '.popup__text--time', 'Заезд после ' + data.offer.checkin + ', выезд до ' + ads[0].offer.checkout);
  fillTextContent(article, '.popup__description', ads[0].offer.description);

  var iconFeatures = [];
  var images = [];

  for (var f = 0; f < ads[0].offer.features.length; f++) {
    iconFeatures.push('<li class="popup__feature popup__feature--' + ads[0].offer.features[f] + '"></li>');
  }

  for (var p = 0; p < ads[0].offer.photos.length; p++) {
    images.push('<img src="' + ads[0].offer.photos[p] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
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

map.classList.remove('map--faded');
mapPins.appendChild(getDocumentFragment(ads));
showCard(article, ads[0]);
map.insertBefore(article, map.querySelector('.map__filters-container'));
