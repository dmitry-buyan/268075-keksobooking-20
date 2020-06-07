'use strict';

var PINS_COUNT = 8;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

var generatePinsData = function (count) {
  var pins = [];
  var avatarImg = 'img/avatars/user0';
  var fileTypes = {
    'png': '.png',
    'jpg': '.jpg'
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
        photos: ''
      },

      location: {
        x: 'случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка',
        y: 'лучайное число, координата y метки на карте от 130 до 630'
      }
    });
  }

  return pins;
};

var renderPins = function (arrayOfPins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayOfPins.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = arrayOfPins[i].author.avatar;
    pinElement.querySelector('img').alt = arrayOfPins[i].offer.title;

    fragment.appendChild(pinElement);
  }

  pinsList.appendChild(fragment);
};

renderPins(generatePinsData(PINS_COUNT));
