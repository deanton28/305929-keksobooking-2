'use strict';

window.card = {};

(function (exports) {
  exports.displayOfferDialog = function (data, index) {
    return function (evt) {
      if (evt.keyCode === window.utils.ENTER || typeof evt.keyCode === 'undefined') {
        window.show.showCard(exports.article, data[index]);
        window.map.map.insertBefore(exports.article, window.map.map.querySelector('.map__filters-container'));
      }
    };
  };

  exports.closeOfferDialog = function () {
    window.map.map.removeChild(exports.article);
  };

  var articleTemplate = window.pin.template.querySelector('.map__card');
  exports.article = articleTemplate.cloneNode(true);
})(window.card);
