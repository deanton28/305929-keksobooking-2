'use strict';

(function () {
  var articleTemplate = window.pin.template.querySelector('.map__card');

  function onOfferDialogEscPress(evt) {
    if (evt.keyCode === window.utils.ESC) {
      window.card.closeOfferDialog();
    }
  }

  window.card = {
    onPinClickOrEnterPress: function (data, index) {
      return function (evt) {
        if (evt.keyCode === window.utils.ENTER || typeof evt.keyCode === 'undefined') {
          window.show.showCard(window.card.article, data[index]);
          window.map.map.insertBefore(window.card.article, window.map.map.querySelector('.map__filters-container'));
        }
        document.addEventListener('keydown', onOfferDialogEscPress);
      };
    },
    closeOfferDialog: function () {
      window.map.map.removeChild(window.card.article);
      document.removeEventListener('keydown', onOfferDialogEscPress);
    },
    article: articleTemplate.cloneNode(true)
  };
})();
