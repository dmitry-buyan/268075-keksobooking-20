'use strict';

(function () {
  var ENTER = 'Enter';
  var ESCAPE = 'Escape';
  var CLICK = 'click';

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER) {
      evt.preventDefault();
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      action();
    }
  };

  var isClickEvent = function (evt, action) {
    if (evt.type === CLICK) {
      evt.preventDefault();
      action();
    }
  };

  window.util = {
    isEnter: isEnterEvent,
    isEscape: isEscEvent,
    isClick: isClickEvent
  };
})();
