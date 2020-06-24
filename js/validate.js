'use strict';

(function () {
  var ROOMS_MAX_VALUE = '100';

  var GUESTS_MIN_VALUE = '0';

  var adForm = document.querySelector('.ad-form');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  var validateRooms = function () {
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
        guestsList[guestsList.length - 1].disabled = true;
      });
    }
  };

  var validateGuests = function () {
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
        roomsList[roomsList.length - 1].disabled = true;
      });
    }
  };

  window.validate = {
    validateRooms: validateRooms,
    validateGuests: validateGuests
  };
})();
