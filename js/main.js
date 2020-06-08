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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsList = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRandomValue = function (arr) {
  var value = getRandomIndex(arr);
  return arr[value];
};

var getRandomData = function (arr) {
  var start = getRandomIndex(arr);
  var end = getRandomIndex(arr);
  return arr.slice(start, end);
};

var getRandomRangeValue = function (min, max) {
  return Math.random() * (max - min) + min;
};

var shuffleArray = function (arr) {
  var clonedArray = arr.slice();

  for (var i = clonedArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = clonedArray[i];
    clonedArray[i] = clonedArray[j];
    clonedArray[j] = temp;
  }

  return getRandomData(clonedArray);
};

var generatePinsData = function (count) {
  var pins = [];
  var avatarImg = 'img/avatars/user0';
  var fileTypes = {
    'png': '.png',
    'jpg': '.jpg'
  };

  var Coords = {
    minX: 0,
    maxX: pinsList.offsetWidth - 50,
    minY: 130,
    maxY: 630
  };

  for (var i = 1; i <= count; i++) {
    pins.push({
      author: {
        avatar: avatarImg + i + fileTypes.png
      },

      offer: {
        title: 'Заголовок ' + i,
        address: location.x + ',' + location.y,
        price: 'число, стоимость',
        type: getRandomValue(HOUSE_TYPES),
        rooms: 'число, количество комнат',
        guests: 'число, количество гостей, которое можно разместить',
        checkin: getRandomValue(TIMES),
        checkout: getRandomValue(TIMES),
        features: getRandomData(HOUSE_FEATURES),
        description: 'строка с описанием',
        photos: shuffleArray(HOUSE_PHOTOS)
      },

      location: {
        x: getRandomRangeValue(Coords.minX, Coords.maxX) + 'px',
        y: getRandomRangeValue(Coords.minY, Coords.maxY) + 'px'
      }
    });
  }

  return pins;
};

var renderPin = function (arrayOfPins) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = arrayOfPins.author.avatar;
  pinElement.querySelector('img').alt = arrayOfPins.offer.title;
  pinTemplate.style.left = arrayOfPins.location.x;
  pinTemplate.style.top = arrayOfPins.location.y;

  return pinElement;
};

var renderPins = function (arrayOfPins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayOfPins.length; i++) {
    fragment.appendChild(renderPin(arrayOfPins[i]));
  }

  pinsList.appendChild(fragment);
};

renderPins(generatePinsData(PINS_COUNT));
