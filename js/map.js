'use strict';

(function () {
  var ENTER = 'Enter';

  var BUTTON_LEFT = 0;

  var PINS_COUNT = 8;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinsList = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pins) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = pins.author.avatar;
    pinElement.querySelector('img').alt = pins.offer.title;
    pinTemplate.style.left = pins.location.x;
    pinTemplate.style.top = pins.location.y;

    return pinElement;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    pinsList.appendChild(fragment);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var onMapActivate = function (evt) {
    if (evt.key === ENTER || evt.button === BUTTON_LEFT) {
      activateMap();
      window.form.activateForm();
      window.form.setAddressFieldValue();
      renderPins(window.pin.generatePinsData(PINS_COUNT));
    }

    mainPin.removeEventListener('mousedown', onMapActivate);
    mainPin.removeEventListener('keydown', onMapActivate);
  };

  mainPin.addEventListener('mousedown', onMapActivate);
  mainPin.addEventListener('keydown', onMapActivate);
})();
