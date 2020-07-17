'use strict';

(function () {
  var MAX_PINS_COUNT = 8;

  var MAIN_PIN = {
    width: 65,
    height: 65
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinsList = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var setMainPinToCenter = function () {
    mainPin.style.left = map.offsetWidth / 2 - Math.floor(MAIN_PIN.width / 2) + 'px';
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
    window.drag.setMainPinAddress(window.drag.mainPinCoords.x + window.pin.MAIN_PIN.width / 2, window.drag.mainPinCoords.y + window.pin.MAIN_PIN.height);
  });

  window.pin = {
    MAIN_PIN: MAIN_PIN,
    MAX_PINS_COUNT: MAX_PINS_COUNT,
    onSuccess: onSuccess,
    onError: onError
  };
})();
