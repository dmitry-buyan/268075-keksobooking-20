'use strict';

(function () {
  var ENTER = 'Enter';

  var BUTTON_LEFT = 0;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var onMapActivate = function (evt) {
    if (evt.key === ENTER || evt.button === BUTTON_LEFT) {
      activateMap();
      window.load(window.pin.onSuccess, window.pin.onError);
      window.form.activateForm();
      window.form.setAddressFieldValue();
    }

    mainPin.removeEventListener('mousedown', onMapActivate);
    mainPin.removeEventListener('keydown', onMapActivate);
  };

  window.load(window.card.onSuccess);

  mainPin.addEventListener('mousedown', onMapActivate);
  mainPin.addEventListener('keydown', onMapActivate);
})();
