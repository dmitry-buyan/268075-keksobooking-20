'use strict';

(function () {
  var TextLines = {
    PRICE: '₽/ночь',
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

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + TextLines.PRICE;
    cardElement.querySelector('.popup__type').textContent = valueToAnotherValue[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + TextLines.ROOMS + card.offer.guests + TextLines.GUESTS;
    cardElement.querySelector('.popup__text--time').textContent = TextLines.CHECKIN + card.offer.checkin + TextLines.CHECKOUT + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photo').src = card.offer.photos[0];
    cardTemplate.style.left = card.location.x + 'px';
    cardTemplate.style.top = card.location.y + 'px';

    var featuresList = cardTemplate.querySelectorAll('.popup__feature');

    card.offer.features.forEach(function (it) {
      featuresList.forEach(function (item) {
        if (item.classList.contains('popup__feature--' + it)) {
          item.textContent = it;
        } else {
          item.classList.add('hidden');
        }
      });
    });

    var fragment = document.createDocumentFragment();

    for (var i = 1; i < card.offer.photos.length; i++) {
      var node = cardElement.querySelector('.popup__photo').cloneNode(true);
      node.src = card.offer.photos[i];

      fragment.appendChild(node);
    }

    cardElement.querySelector('.popup__photos').appendChild(fragment);

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
