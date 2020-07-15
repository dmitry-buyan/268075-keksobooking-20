'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');
  var homeType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

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

  roomsNumber.addEventListener('change', function () {
    window.validate.onRoomsChange();
  });

  guestsNumber.addEventListener('change', function () {
    window.validate.onGuestsChange();
  });

  homeType.addEventListener('change', function () {
    window.validate.onHomeTypeChange();
  });

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  window.form = {
    addressField: addressField,
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
