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

  var showMessage = function (typeMessage) {
    var messageTemplate = document.querySelector('#' + typeMessage).content.querySelector('.' + typeMessage);
    var message = messageTemplate.cloneNode(true);
    var errorButton = message.querySelector('.error__button');
    document.querySelector('main').appendChild(message);

    var onPageEscPress = function (evt) {
      window.util.isEscEvent(evt, closeMessage);
    };

    var onPageClick = function (evt) {
      window.util.isClickEvent(evt, closeMessage);
    };

    var closeMessage = function () {
      document.querySelector('main').removeChild(message);
      document.removeEventListener('keydown', onPageEscPress);
      document.removeEventListener('click', onPageClick);
    };

    document.addEventListener('keydown', onPageEscPress);
    document.addEventListener('click', onPageClick);

    if (errorButton) {
      errorButton.addEventListener('click', onPageClick);
    }
  };

  window.popup = {
    openPopup: openPopup,
    closePopup: closePopup,
    showMessage: showMessage
  };
})();
