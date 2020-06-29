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

  var PIN = {
    width: 50,
    height: 70,
    pointWidth: 10,
    pointHeight: 22
  };

  var AVATAR_IMG = 'img/avatars/user0';

  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var TIMES = ['12:00', '13:00', '14:00'];

  var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var HOUSE_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var map = document.querySelector('.map');

  var generateData = function (count) {
    var pins = [];

    for (var i = 1; i <= count; i++) {
      var x = window.pin.getRandomNumberInRange(MAP_COORDS.startX, map.offsetWidth - PIN.width);
      var y = window.pin.getRandomNumberInRange(MAP_COORDS.startY, MAP_COORDS.endY);

      pins.push({
        author: {
          avatar: AVATAR_IMG + i + FILE_TYPES.png
        },

        offer: {
          title: 'Заголовок ' + i,
          address: x + ', ' + y,
          price: window.pin.getRandomNumberInRange(PRICE.min, PRICE.max),
          type: window.pin.getRandomArrayElement(window.data.HOUSE_TYPES),
          rooms: window.pin.getRandomNumberInRange(1, 6),
          guests: window.pin.getRandomNumberInRange(1, 12),
          checkin: window.pin.getRandomArrayElement(window.data.TIMES),
          checkout: window.pin.getRandomArrayElement(window.data.TIMES),
          features: window.pin.getRandomSubArray(window.data.HOUSE_FEATURES),
          description: 'строка с описанием',
          photos: window.pin.getRandomSubArray(window.pin.shuffleArray(window.data.HOUSE_PHOTOS))
        },

        location: {
          x: (x - PIN.width / 2) + 'px',
          y: (y - PIN.height - PIN.pointHeight) + 'px'
        }
      });
    }

    return pins;
  };

  window.data = {
    HOUSE_TYPES: HOUSE_TYPES,
    TIMES: TIMES,
    HOUSE_FEATURES: HOUSE_FEATURES,
    HOUSE_PHOTOS: HOUSE_PHOTOS,
    generateData: generateData
  };
})();
