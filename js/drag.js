'use strict';

(function () {
  var MAP_COORDS = {
    minX: -(window.pin.MAIN_PIN.width / 2),
    maxX: 1200 - (window.pin.MAIN_PIN.width / 2),
    minY: 130 - window.pin.MAIN_PIN.height,
    maxY: 630 - window.pin.MAIN_PIN.height
  };

  var mainPin = document.querySelector('.map__pin--main');

  var mainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  var setMainPinAddress = function (x, y) {
    window.form.addressField.value = x + ', ' + y;
  };

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

      mainPinCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (mainPinCoords.x > MAP_COORDS.maxX) {
        mainPinCoords.x = MAP_COORDS.maxX;
      }

      if (mainPinCoords.x < MAP_COORDS.minX) {
        mainPinCoords.x = MAP_COORDS.minX;
      }

      if (mainPinCoords.y > MAP_COORDS.maxY) {
        mainPinCoords.y = MAP_COORDS.maxY;
      }

      if (mainPinCoords.y < MAP_COORDS.minY) {
        mainPinCoords.y = MAP_COORDS.minY;
      }

      mainPin.style.left = mainPinCoords.x + 'px';
      mainPin.style.top = mainPinCoords.y + 'px';

      setMainPinAddress(mainPinCoords.x + window.pin.MAIN_PIN.width / 2, mainPinCoords.y + window.pin.MAIN_PIN.height);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.drag = {
    mainPinCoords: mainPinCoords,
    setMainPinAddress: setMainPinAddress
  };
})();
