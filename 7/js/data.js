import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement} from './util.js';

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
export function createOffers(count) {
  const offers = [];

  for (let i = 1; i <= count; i++) {
    offers.push(makeOffer(i));
  }

  return offers;
}
