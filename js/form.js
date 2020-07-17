'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var addressField = form.querySelector('#address');
  var roomsNumber = form.querySelector('#room_number');
  var guestsNumber = form.querySelector('#capacity');
  var homeType = form.querySelector('#type');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

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

  var onFormSubmit = function (evt) {
    window.backend.upload(new FormData(form), function () {

    });
    evt.preventDefault();
  };

  form.addEventListener('submit', onFormSubmit);

  window.form = {
    addressField: addressField,
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
