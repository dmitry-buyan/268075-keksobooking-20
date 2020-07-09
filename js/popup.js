'use strict';

(function () {
  var userCard = window.card.renderCard();
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userSetup.querySelector('.setup-close');
  var userName = userSetup.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (document.activeElement === userName) {
      window.util.isEscEvent(evt, openPopup);
    } else {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    userCard.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  window.popup = {
    openPopup: openPopup
  };
})();
