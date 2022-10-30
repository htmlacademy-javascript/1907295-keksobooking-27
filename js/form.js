export function setActiveAdForm(active) {
  const adFormElement = document.querySelector('.ad-form');
  const mapFormElement = document.querySelector('.map__filters');

  adFormElement.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = !active;
  });

  mapFormElement.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = !active;
  });

  mapFormElement.querySelectorAll('select').forEach((item) => {
    item.disabled = !active;
  });

  if (!active) {
    adFormElement.classList.add('ad-form--disabled');
    mapFormElement.classList.add('map__filters--disabled');
  } else {
    adFormElement.classList.remove('ad-from--disabled');
    mapFormElement.classList.remove('map__filters--disabled');
  }
}
