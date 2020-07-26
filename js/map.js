'use strict';

(function () {
  var ENTER = 'Enter';

  var BUTTON_LEFT = 0;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');

  var setMainPinAddress = function () {
    var x = Math.floor(window.pin.coords.x + window.pin.mainPin.width / 2);
    var y = Math.floor(window.pin.coords.y + window.pin.mainPin.height);
    addressField.value = x + ', ' + y;
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var onMapActivate = function (evt) {
    if (evt.key === ENTER || evt.button === BUTTON_LEFT) {
      activateMap();
      window.backend.load(window.pin.onSuccessLoad, window.pin.onErrorLoad);
      window.form.activate();
    }

    mainPin.removeEventListener('mousedown', onMapActivate);
    mainPin.removeEventListener('keydown', onMapActivate);
  };

  mainPin.addEventListener('mousedown', onMapActivate);
  mainPin.addEventListener('keydown', onMapActivate);

  window.map = {
    setPinAddress: setMainPinAddress,
    deactivate: deactivateMap,
    onMapClick: onMapActivate
  };
})();
