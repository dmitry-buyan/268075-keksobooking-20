'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var MIN_PRICE = 0;

  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('.ad-form__element');
  var homeType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var userAvatar = adForm.querySelector('.ad-form-header__preview').querySelectorAll('img');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var filterForm = document.querySelector('.map__filters');
  var priceField = adForm.querySelector('#price');

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

  var roomsSelect = adForm.querySelector('#room_number');
  var guestsSelect = adForm.querySelector('#capacity');

  roomsSelect.addEventListener('change', function () {
    window.validate.onRoomsChange();
  });

  guestsSelect.addEventListener('change', function () {
    window.validate.onRoomsChange();
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
    window.pin.reset();
    window.pin.remove();
    window.map.deactivate();
    window.popup.showMessage('success');
    window.preview.reset();
  };

  var onFormSubmitError = function () {
    window.popup.showMessage('error');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onFormSubmitSuccess, onFormSubmitError);
  };

  adForm.addEventListener('submit', onFormSubmit);

  var resetForm = function () {
    adForm.reset();
    filterForm.reset();
    userAvatar.src = DEFAULT_AVATAR;
    priceField.placeholder = MIN_PRICE;
    priceField.value = '';
    deactivateForm();
    window.preview.reset();
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    resetForm();
    window.pin.reset();
    window.pin.remove();
    window.card.close();
    window.map.deactivate();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
