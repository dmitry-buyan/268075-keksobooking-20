'use strict';

(function () {
  var MIN_PINS_COUNT = 0;
  var MAX_PINS_COUNT = 5;

  var filterForm = document.querySelector('.map__filters');

  var HouseFilter = {
    TYPE: filterForm.querySelector('#housing-type'),
    PRICE: filterForm.querySelector('#housing-price'),
    ROOMS: filterForm.querySelector('#housing-rooms'),
    GUESTS: filterForm.querySelector('#housing-guests'),
    FEATURES: filterForm.querySelector('#housing-features')
  };

  var filterPrice = {
    low: 10000,
    high: 50000
  };

  var getHouseTypeValue = function (it) {
    return it.offer.type === HouseFilter.TYPE.value || HouseFilter.TYPE.value === 'any';
  };

  var getHousePriceValue = function (it) {
    switch (HouseFilter.PRICE.value) {
      case 'low':
        return it.offer.price < filterPrice.low;
      case 'middle':
        return it.offer.price >= filterPrice.low && it.offer.price < filterPrice.high;
      case 'high':
        return it.offer.price >= filterPrice.high;
      default:
        return true;
    }
  };

  var getHouseRoomsValue = function (it) {
    return it.offer.rooms === Number(HouseFilter.ROOMS.value) || HouseFilter.ROOMS.value === 'any';
  };

  var getHouseGuestsValue = function (it) {
    return it.offer.guests === Number(HouseFilter.GUESTS.value) || HouseFilter.GUESTS.value === 'any';
  };

  var getHouseFeaturesValue = function (it) {
    var checkedFeatures = Array.from(HouseFilter.FEATURES.querySelectorAll('input:checked'));
    return checkedFeatures.every(function (feature) {
      return it.offer.features.includes(feature.value);
    });
  };

  var filterPins = function (data) {
    var filteredPins = data
    .filter(function (it) {
      return (
        getHouseTypeValue(it) &&
        getHousePriceValue(it) &&
        getHouseRoomsValue(it) &&
        getHouseGuestsValue(it) &&
        getHouseFeaturesValue(it)
      );
    })
    .slice(MIN_PINS_COUNT, MAX_PINS_COUNT);

    return filteredPins;
  };

  var onFormChange = window.debounce(function () {
    window.pin.renderPins(filterPins(window.offers));
  });

  filterForm.addEventListener('change', onFormChange);

  window.filter = {
    filterPins: filterPins
  };
})();