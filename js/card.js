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
  var map = document.querySelector('.map');
  var pinsList = map.querySelector('.map__pins');
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

  var removeFeatures = function () {
    cardTemplate.querySelector('.popup__features').remove();
  };

  var renderFeatures = function (arr) {
    var fragment = document.createDocumentFragment();
    var list = document.createElement('ul');

    arr.forEach(function (it) {
      var feature = document.createElement('li');
      feature.classList.add(FEATURE_CLASS_NAME, FEATURE_CLASS_NAME + '--' + it);
      list.appendChild(feature);
      fragment.appendChild(list);
    });

    return fragment;
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + TextLines.PRICE;
    cardElement.querySelector('.popup__type').textContent = homeTypesTranslation[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + TextLines.ROOMS + card.offer.guests + TextLines.GUESTS;
    cardElement.querySelector('.popup__text--time').textContent = TextLines.CHECKIN + card.offer.checkin + TextLines.CHECKOUT + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardTemplate.style.left = card.location.x + 'px';
    cardTemplate.style.top = card.location.y + 'px';

    cardElement.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
    cardElement.querySelector('.popup__photos').appendChild(renderCardPhotos(card.offer.photos));

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

  removeFeatures();
})();
