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

map.classList.remove('.map--faded');
