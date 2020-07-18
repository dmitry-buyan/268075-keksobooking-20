'use strict';

(function () {
  var MAX_PINS_COUNT = 8;

  var MAIN_PIN = {
    width: 65,
    height: 65,
    left: 568,
    top: 375
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinsList = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');

  var mainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  var setMainPinToCenter = function () {
    mainPin.style.left = map.offsetWidth / 2 - Math.floor(MAIN_PIN.width / 2) + 'px';
  };

  var resetMainPin = function () {
    mainPin.style.left = MAIN_PIN.left + 'px';
    mainPin.style.top = MAIN_PIN.top + 'px';
    addressField.value = MAIN_PIN.left + ', ' + MAIN_PIN.top;
  };


  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinTemplate.style.left = pin.location.x + 'px';
    pinTemplate.style.top = pin.location.y + 'px';

    pinElement.addEventListener('click', function (evt) {
      window.card.renderCardData(pin);
      window.popup.openPopup();
      if (document.activeElement === evt.target) {
        evt.currentTarget.setAttribute('disabled', 'disabled');
      }
    });

    return pinElement;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_PINS_COUNT; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    pinsList.appendChild(fragment);
  };

  var onSuccess = function (data) {
    renderPins(data);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (it) {
      if (!it.classList.contains('map__pin--main')) {
        it.remove();
      }
    });
  };

  var onError = function (message) {
    var node = document.createElement('div');
    var errorText = document.createElement('p');
    node.classList.add('error');
    errorText.textContent = message;
    errorText.classList.add('error__message');
    node.appendChild(errorText);
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.addEventListener('resize', setMainPinToCenter);

  window.addEventListener('load', function () {
    setMainPinToCenter();
    window.form.deactivateForm();
    window.map.setMainPinAddress();
  });

  window.pin = {
    MAIN_PIN: MAIN_PIN,
    MAX_PINS_COUNT: MAX_PINS_COUNT,
    mainPinCoords: mainPinCoords,
    removePins: removePins,
    resetMainPin: resetMainPin,
    onSuccess: onSuccess,
    onError: onError
  };
})();
