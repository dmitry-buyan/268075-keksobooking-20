'use strict';

var PINS_COUNT = 8;

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var TIMES = ['12:00', '13:00', '14:00'];

var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var HOUSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var COORDS = {
  minX: 0,
  maxX: 1150,
  minY: 130,
  maxY: 630
};

var FILE_TYPES = {
  'png': '.png',
  'jpg': '.jpg'
};

var AVATAR_IMG = 'img/avatars/user0';

var MAIN_PIN = {
  x: 570,
  y: 375,
  width: 65,
  height: 65,
  centerX: 600,
  centerY: 405,
  sharpEdgeY: 460
};

var ROOMS_MAX_VALUE = '100';

var Buttons = {
  ENTER: 'Enter',
  ESCAPE: 'Escape'
};

var map = document.querySelector('.map');

var pinsList = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mainPin = map.querySelector('.map__pin--main');

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

var generatePinsData = function (count) {
  var pins = [];

  for (var i = 1; i <= count; i++) {
    var x = getRandomNumberInRange(COORDS.minX, COORDS.maxX) + 'px';
    var y = getRandomNumberInRange(COORDS.minY, COORDS.maxY) + 'px';

    pins.push({
      author: {
        avatar: AVATAR_IMG + i + FILE_TYPES.png
      },

      offer: {
        title: 'Заголовок ' + i,
        address: x + ', ' + y,
        price: getRandomNumberInRange(0, 100000),
        type: getRandomArrayElement(HOUSE_TYPES),
        rooms: getRandomNumberInRange(1, 6),
        guests: getRandomNumberInRange(1, 12),
        checkin: getRandomArrayElement(TIMES),
        checkout: getRandomArrayElement(TIMES),
        features: getRandomSubArray(HOUSE_FEATURES),
        description: 'строка с описанием',
        photos: getRandomSubArray(shuffleArray(HOUSE_PHOTOS))
      },

      location: {
        x: x,
        y: y
      }
    });
  }

  return pins;
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

var adForm = document.querySelector('.ad-form');

var formFieldsets = adForm.querySelectorAll('fieldset');

var addressField = adForm.querySelector('#address');

var setAddressValue = function () {
  addressField.value = MAIN_PIN.centerX + ', ' + MAIN_PIN.centerY;
};

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

var onMainPinClick = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateForm();
};

var setPinAddress = function (obj) {
  addressField.value = obj.centerX + ', ' + obj.sharpEdgeY;
};

var onMapActivate = function (evt) {
  if (evt.button === 0 || evt.key === Buttons.ENTER) {
    evt.preventDefault();
    onMainPinClick();
    setPinAddress(MAIN_PIN);
    renderPins(generatePinsData(PINS_COUNT));
  }

  evt.currentTarget.removeEventListener('mousedown', onMapActivate);
  evt.currentTarget.removeEventListener('keydown', onMapActivate);
};

mainPin.addEventListener('mousedown', onMapActivate);

mainPin.addEventListener('keydown', onMapActivate);

var roomsList = adForm.querySelector('#room_number');

var guestsList = adForm.querySelector('#capacity');

var validateSelect = function () {
  var currentValue = roomsList.value;
  if (currentValue === ROOMS_MAX_VALUE) {
    for (var i = 0; i < guestsList.length; i++) {
      guestsList.options[i].disabled = true;
    }
    guestsList.options[guestsList.length - 1].disabled = false;
    guestsList.options[guestsList.length - 1].selected = true;
  } else {
    for (var j = 0; j < guestsList.length; j++) {
      guestsList.options[j].disabled = j >= currentValue;
    }
  }
};

roomsList.addEventListener('change', validateSelect);

setAddressValue();

deactivateForm();
