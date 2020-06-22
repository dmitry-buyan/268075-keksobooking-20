'use strict';

(function () {
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

  var getRandomArrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getRandomArrayElement = function (arr) {
    var value = getRandomArrayIndex(arr);
    return arr[value];
  };

  var getRandomSubArray = function (arr) {
    var start = getRandomArrayIndex(arr);
    var end = getRandomArrayIndex(arr);
    return arr.slice(start, end);
  };

  var getRandomNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var shuffleArray = function (arr) {
    var clonedArray = arr.slice();

    for (var i = clonedArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = clonedArray[i];
      clonedArray[i] = clonedArray[j];
      clonedArray[j] = temp;
    }

    return clonedArray;
  };

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

  window.addEventListener('resize', setMainPinToCenter);

  window.addEventListener('load', function () {
    setMainPinToCenter();
    window.form.setAddressFieldValue();
    window.form.deactivateForm();
  });

  window.pin = {
    getRandomArrayElement: getRandomArrayElement,
    getRandomSubArray: getRandomSubArray,
    getRandomNumberInRange: getRandomNumberInRange,
    shuffleArray: shuffleArray,
    renderPins: renderPins
  };
})();
