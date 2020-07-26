'use strict';

(function () {
  var PIN_ACTIVE = 'map__pin--active';

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

  var onPageResize = function () {
    mainPin.style.left = map.offsetWidth / 2 - Math.floor(MAIN_PIN.width / 2) + 'px';
  };

  var resetMainPin = function () {
    mainPin.style.left = MAIN_PIN.left + 'px';
    mainPin.style.top = MAIN_PIN.top + 'px';
    addressField.value = MAIN_PIN.left + ', ' + MAIN_PIN.top;
    mainPin.addEventListener('mousedown', window.map.onMapClick);
  };


  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinTemplate.style.left = pin.location.x + 'px';
    pinTemplate.style.top = pin.location.y + 'px';

    pinElement.addEventListener('click', function (evt) {
      window.card.renderData(pin);
      window.popup.open();
      setPinInactive();
      if (document.activeElement === evt.currentTarget) {
        evt.target.disabled = true;
        evt.currentTarget.classList.add(PIN_ACTIVE);
      }
    });

    return pinElement;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    removePins();
    window.popup.close();

    pins.forEach(function (it) {
      fragment.appendChild(renderPin(it));
    });

    pinsList.appendChild(fragment);
  };

  var onSuccess = function (data) {
    window.offers = data;
    renderPins(window.filter.filterData(data));
  };

  var setPinInactive = function () {
    var activePins = document.querySelectorAll('.map__pin--active');
    if (activePins) {
      activePins.forEach(function (it) {
        it.classList.remove(PIN_ACTIVE);
      });
    }
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

  window.addEventListener('resize', onPageResize);

  window.addEventListener('load', function () {
    onPageResize();
    window.form.deactivate();
    window.map.setPinAddress();
  });

  window.pin = {
    mainPin: MAIN_PIN,
    coords: mainPinCoords,
    render: renderPins,
    remove: removePins,
    reset: resetMainPin,
    onSuccessLoad: onSuccess,
    onErrorLoad: onError,
    showPinActive: setPinInactive
  };
})();
