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

export function getCardElement(advert) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypeToTitle[advert.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

  const popupFeaturesElement = cardElement.querySelector('.popup__features');
  popupFeaturesElement.innerHTML = '';

  advert.offer.features.forEach((item) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${item}`);

    popupFeaturesElement.appendChild(featureElement);
  });

  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  popupPhotosElement.innerHTML = '';

  advert.offer.photos.forEach((photo) => {
    const photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = photo;

    popupPhotosElement.appendChild(photoElement);
  });

  return cardElement;
}
