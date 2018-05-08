'use strict';

(function () {
  function fillPopup(el, data) {
    var iconFeatures = [];
    var images = [];

    window.utils.fillSetAttribute(el, '.popup__avatar', 'src', data.author.avatar);
    window.utils.fillTextContent(el, '.popup__title', data.offer.title);
    window.utils.fillTextContent(el, '.popup__text--address', data.offer.address);
    window.utils.fillTextContent(el, '.popup__text--price', data.offer.price + ' \u20bd/ночь');
    window.utils.fillTextContent(el, '.popup__type', TypeHouseRussian[data.offer.type]);
    window.utils.fillTextContent(el, '.popup__text--capacity', data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей');
    window.utils.fillTextContent(el, '.popup__text--time', 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
    window.utils.fillTextContent(el, '.popup__description', data.offer.description);

    for (var i = 0; i < data.offer.features.length; i++) {
      iconFeatures.push('<li class="popup__feature popup__feature--' + data.offer.features[i] + '"></li>');
    }

    for (var p = 0; p < data.offer.photos.length; p++) {
      images.push('<img src="' + data.offer.photos[p] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }

    window.utils.fillInnerHtml(el, '.popup__features', iconFeatures.join(''));
    window.utils.fillInnerHtml(el, '.popup__photos', images.join(''));
  }

  var TypeHouseRussian = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.show = {
    showCard: function (el, data) {
      fillPopup(el, data);
    }
  };
})();
