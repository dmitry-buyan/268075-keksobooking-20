'use strict';

(function () {
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
    height: 70,
    pointWidth: 10,
    pointHeight: 22
  };

  var map = document.querySelector('.map');
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

  window.pin.generatePinsData = function (count) {
    var pins = [];

    for (var i = 1; i <= count; i++) {
      var x = getRandomNumberInRange(MAP_COORDS.startX, map.offsetWidth - PIN.width);
      var y = getRandomNumberInRange(MAP_COORDS.startY, MAP_COORDS.endY);

      pins.push({
        author: {
          avatar: AVATAR_IMG + i + FILE_TYPES.png
        },

        offer: {
          title: 'Заголовок ' + i,
          address: x + ', ' + y,
          price: getRandomNumberInRange(PRICE.min, PRICE.max),
          type: getRandomArrayElement(window.data.HOUSE_TYPES),
          rooms: getRandomNumberInRange(1, 6),
          guests: getRandomNumberInRange(1, 12),
          checkin: getRandomArrayElement(window.data.TIMES),
          checkout: getRandomArrayElement(window.data.TIMES),
          features: getRandomSubArray(window.data.HOUSE_FEATURES),
          description: 'строка с описанием',
          photos: getRandomSubArray(shuffleArray(window.data.HOUSE_PHOTOS))
        },

        location: {
          x: (x - PIN.width / 2) + 'px',
          y: (y - PIN.height - PIN.pointHeight) + 'px'
        }
      });
    }

    return pins;
  };

  window.addEventListener('resize', setMainPinToCenter);

  window.addEventListener('load', function () {
    setMainPinToCenter();
    window.form.setAddressFieldValue();
    window.form.deactivateForm();
  });
})();
