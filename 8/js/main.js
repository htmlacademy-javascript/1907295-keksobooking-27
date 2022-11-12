import {createOffers} from './data.js';
import {renderCard} from './card.js';
import {getRandomArrayElement} from './util.js';
import './form.js';
import './validator.js';

const DEFAULT_OFFERS_COUNT = 10;

const offers = createOffers(DEFAULT_OFFERS_COUNT);
const cardElement = renderCard(getRandomArrayElement(offers));
const mapElement = document.querySelector('.map__canvas');

mapElement.appendChild(cardElement);
