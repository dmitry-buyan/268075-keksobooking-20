'use strict';

(function () {
  var PRICE_TEXT = '₽/ночь';

  var TextLines = {
    ROOMS: ' комнаты для ',
    GUESTS: ' гостей',
    CHECKIN: 'Заезд после ',
    CHECKOUT: ', выезд до '
  };

  var valueToAnotherValue = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var pinsList = map.querySelector('.map__pins');

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + PRICE_TEXT;
    cardElement.querySelector('.popup__type').textContent = valueToAnotherValue[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + TextLines.ROOMS + card.offer.guests + TextLines.GUESTS;
    cardElement.querySelector('.popup__text--time').textContent = TextLines.CHECKIN + card.offer.checkin + TextLines.CHECKOUT + card.offer.checkout;
    // cardElement.querySelectorAll('.popup__feature').textContent = card.offer.features;

    return cardElement;
  };

  var onSuccess = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.pin.MAX_PINS_COUNT; i++) {
      fragment.appendChild(renderCard(cards[i]));
    }

    pinsList.appendChild(fragment);
  };

  window.load(onSuccess);

  window.card = {
    onSuccess: onSuccess
  };
})();
