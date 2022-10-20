function getRandomNumber (min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  } else if (max <= min) {
    return NaN;
  }
  return Math.random() * (max - min + 1);//Максимум и минимум включаются
}

// Получение случайного целого числа в заданном интервале, включительно
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(getRandomNumber(min, max));
}

getRandomInteger(0, 5);

// Получение случайного числа с плавающей точкой из переданного диапазона включительно
function getRandomFloat(min, max, signCount) {
  return Number(getRandomNumber(min, max).toFixed(signCount));
}

getRandomFloat(1.1, 1.2, 1);

// Получение случайного целого числа из переданного диапазона включительно
function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Получение случайного числа с плавающей точкой из переданного диапазона включительно
function getRandomPositiveFloat (a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

// Данные
const TITLES = [
  'Новостройка',
  'Вторичная',
  'Элитное',
  'Апартаменты',
  'Загородная',
  'Аренда'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Небольшие квартиры для молодежи с возможностью зонировать помещение',
  'Компактные квартиры евроформата с различными функциональными пространствами',
  'Квартиры с большой кухней-гостиной и двумя санузлами',
  'Квартиры с отделкой Nord Line в двух цветовых вариантах – White и Silver',
  'Тихие закрытые внутренние дворы выполнены в пейзажном стиле',
  'Красота и функциональность – главные архитектурные принципы проекта'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_START = 35.65000;
const LAT_END = 35.70000;
const LNG_START = 139.70000;
const LNG_END = 139.80000;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;

const DEFAULT_OFFERS_COUNT = 10;

// Описание автора
function getAvatarPath(id) {
  return `img/avatars/user${id.toString().padStart(2, '0')}.png`;
}

// Информация об объявлении
function makeOffer(id) {
  const lat = getRandomPositiveFloat(LAT_START, LAT_END, 4);
  const lng = getRandomPositiveFloat(LNG_START, LNG_END, 4);

  return {
    author: {
      avatar: getAvatarPath(id)
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 100),
      guests: getRandomPositiveInteger(0, 3),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: FEATURES.slice(getRandomPositiveInteger(0, FEATURES.length - 1)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: PHOTOS.slice(getRandomPositiveInteger(0, PHOTOS.length - 1)),
    },
    location: {
      lat,
      lng
    }
  };
}

// Создание объявления
function createOffers(count) {
  const offers = [];

  for (let i = 1; i <= count; i++) {
    offers.push(makeOffer(i));
  }

  return offers;
}

createOffers(DEFAULT_OFFERS_COUNT);
