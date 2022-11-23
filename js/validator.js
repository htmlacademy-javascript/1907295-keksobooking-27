const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const guestsToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3']
};

export const typesToPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  max: 100000,
};

let pristine = null;

const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const checkinElement = adFormElement.querySelector('#timein');
const checkoutElement = adFormElement.querySelector('#timeout');

const getCapacityErrorMessage = () =>
  `Количество комнат вмещает ${roomsToGuests[roomNumberElement.value]
    .join(' или ')} гостей.`;

const getRoomNumberErrorMessage = () =>
  `Для выбранного количества гостей требуется ${guestsToRooms[capacityElement.value]
    .join(' или ')} комнаты`;

const validateCapacity = () =>
  roomsToGuests[roomNumberElement.value]
    .includes(capacityElement.value);

const validatePrice = (value) =>
  value >= typesToPrices[typeElement.value] && value <= typesToPrices.max;

const getPriceErrorMessage = () =>
  `Минимальная стоимость для выбранного типа жилья ${typesToPrices[typeElement.value]} руб.`;


const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const onCapacityChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const onTypeChange = () => {
  const minPrice = typesToPrices[typeElement.value];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  pristine.validate(priceElement);
};

const onPriceChange = () => {
  pristine.validate(priceElement);
};

const onСheckinChange = () => {
  checkinElement.value = checkoutElement.value;
};

const onСheckoutChange = () => {
  checkoutElement.value = checkinElement.value;
};

export const initOfferFormValidator = () => {
  roomNumberElement.addEventListener('change', onRoomNumberChange);
  capacityElement.addEventListener('change', onCapacityChange);
  typeElement.addEventListener('change', onTypeChange);
  priceElement.addEventListener('change', onPriceChange);
  checkinElement.addEventListener('change', onСheckoutChange);
  checkoutElement.addEventListener('change', onСheckinChange);

  pristine = new Pristine(adFormElement, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  }, true);

  pristine.addValidator(
    capacityElement,
    validateCapacity,
    getCapacityErrorMessage,
  );

  pristine.addValidator(
    roomNumberElement,
    validateCapacity,
    getRoomNumberErrorMessage,
  );

  pristine.addValidator(
    priceElement,
    validatePrice,
    getPriceErrorMessage,
  );
};

export const validateForm = () => pristine.validate();
