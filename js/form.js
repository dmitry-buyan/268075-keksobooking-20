'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('.ad-form__element');
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');
  var homeType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var userAvatar = adForm.querySelector('.ad-form-header__preview').querySelectorAll('img');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var filterForm = document.querySelector('.map__filters');

  var activateForm = function () {
    formFieldsets.forEach(function (it) {
      if (it.hasAttribute('disabled')) {
        it.disabled = false;
      }
    });

    Array.from(filterForm).forEach(function (it) {
      it.disabled = false;
    });
  };

  var deactivateForm = function () {
    formFieldsets.forEach(function (it) {
      if (!it.hasAttribute('disabled')) {
        it.disabled = true;
      }
    });

    Array.from(filterForm).forEach(function (it) {
      it.disabled = true;
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

  var onFormSubmitSuccess = function () {
    adForm.reset();
    deactivateForm();
    window.pin.resetMainPin();
    window.pin.removePins();
    window.map.deactivateMap();
    window.map.mainPin.addEventListener('mousedown', window.map.onMapActivate);
    window.map.mainPin.addEventListener('keydown', window.map.onMapActivate);
    window.popup.showMessage('success');
  };

  var onFormSubmitError = function () {
    window.popup.showMessage('error');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onFormSubmitSuccess, onFormSubmitError);
  };

  adForm.addEventListener('submit', onFormSubmit);

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    adForm.reset();
    userAvatar.src = DEFAULT_AVATAR;
    window.pin.resetMainPin();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
