'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  var setAddressFieldValue = function () {
    addressField.value = map.offsetWidth / 2 + ', ' + map.offsetHeight / 2;
  };

  var activateForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      if (formFieldsets[i].hasAttribute('disabled')) {
        formFieldsets[i].removeAttribute('disabled');
      }
    }
  };

  var deactivateForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      if (!formFieldsets[i].hasAttribute('disabled')) {
        formFieldsets[i].setAttribute('disabled', 'disabled');
      }
    }
  };

  roomsNumber.addEventListener('change', window.validate.validateRooms);
  guestsNumber.addEventListener('change', window.validate.validateGuests);

  window.form = {
    setAddressFieldValue: setAddressFieldValue,
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();