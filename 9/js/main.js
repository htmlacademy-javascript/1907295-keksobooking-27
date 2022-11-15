import {
  START_COORDINATES,
  DEFAULT_OFFERS_COUNT
} from './const.js';

import {
  initMap,
  createMarker
} from './map.js';

import {createOffers} from './data.js';

import './slider.js';

const mapElement = document.querySelector('.map__canvas');
const addressElement = document.querySelector('#address');

const offers = createOffers(DEFAULT_OFFERS_COUNT);
const leafletMap = initMap(mapElement, addressElement, START_COORDINATES);

createMarker(offers, leafletMap);
