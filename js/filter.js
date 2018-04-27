'use strict';

// console.log(window.data.ads);

// for (var i = 0; i < window.data.ads.length; i++) {
// //   console.log(`${window.data.ads[i].offer.rooms} / ${window.data.ads[i].offer.type} / ${window.data.ads[i].offer.guests} / ${window.data.ads[i].offer.features} / ${window.data.ads[i].offer.price}`);
// // }

var filters = {
  price: [10000, 50000],
  // type: 'bungalo',
  // rooms: '',
  // guests: '',
  features: []
};

var variantsPrice = {
  middle: [10000, 50000],
  low: [0, 9999],
  high: [50001, 1000000]
};

function arrFiltered(arr1, arr2, key) {
  // поставить это как условие на самый верх.
  if (key !== 'price' && key !== 'features') {
    // console.log(`${arr1[key]} / ${arr2[key]}`)
    // console.log(arr1[key] !== arr2[key])
    if (arr1[key] !== arr2[key]) {
      return false;
    }
  }

  // if key === features ....   if key === price .... сделать так.
  if (key === 'features') {
    // console.log(`${arr1[key]} / ${arr2[key]}`)
    // console.log(arr1[key] === arr2[key])
    for (var i = 0; i < arr2[key].length; i++) {
      if (arr1[key].indexOf(arr2[key][i]) === -1) {
        return false;
      }
    }
    // return true;
  }

  if (key === 'price') {
    // console.log(`${arr2[key][0]} / ${arr2[key][1]} / ${arr1[key]}`)
    // console.log(arr2[key][0] <= arr1[key] && arr2[key][1] >= arr1[key]);
    if (arr2[key][0] <= arr1[key] && arr2[key][1] >= arr1[key]) {
      return true;
    } else {
      return false;
    }
  }

  return true;
}

var filterHouseType = document.getElementById('housing-type');
var filterHousePrice = document.getElementById('housing-price');
var filterHouseRooms = document.getElementById('housing-rooms');

filterHouseType.addEventListener('change', function () {
  // console.log(filterHouseType.value);
  if (filterHouseType.value !== 'any') {
    filters.type = filterHouseType.value;
  } else {
    delete filters.type;
  }
  // console.log(filters.type);
  // console.log(filters);
});

filterHousePrice.addEventListener('change', function () {
  // console.log(filterHousePrice.value);
  if (filterHousePrice.value !== 'any') {
    filters.price = variantsPrice[filterHousePrice.value];
  } else {
    delete filters.price;
  }
  // console.log(filters.price);
  // console.log(filters);
});

filterHouseRooms.addEventListener('change', function () {
  // console.log(filterHouseRooms.value);
  if (filterHouseRooms.value !== 'any') {
    filters.rooms = filterHouseRooms.value;
  } else {
    delete filters.rooms;
  }
  // console.log(filters.rooms);
  // console.log(filters);
});

var filteredAds = window.data.ads.filter(function (ad) {
  // console.log(`фильтр = ${filters.rooms} / ${filters.type} / ${filters.guests} / ${filters.features} / ${filters.price}`);
  return Object.keys(filters).every(function (key) {
    // console.log(`${filters[key]}  / ${ad.offer[key]}`)
    // console.log(filters[key] === ad.offer[key]);
    return !filters[key] || arrFiltered(ad.offer, filters, key);
  });
});

// console.log(filteredAds);
