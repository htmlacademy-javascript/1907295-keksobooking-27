import './slider.js';
import './message.js';
import './preview.js';

import { START_COORDINATES } from './const.js';
import { showAlert } from './util.js';
import { getOffers } from './api.js';
import { initFilters, setActiveFilterForm } from './filter.js';

import { initMap, renderMarkers } from './map.js';
import { initOfferFormValidator, validateForm } from './validator.js';

import {
  setActiveAdForm,
  setAddressValue,
  initForm
} from './form.js';

const bootstrap = async() => {
  const mapElement = document.querySelector('.map__canvas');
  setActiveFilterForm(false);
  setActiveAdForm(false);

  initOfferFormValidator();

  const {map, mainPinMarker} = initMap(
    mapElement,
    START_COORDINATES,
    () => {
      setActiveAdForm(true);
      setAddressValue(START_COORDINATES);
    },
    ({target}) => setAddressValue(target.getLatLng())
  );

  try {
    const offers = await getOffers();
    initForm(() => {
      mainPinMarker.setLatLng(START_COORDINATES);
      setAddressValue(START_COORDINATES);
    }, validateForm);

    setActiveFilterForm(true);
    initFilters(offers, (reducedOffers) => renderMarkers(map, reducedOffers));
  } catch (error) {
    showAlert(error);
  }
};

bootstrap();
