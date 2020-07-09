'use strict';

(function () {
  var PHOTO = {
    width: '45',
    height: '40',
    altText: 'Фотография жилья',
    className: 'popup__photo'
  };

  var FEATURE_CLASS_NAME = 'popup__feature';

  var TextLines = {
    PRICE: '₽/ночь',
    ROOMS: ' комнаты для ',
    GUESTS: ' гостей',
    CHECKIN: 'Заезд после ',
    CHECKOUT: ', выезд до '
  };

  var homeTypesTranslation = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photosContainer = cardTemplate.querySelector('.popup__photos');
  photosContainer.querySelector('.popup__photo').remove();

  var renderCardPhotos = function (arr) {
    var fragment = document.createDocumentFragment();

    arr.forEach(function (it) {
      var node = document.createElement('img');
      node.src = it;
      node.classList.add(PHOTO.className);
      node.style.width = PHOTO.width + 'px';
      node.style.height = PHOTO.height + 'px';
      node.alt = PHOTO.altText;
      photosContainer.appendChild(node);

      fragment.appendChild(node);
    });

    return fragment;
  };

  var renderFeatures = function (arr) {
    var fragment = document.createDocumentFragment();

    arr.forEach(function (it) {
      var feature = document.createElement('li');
      feature.textContent = it;
      feature.classList.add(FEATURE_CLASS_NAME, FEATURE_CLASS_NAME + '--' + it);
      fragment.appendChild(feature);
    });

    return fragment;
  };

  var renderData = function (arr, node, cb) {
    if (arr && arr.length > 0) {
      node.appendChild(cb(arr));
    } else {
      node.remove();
    }
  };

  var removeChildNodes = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var checkUserAvatar = function (data, node) {
    return data ? (node.src = data) : node.remove();
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.classList.add('hidden');
    var featuresList = cardElement.querySelector('.popup__features');

    removeChildNodes(featuresList);
    checkUserAvatar(card.author.avatar, cardElement.querySelector('.popup__avatar'));

    if (card.offer.title) {
      cardElement.querySelector('.popup__title').textContent = card.offer.title;
    } else {
      cardElement.querySelector('.popup__title').remove();
    }

    if (card.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').remove();
    }

    if (card.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = card.offer.price + TextLines.PRICE;
    } else {
      cardElement.querySelector('.popup__text--price').remove();
    }

    if (card.offer.type) {
      cardElement.querySelector('.popup__type').textContent = homeTypesTranslation[card.offer.type];
    } else {
      cardElement.querySelector('.popup__type').remove();
    }

    if (card.offer.rooms && card.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + TextLines.ROOMS + card.offer.guests + TextLines.GUESTS;
    } else {
      cardElement.querySelector('.popup__text--capacity').remove();
    }

    if (card.offer.checkin && card.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = TextLines.CHECKIN + card.offer.checkin + TextLines.CHECKOUT + card.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').remove();
    }

    if (card.offer.description) {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    } else {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    }

    renderData(card.offer.features, cardElement.querySelector('.popup__features'), renderFeatures);
    renderData(card.offer.photos, cardElement.querySelector('.popup__photos'), renderCardPhotos);

    document.querySelector('.map__filters-container').before(cardElement);

    // return cardElement;
  };


  var renderCards = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.pin.MAX_PINS_COUNT; i++) {
      fragment.appendChild(renderCard(cards[0]));
    }

    document.querySelector('.map__filters-container').before(renderCard(cards[i]));
  };

  window.card = {
    renderCard: renderCard,
    renderCards: renderCards
  };
})();
