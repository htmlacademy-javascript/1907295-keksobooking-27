import {createOffers} from './data.js';
import {getCardElement} from './card.js';
import {getRandomArrayElement} from './util.js';

const DEFAULT_OFFERS_COUNT = 10;

const offers = createOffers(DEFAULT_OFFERS_COUNT);
const cardElement = getCardElement(getRandomArrayElement(offers));
const mapElement = document.querySelector('.map__canvas');

mapElement.appendChild(cardElement);
