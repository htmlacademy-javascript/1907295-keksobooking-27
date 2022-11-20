import { DEFAULT_OFFERS_COUNT } from './const.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.map__filters');
const typeFilter = filterElement.querySelector('#housing-type');
const priceFilter = filterElement.querySelector('#housing-price');
const roomsFilter = filterElement.querySelector('#housing-rooms');
const guestsFilter = filterElement.querySelector('#housing-guests');
const featuresFilter = filterElement.querySelectorAll('.map__checkbox');

const PriceType = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const PriceValue = {
  MIDDLE: 10000,
  HIGH: 50000
};

function filterByType ({offer}, selectedType) {
  return selectedType === 'any' || offer.type === selectedType;
}

function filterByPrice ({offer}, selectedPrice) {
  switch (selectedPrice) {
    case PriceType.ANY:
      return true;
    case PriceType.LOW:
      return offer.price < PriceValue.MIDDLE;
    case PriceType.MIDDLE:
      return offer.price < PriceValue.HIGH && offer.price >= PriceValue.MIDDLE;
    case PriceType.HIGH:
      return offer.price >= PriceValue.HIGH;
    default:
      throw new Error('Unknown selected price value');
  }
}

function filterByRooms({offer}, selectedRoom) {
  return selectedRoom === 'any' || offer.rooms === parseInt(selectedRoom, 10);
}

function filterByGuests({offer}, selectedGuests) {
  return selectedGuests === 'any' || offer.guests === parseInt(selectedGuests, 10);
}

function filterByFeatures({offer}, selectedFeatures) {
  if (selectedFeatures.length === 0) {
    return true;
  }

  if (!offer.features) {
    return false;
  }

  return selectedFeatures.every(
    (featureItem) => offer.features.includes(featureItem)
  );
}

function setFilters(offers) {
  const selectedType = typeFilter.value;
  const selectedPrice = priceFilter.value;
  const selectedRoom = roomsFilter.value;
  const selectedGuests = guestsFilter.value;
  const reducedOffers = [];

  const selectedFeatures = Array
    .from(featuresFilter)
    .filter((featureItem) => featureItem.checked === true)
    .map((featureItem) => featureItem.value);

  for (const item of offers) {
    if (reducedOffers.length >= DEFAULT_OFFERS_COUNT) {
      break;
    }

    if (
      filterByType(item, selectedType) &&
      filterByPrice(item, selectedPrice) &&
      filterByRooms(item, selectedRoom) &&
      filterByGuests(item, selectedGuests) &&
      filterByFeatures(item, selectedFeatures)
    ) {
      reducedOffers.push(item);
    }
  }

  return reducedOffers;
}

export function initFilters(initialOffers, cb) {
  cb(setFilters(initialOffers));
  filterElement.addEventListener('change', debounce(() => cb(setFilters(initialOffers))));
}
