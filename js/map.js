import { renderCard } from './card.js';
import { ZOOM } from './const.js';

const DEFAULT_PIN_PATH = './img/pin.svg';
const DEFAULT_PIN_ICON_SIZE = [40, 40];
const DEFAULT_PIN_ANCHOR_SIZE = [20, 40];

const MAIN_PIN_PATH = './img/main-pin.svg';
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ANCHOR_SIZE = [26, 52];

const TILE_LAYER_LINK = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const IconType = {
  MAIN: 'main',
  DEFAULT: 'default'
};

function createPinIcon(iconType) {
  switch (iconType) {
    case (IconType.DEFAULT):
      return L.icon({
        iconUrl: DEFAULT_PIN_PATH,
        iconSize: DEFAULT_PIN_ICON_SIZE,
        iconAnchor: DEFAULT_PIN_ANCHOR_SIZE,
      });
    case (IconType.MAIN):
      return L.icon({
        iconUrl: MAIN_PIN_PATH,
        iconSize: MAIN_PIN_ICON_SIZE,
        iconAnchor: MAIN_PIN_ANCHOR_SIZE,
      });
    default:
      throw new Error('Unknown pin icon type');
  }
}

function createMarker(location, iconType, isDraggable = false) {
  const {lat, lng} = location;
  return L.marker(
    {lat, lng},
    {
      icon: createPinIcon(iconType),
      draggable: isDraggable
    },
  );
}

function removeMarkers(map) {
  map.eachLayer((layer) => {
    const {options} = layer;
    const {icon} = options;
    if (icon && icon.options.iconUrl === DEFAULT_PIN_PATH) {
      layer.remove();
    }
  });
}

export function renderMarkers(map, offers) {
  removeMarkers(map);
  offers.forEach((offer) => {
    const cardElement = renderCard(offer);
    createMarker(offer.location, IconType.DEFAULT)
      .addTo(map)
      .bindPopup(cardElement);
  });
}

export function initMap(mapElement, coordinates, onLoadMap, onPinMoveEnd) {
  const map = L.map(mapElement)
    .on('load', onLoadMap)
    .setView(coordinates, ZOOM);

  L.tileLayer(TILE_LAYER_LINK, { attribution: TILE_LAYER_ATTRIBUTION })
    .addTo(map);

  const mainMarkerGroup = L
    .layerGroup()
    .addTo(map);

  const mainPinMarker = createMarker(coordinates, IconType.MAIN, true);
  mainPinMarker.addTo(mainMarkerGroup);
  mainMarkerGroup.on('moveend', onPinMoveEnd);

  return {
    map,
    mainPinMarker,
  };
}

