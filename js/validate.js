'use strict';

(function () {
  var ROOMS_MAX_VALUE = '100';
  var GUESTS_MIN_VALUE = '0';

  var APPARTMENTS = [
    {
      name: 'bungalo',
      minPrice: 0
    },
    {
      name: 'flat',
      minPrice: 1000
    },
    {
      name: 'house',
      minPrice: 5000
    },
    {
      name: 'palace',
      minPrice: 10000
    }
  ];

  var adForm = document.querySelector('.ad-form');
  var homeType = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  var onHomeSelect = function () {
    APPARTMENTS.forEach(function (it) {
      if (it.name === homeType.value) {
        priceField.min = it.minPrice;
        priceField.placeholder = it.minPrice;
        priceField.value = '';
      }
    });
  };

  var roomsSelect = adForm.querySelector('#room_number');
  var guestsSelect = adForm.querySelector('#capacity');

  var onRoomsNumberSelect = function () {
    if (roomsSelect.value === ROOMS_MAX_VALUE && guestsSelect.value !== GUESTS_MIN_VALUE) {
      roomsSelect.setCustomValidity('100 комнат — «не для гостей»');
    } else if (roomsSelect.value < guestsSelect.value && guestsSelect.value !== GUESTS_MIN_VALUE) {
      roomsSelect.setCustomValidity('Число гостей не должно превышать количество комнат');
    } else if (roomsSelect.value !== ROOMS_MAX_VALUE && guestsSelect.value === GUESTS_MIN_VALUE) {
      roomsSelect.setCustomValidity('Не для гостей только 100 комнат');
    } else {
      roomsSelect.setCustomValidity('');
    }
  };

  window.validate = {
    onHomeTypeChange: onHomeSelect,
    onRoomsChange: onRoomsNumberSelect
  };
})();
