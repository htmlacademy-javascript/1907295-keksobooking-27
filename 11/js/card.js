const offerTypeToTitle = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом ',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const renderCard = ({offer, author}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypeToTitle[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  const popupDescriptionElement = cardElement.querySelector('.popup__description');
  if (offer.description) {
    popupDescriptionElement.textContent = offer.description;
  } else {
    popupDescriptionElement.remove();
  }

  if (offer.features && offer.features.length) {
    const popupFeaturesElement = cardElement.querySelector('.popup__features');
    popupFeaturesElement.innerHTML = '';

    offer.features.forEach((item) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${item}`);

      popupFeaturesElement.appendChild(featureElement);
    });
  }

  if (offer.photos && offer.photos.length) {
    const popupPhotosElement = cardElement.querySelector('.popup__photos');
    popupPhotosElement.innerHTML = '';

    offer.photos.forEach((photoPath) => {
      const photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photoPath;

      popupPhotosElement.appendChild(photoElement);
    });
  }

  return cardElement;
};
