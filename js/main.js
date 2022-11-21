import { START_COORDINATES } from './const.js';
import { showAlert } from './util.js';
import { getOffers } from './api.js';
import { initFilters } from './filter.js';

import {
  initMap,
  renderMarkers
} from './map.js';

import {
  setActiveAdForm,
  setAddressValue
} from './form.js';

import './validator.js';
import './slider.js';
import './message.js';
import './preview.js';

const mapElement = document.querySelector('.map__canvas');

const {map} = initMap(
  mapElement,
  START_COORDINATES,
  () => {
    setActiveAdForm(true);
    setAddressValue(START_COORDINATES);
  },
  ({target}) => setAddressValue(target.getLatLng())
);

async function bootstrap() {
  try {
    const offers = await getOffers();
    initFilters(offers, (reducedOffers) => renderMarkers(map, reducedOffers));
  } catch (error) {
    showAlert(error);
  }
}

bootstrap();
