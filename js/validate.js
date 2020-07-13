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

  var HomeType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var HomeMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');
  var homeType = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  var onHomeTypeChange = function () {
    APPARTMENTS.forEach(function (it) {
      if (it.name === homeType.value) {
        priceField.setAttribute('min', it.minPrice);
        priceField.placeholder = it.minPrice;
        priceField.value = '';
      }
    });
  };

  var onPriceInput = function () {
    var homeTypeList = Array.from(homeType);
    var currentValue = priceField.value;

    if (currentValue < HomeMinPrice.FLAT) {
      homeTypeList.forEach(function (option) {
        option.disabled = true;
        if (option.value === HomeType.BUNGALO) {
          option.selected = true;
          option.disabled = false;
        }
      });
    } else if (currentValue < HomeMinPrice.HOUSE) {
      homeTypeList.forEach(function (option) {
        option.disabled = true;
        if (option.value === HomeType.FLAT) {
          option.selected = true;
          option.disabled = false;
        }
      });
    } else if (currentValue < HomeMinPrice.PALACE) {
      homeTypeList.forEach(function (option) {
        option.disabled = true;
        if (option.value === HomeType.HOUSE) {
          option.selected = true;
          option.disabled = false;
        }
      });
    } else if (currentValue >= HomeMinPrice.FLAT && currentValue < HomeMinPrice.HOUSE) {
      homeTypeList.forEach(function (option) {
        option.disabled = true;
        if (option.value === HomeType.FLAT) {
          option.selected = true;
          option.disabled = false;
        }
      });
    } else if (currentValue >= HomeMinPrice.HOUSE && currentValue < HomeMinPrice.PALACE) {
      homeTypeList.forEach(function (option) {
        option.disabled = true;
        if (option.value === HomeType.HOUSE) {
          option.selected = true;
          option.disabled = false;
        }
      });
    } else if (currentValue >= HomeMinPrice.PALACE) {
      homeTypeList.forEach(function (option) {
        option.disabled = true;
        if (option.value === HomeType.PALACE) {
          option.selected = true;
          option.disabled = false;
        }
      });
    }
  };

  var onRoomsChange = function () {
    var guestsList = Array.from(guestsNumber);
    var currentValue = roomsNumber.value;
    if (currentValue === ROOMS_MAX_VALUE) {
      guestsList.forEach(function (option) {
        option.disabled = true;
      });
      guestsList[guestsList.length - 1].disabled = false;
      guestsList[guestsList.length - 1].selected = true;
    } else {
      guestsList.forEach(function (option) {
        var guests = option.value;
        if (guests <= currentValue) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
        if (currentValue === option.value) {
          option.selected = true;
        }
        guestsList[guestsList.length - 1].disabled = true;
      });
    }
  };

  var onGuestsChange = function () {
    var roomsList = Array.from(roomsNumber);
    var currentValue = guestsNumber.value;
    if (currentValue === GUESTS_MIN_VALUE) {
      roomsList.forEach(function (option) {
        option.disabled = true;
      });
      roomsList[roomsList.length - 1].disabled = false;
      roomsList[roomsList.length - 1].selected = true;
    } else {
      roomsList.forEach(function (option) {
        var rooms = option.value;
        if (rooms >= currentValue) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
        if (currentValue === option.value) {
          option.selected = true;
        }
        roomsList[roomsList.length - 1].disabled = true;
      });
    }
  };

  window.validate = {
    onHomeTypeChange: onHomeTypeChange,
    onPriceInput: onPriceInput,
    onRoomsChange: onRoomsChange,
    onGuestsChange: onGuestsChange
  };
})();
