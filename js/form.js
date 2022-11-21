import {
  showSuccess,
  showError
} from './message.js';

import { TRUNCATE_COORDINATE } from './const.js';
import { pristine } from './validator.js';
import { postOffer } from './api.js';
import { resetPreview } from './preview.js';
import { resetFilter } from './filter.js';
import { resetSlider } from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const addressElement = document.querySelector('#address');
const submitButton = adFormElement.querySelector('.ad-form__submit');
const resetButton = adFormElement.querySelector('.ad-form__reset');

// Очистить форму
function resetForm () {
  adFormElement.reset();
  resetPreview();
  resetFilter();
  resetSlider();
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

// Активация формы
function turnFormOff(forms, active) {
  forms.forEach(({element, classDisabled}) => {

    if (!active) {
      element.classList.add(classDisabled);
    } else {
      element.classList.remove(classDisabled);
    }

    Array.from(element.children)
      .forEach((item) => {
        item.disabled = !active;
      });
  });
}

export function setActiveAdForm(active) {
  turnFormOff([
    {
      element: document.querySelector('.ad-form'),
      classDisabled: 'ad-form--disabled'
    },
    {
      element: document.querySelector('.map__filters'),
      classDisabled: 'map__filters--disabled',
    },
  ], active);
}

// Получение координат
export function setAddressValue({lat, lng}) {
  addressElement.value = `${lat.toFixed(TRUNCATE_COORDINATE)}, ${lng.toFixed(TRUNCATE_COORDINATE)}`;
  // addressElement.disabled = true;
}

// Отправка данных на сервер
function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

adFormElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  const formData = new FormData(evt.target);
  blockSubmitButton();

  try {
    await postOffer(formData);
    showSuccess();
  } catch (error) {
    showError(error.message);
  }

  unblockSubmitButton();
});
