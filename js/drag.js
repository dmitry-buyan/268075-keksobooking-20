'use strict';

(function () {
  var MAP_COORDS = {
    minX: -(window.pin.MAIN_PIN.width / 2),
    maxX: 1200 - (window.pin.MAIN_PIN.width / 2),
    minY: 130 - window.pin.MAIN_PIN.height,
    maxY: 630 - window.pin.MAIN_PIN.height
  };

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pin.mainPinCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (window.pin.mainPinCoords.x > MAP_COORDS.maxX) {
        window.pin.mainPinCoords.x = MAP_COORDS.maxX;
      }

      if (window.pin.mainPinCoords.x < MAP_COORDS.minX) {
        window.pin.mainPinCoords.x = MAP_COORDS.minX;
      }

      if (window.pin.mainPinCoords.y > MAP_COORDS.maxY) {
        window.pin.mainPinCoords.y = MAP_COORDS.maxY;
      }

      if (window.pin.mainPinCoords.y < MAP_COORDS.minY) {
        window.pin.mainPinCoords.y = MAP_COORDS.minY;
      }

      mainPin.style.left = window.pin.mainPinCoords.x + 'px';
      mainPin.style.top = window.pin.mainPinCoords.y + 'px';

      window.map.setMainPinAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
