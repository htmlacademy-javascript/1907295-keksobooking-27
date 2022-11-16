import {
  START_COORDINATES,
  DEFAULT_OFFERS_COUNT
} from './const.js';

import {
  initMap,
  createMarker
} from './map.js';

import {showAlert} from './util.js';
import {getOffers} from './api.js';

import './form.js';
import './validator.js';
import './slider.js';
import './message.js';

const mapElement = document.querySelector('.map__canvas');
const addressElement = document.querySelector('#address');
const leafletMap = initMap(mapElement, addressElement, START_COORDINATES);

async function bootstrap() {
  try {
    const offers = await getOffers();
    createMarker(offers.slice(0, DEFAULT_OFFERS_COUNT), leafletMap);
  } catch (error) {
    showAlert(error);
  }
}

bootstrap();
