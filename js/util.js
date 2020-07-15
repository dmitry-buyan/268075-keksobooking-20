'use strict';

window.util = (function () {
  var ENTER = 'Enter';

  var ESCAPE = 'Escape';

  return {
    ENTER: ENTER,
    ESCAPE: ESCAPE,

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
    }
  };
})();
