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
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
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

    var userAvatar = cardElement.querySelector('.popup__avatar');
    if (card.author.avatar) {
      userAvatar.src = card.author.avatar;
    } else {
      userAvatar.classList.add('hidden');
    }

    var offerTitle = cardElement.querySelector('.popup__title');
    if (card.offer.title) {
      offerTitle.textContent = card.offer.title;
    } else {
      offerTitle.classList.add('hidden');
    }

    var offerAddress = cardElement.querySelector('.popup__text--address');
    if (card.offer.address) {
      offerAddress.textContent = card.offer.address;
    } else {
      offerAddress.classList.add('hidden');
    }

    var offerPrice = cardElement.querySelector('.popup__text--price');
    if (card.offer.price) {
      offerPrice.textContent = card.offer.price + TextLines.PRICE;
    } else {
      offerPrice.classList.add('hidden');
    }

    var homeType = cardElement.querySelector('.popup__type');
    if (card.offer.type) {
      homeType.textContent = homeTypesTranslation[card.offer.type];
    } else {
      homeType.classList.add('hidden');
    }

    var offerCapacity = cardElement.querySelector('.popup__text--capacity');
    if (card.offer.rooms && card.offer.guests) {
      offerCapacity.textContent = card.offer.rooms + TextLines.ROOMS + card.offer.guests + TextLines.GUESTS;
    } else {
      offerCapacity.classList.add('hidden');
    }

    var offerTime = cardElement.querySelector('.popup__text--time');
    if (card.offer.checkin && card.offer.checkout) {
      offerTime.textContent = TextLines.CHECKIN + card.offer.checkin + TextLines.CHECKOUT + card.offer.checkout;
    } else {
      offerTime.classList.add('hidden');
    }

    var offerFeature = cardElement.querySelector('.popup__features');
    if (card.offer.features.length) {
      offerFeature.appendChild(renderFeatures(card.offer.features));
      offerFeature.classList.remove('hidden');
    } else {
      offerFeature.classList.add('hidden');
    }

    var offerDescription = cardElement.querySelector('.popup__description');
    if (card.offer.description) {
      offerDescription.textContent = card.offer.description;
    } else {
      offerDescription.textContent = card.offer.description;
    }

    if (card.offer.photos.length) {
      photosList.appendChild(renderCardPhotos(card.offer.photos));
      photosList.classList.remove('hidden');
    } else {
      photosList.classList.add('hidden');
    }
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    card.classList.add('hidden');
  };

  window.card = {
    render: renderCard,
    renderData: renderCardData,
    close: closeCard
  };
})();
