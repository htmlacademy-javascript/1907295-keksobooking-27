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

const SubmitButtonState = {
  SAVING: 'Сохраняю…',
  DEFAULT: 'Опубликовать',
};

const adFormElement = document.querySelector('.ad-form');
const addressElement = document.querySelector('#address');
const submitButton = adFormElement.querySelector('.ad-form__submit');
const resetButton = adFormElement.querySelector('.ad-form__reset');

// Активация формы
const turnFormOff = (forms, active) => {
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
};

export const setActiveAdForm = (active) => {
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
};

// Получение координат
export const setAddressValue = ({lat, lng}) => {
  addressElement.value = `${lat.toFixed(TRUNCATE_COORDINATE)}, ${lng.toFixed(TRUNCATE_COORDINATE)}`;
};

// Отправка данных на сервер
const setDisabledSubmitButton = (value) => {
  submitButton.disabled = value;
  submitButton.text = value ? SubmitButtonState.SAVING : SubmitButtonState.DEFAULT;
};

// reset-форма
const resetForm = () => {
  adFormElement.reset();
  resetPreview();
  resetFilter();
  resetSlider();
};

export const initForm = (clearMap) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    clearMap();
  });

  adFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (!isValid) {
      return;
    }

    const formData = new FormData(evt.target);
    setDisabledSubmitButton();

    try {
      await postOffer(formData);
      showSuccess();
    } catch (error) {
      showError(error.message);
    }

    resetForm();
    clearMap();
    setDisabledSubmitButton();
  });
};
