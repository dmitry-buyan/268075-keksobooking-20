'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('.ad-form__element');
  var addressField = adForm.querySelector('#address');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');
  var homeType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var activateForm = function () {
    formFieldsets.forEach(function (it) {
      if (it.hasAttribute('disabled')) {
        it.removeAttribute('disabled');
      }
    });
  };

  var deactivateForm = function () {
    formFieldsets.forEach(function (it) {
      if (!it.hasAttribute('disabled')) {
        it.setAttribute('disabled', 'disabled');
      }
    });
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

  var onFormSubmit = function (evt) {
    window.backend.upload(new FormData(adForm), function () {

    });
    evt.preventDefault();
    adForm.reset();
  };

  adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    addressField: addressField,
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
