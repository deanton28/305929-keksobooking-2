'use strict';
window.filter = {};

(function (exports) {
  exports.ads = {};
  exports.filters = {
    features: []
  };

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

      if (filterData[key] === 'any') {
        return true;
      }

      if (variantsPrice[filterData[key]][0] <= sourseData[key] && variantsPrice[filterData[key]][1] >= sourseData[key]) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  exports.getFilteredData = function (data) {
    var filteredAds = data.filter(function (ad) {
      return Object.keys(exports.filters).every(function (key) {
        return !exports.filters[key] || getFilter(ad.offer, exports.filters, key);
      });
    });
    return filteredAds;
  };

  function displayFilteredPins() {
    window.form.removePinCard();
    window.pin.renderPin(exports.getFilteredData(exports.ads));
  }

  var filterFields = document.querySelectorAll('.map__filters select');
  var filterFeature = document.querySelectorAll('#housing-features input');

  filterFields.forEach(function (field) {
    field.addEventListener('change', function () {
      if (field.value !== 'any') {
        exports.filters[field.id.split('-').slice(-1)] = field.value;
      } else {
        delete exports.filters[field.id.split('-').slice(-1)];
      }

      window.utils.debounce(displayFilteredPins, 500);
    });
  });

  filterFeature.forEach(function (feature) {
    feature.addEventListener('change', function () {
      if (feature.checked) {
        exports.filters.features.push(feature.value);
      } else {
        exports.filters.features.splice(exports.filters.features.indexOf(feature.value), 1);
      }

      window.utils.debounce(displayFilteredPins, 500);
    });
  });
})(window.filter);
