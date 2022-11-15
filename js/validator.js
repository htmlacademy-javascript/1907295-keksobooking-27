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

const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const checkinElement = adFormElement.querySelector('#timein');
const checkoutElement = adFormElement.querySelector('#timeout');
const submitButton = adFormElement.querySelector('.ad-form__submit');

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
}, true);

//проверяем на валидность (где,как,результат)
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

function onRoomNumberChange() {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
}

function onCapacityChange() {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
}

function onTypeChange() {
  const minPrice = typesToPrices[typeElement.value];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  pristine.validate(priceElement);
}

function onPriceChange() {
  pristine.validate(priceElement);
}

//функции, которые возвращает нам информацию об ошибке
function validateCapacity() {
  return roomsToGuests[roomNumberElement.value].includes(capacityElement.value);
}

function getCapacityErrorMessage() {
  return `Количество комнат вмещает ${roomsToGuests[roomNumberElement.value].join(' или ')} гостей.`;
}

function getRoomNumberErrorMessage() {
  return `Для выбранного количества гостей требуется ${guestsToRooms[capacityElement.value].join(' или ')} комнаты`;
}

function validatePrice(value) {
  return value >= typesToPrices[typeElement.value] && value <= typesToPrices.max;
}

function getPriceErrorMessage() {
  return `Минимальная стоимость для выбранного типа жилья ${typesToPrices[typeElement.value]} руб.`;
}

//синхронизированные поля
function onСheckinChange() {
  checkinElement.value = checkoutElement.value;
}

function onСheckoutChange() {
  checkoutElement.value = checkinElement.value;
}

roomNumberElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onCapacityChange);
typeElement.addEventListener('change', onTypeChange);
priceElement.addEventListener('change', onPriceChange);
checkinElement.addEventListener('change', onСheckoutChange);
checkoutElement.addEventListener('change', onСheckinChange);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  submitButton.disabled = !isValid;
});
