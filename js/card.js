'use strict';

window.card = {};

(function (exports) {
  exports.ENTER = 13;
  exports.ESC = 27;

  function fillTextContent(el, key, content) {
    el.querySelector(key).textContent = content;
  }

  function fillInnerHtml(el, key, content) {
    el.querySelector(key).innerHTML = content;
  }

  function fillPopup(el, data) {
    fillTextContent(el, '.popup__title', data.offer.title);
    fillTextContent(el, '.popup__text--address', data.offer.address);
    fillTextContent(el, '.popup__text--price', data.offer.price + ' \u20bd/ночь');
    fillTextContent(el, '.popup__type', typesHouseRussian[data.offer.type]);
    fillTextContent(el, '.popup__text--capacity', data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей');
    fillTextContent(el, '.popup__text--time', 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
    fillTextContent(el, '.popup__description', data.offer.description);

    var iconFeatures = [];
    var images = [];

    for (var f = 0; f < data.offer.features.length; f++) {
      iconFeatures.push('<li class="popup__feature popup__feature--' + data.offer.features[f] + '"></li>');
    }

    for (var p = 0; p < data.offer.photos.length; p++) {
      images.push('<img src="' + data.offer.photos[p] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }

    fillInnerHtml(el, '.popup__features', iconFeatures.join(''));
    fillInnerHtml(el, '.popup__photos', images.join(''));
  }

  function showCard(el, data) {
    window.pin.fillSetAttribute(el, '.popup__avatar', 'src', data.autor.avatar);
    fillPopup(el, data);
  }

  exports.displayOfferDialog = function (data, index) {
    return function (evt) {
      if (evt.keyCode === exports.ENTER || typeof evt.keyCode === 'undefined') {
        showCard(exports.article, window.data.ads[index]);
        window.map.map.insertBefore(exports.article, window.map.map.querySelector('.map__filters-container'));
      }
    };
  };

  exports.closeOfferDialog = function () {
    // article.setAttribute('hidden', '');
    window.map.map.removeChild(exports.article);
  };

  var typesHouseRussian = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var articleTemplate = window.pin.template.querySelector('.map__card');
  exports.article = articleTemplate.cloneNode(true);
})(window.card);
