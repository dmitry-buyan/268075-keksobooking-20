'use strict';

(function () {
  var userCard = window.card.renderCard();
  var cardClose = userCard.querySelector('.popup__close');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userCard.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userCard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  cardClose.addEventListener('click', function () {
    closePopup();
  });

  window.popup = {
    openPopup: openPopup
  };
})();
