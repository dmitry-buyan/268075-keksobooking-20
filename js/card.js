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

  var removeChildNodes = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var cardElement = cardTemplate.cloneNode(true);

  var renderCard = function () {
    cardElement.classList.add('hidden');
    document.querySelector('.map__filters-container').before(cardElement);

    return cardElement;
  };

  var renderCardData = function (card) {
    var featuresList = cardElement.querySelector('.popup__features');
    var photosList = cardElement.querySelector('.popup__photos');

    removeChildNodes(featuresList);
    removeChildNodes(photosList);

    if (card.author.avatar) {
      cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').classList.add('hidden');
    }

    if (card.offer.title) {
      cardElement.querySelector('.popup__title').textContent = card.offer.title;
    } else {
      cardElement.querySelector('.popup__title').classList.add('hidden');
    }

    if (card.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').classList.add('hidden');
    }

    if (card.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = card.offer.price + TextLines.PRICE;
    } else {
      cardElement.querySelector('.popup__text--price').classList.add('hidden');
    }

    if (card.offer.type) {
      cardElement.querySelector('.popup__type').textContent = homeTypesTranslation[card.offer.type];
    } else {
      cardElement.querySelector('.popup__type').classList.add('hidden');
    }

    if (card.offer.rooms && card.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + TextLines.ROOMS + card.offer.guests + TextLines.GUESTS;
    } else {
      cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
    }

    if (card.offer.checkin && card.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = TextLines.CHECKIN + card.offer.checkin + TextLines.CHECKOUT + card.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').classList.add('hidden');
    }

    if (card.offer.features.length > 0) {
      cardElement.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
      cardElement.querySelector('.popup__features').classList.remove('hidden');
    } else {
      cardElement.querySelector('.popup__features').classList.add('hidden');
    }

    if (card.offer.description) {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    } else {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    }

    if (card.offer.photos.length > 0) {
      cardElement.querySelector('.popup__photos').appendChild(renderCardPhotos(card.offer.photos));
      cardElement.querySelector('.popup__photos').classList.remove('hidden');
    } else {
      cardElement.querySelector('.popup__photos').classList.add('hidden');
    }
  };

  window.card = {
    renderCard: renderCard,
    renderCardData: renderCardData
  };
})();
