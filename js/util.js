'use strict';

window.util = (function () {
  var ENTER = 'Enter';

  var ESCAPE = 'Escape';

  var CLICK = 'click';

  return {
    ENTER: ENTER,
    ESCAPE: ESCAPE,
    CLICK: CLICK,

    isEnterEvent: function (evt, action) {
      if (evt.key === this.ENTER) {
        evt.preventDefault();
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.key === this.ESCAPE) {
        evt.preventDefault();
        action();
      }
    },

    isClickEvent: function (evt, action) {
      if (evt.type === this.CLICK) {
        evt.preventDefault();
        action();
      }
    }
  };
})();
