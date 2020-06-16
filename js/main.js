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

var PRICE = {
  MIN: '0',
  MAX: '100000'
};

var MAP_COORDS = {
  startX: 0,
  startY: 130,
  endY: 630
};

var FILE_TYPES = {
  'png': '.png',
  'jpg': '.jpg'
};

var AVATAR_IMG = 'img/avatars/user0';

var MAIN_PIN = {
  width: 65,
  height: 65
};

var PIN = {
  width: 50,
  height: 70
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

var generatePinsData = function (count) {
  var pins = [];

  for (var i = 1; i <= count; i++) {
    var x = getRandomNumberInRange(MAP_COORDS.startX, map.offsetWidth);
    var y = getRandomNumberInRange(MAP_COORDS.startY, MAP_COORDS.endY);

    pins.push({
      author: {
        avatar: AVATAR_IMG + i + FILE_TYPES.png
      },

      offer: {
        title: 'Заголовок ' + i,
        address: x + ', ' + y,
        price: getRandomNumberInRange(PRICE.min, PRICE.max),
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
  pinTemplate.style.left = pins.location.x - (PIN.width / 2) + 'px';
  pinTemplate.style.top = pins.location.y + 'px';

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

var setAddressFieldValue = function () {
  addressField.value = map.offsetWidth / 2 + ', ' + map.offsetHeight / 2;
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

var onMapActivate = function (evt) {
  if (evt.button === 0 || evt.key === Buttons.ENTER) {
    evt.preventDefault();
    onMainPinClick();
    setAddressFieldValue();
    renderPins(generatePinsData(PINS_COUNT));
  }

  evt.currentTarget.removeEventListener('mousedown', onMapActivate);
  evt.currentTarget.removeEventListener('keydown', onMapActivate);
};

mainPin.addEventListener('mousedown', onMapActivate);

mainPin.addEventListener('keydown', onMapActivate);

var roomsList = adForm.querySelector('#room_number');

var guestsList = Array.from(adForm.querySelector('#capacity'));

var validateSelect = function () {
  var currentValue = roomsList.value;
  if (currentValue === ROOMS_MAX_VALUE) {
    guestsList.forEach(function (option) {
      option.disabled = true;
    });
    guestsList[guestsList.length - 1].disabled = false;
    guestsList[guestsList.length - 1].selected = true;
  } else {
    guestsList.forEach(function (option) {
      var guests = option.value;
      if (guests <= currentValue) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
      guestsList[guestsList.length - 1].disabled = true;
    });
  }
};

roomsList.addEventListener('change', validateSelect);

window.addEventListener('resize', function () {
  setMainPinToCenter();
});

window.addEventListener('load', function () {
  setMainPinToCenter();
  setAddressFieldValue();
  deactivateForm();
});
