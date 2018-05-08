'use strict';

(function () {
  function getFilter(sourseData, filterData, key) {
    if (key === 'rooms' || key === 'guests') {
      if (sourseData[key] !== +filterData[key]) {
        return false;
      }
    }

    if (key === 'type') {
      if (sourseData[key] !== filterData[key]) {
        return false;
      }
    }

    if (key === 'features') {
      for (var i = 0; i < filterData[key].length; i++) {
        if (sourseData[key].indexOf(filterData[key][i]) === -1) {
          return false;
        }
      }
    }

    if (key === 'price') {
      var variantsPrice = {
        middle: [10000, 50000],
        low: [0, 9999],
        high: [50001, 100000000]
      };

      return variantsPrice[filterData[key]][0] <= sourseData[key] && variantsPrice[filterData[key]][1] >= sourseData[key];
    }

    return true;
  }

  function displayFilteredPins() {
    window.form.removePinCard();
    window.pin.renderPin(window.filter.getFilteredData(window.filter.ads));
  }

  var filterFields = document.querySelectorAll('.map__filters select');
  var filterFeature = document.querySelectorAll('#housing-features input');

  window.filter = {
    getFilteredData: function (data) {
      var filteredAds = data.filter(function (ad) {
        return Object.keys(window.filter.filter).every(function (key) {
          return !window.filter.filter[key] || getFilter(ad.offer, window.filter.filter, key);
        });
      });
      return filteredAds;
    },
    ads: {},
    filter: {
      features: []
    }
  };

  filterFields.forEach(function (field) {
    field.addEventListener('change', function () {
      if (field.value !== 'any') {
        window.filter.filter[field.id.split('-').slice(-1)] = field.value;
      } else {
        delete window.filter.filter[field.id.split('-').slice(-1)];
      }

      window.utils.debounce(displayFilteredPins, 500);
    });
  });

  filterFeature.forEach(function (feature) {
    feature.addEventListener('change', function () {
      if (feature.checked) {
        window.filter.filter.features.push(feature.value);
      } else {
        window.filter.filter.features.splice(window.filter.filter.features.indexOf(feature.value), 1);
      }

      window.utils.debounce(displayFilteredPins, 500);
    });
  });
})();
