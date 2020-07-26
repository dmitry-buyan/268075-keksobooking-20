'use strict';

(function () {
  var userCard = window.card.render();
  var cardClose = userCard.querySelector('.popup__close');

  var onPopupEscPress = function (evt) {
    window.util.isEscape(evt, closePopup);
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

  var renderMessage = function (typeMessage) {
    var messageTemplate = document.querySelector('#' + typeMessage).content.querySelector('.' + typeMessage);
    var message = messageTemplate.cloneNode(true);
    var errorButton = message.querySelector('.error__button');
    document.querySelector('main').appendChild(message);

    var onPageEscPress = function (evt) {
      window.util.isEscape(evt, closeMessage);
    };

    var onPageClick = function (evt) {
      window.util.isClick(evt, closeMessage);
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
    open: openPopup,
    close: closePopup,
    showMessage: renderMessage
  };
})();
