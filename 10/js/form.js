import {TRUNCATE_COORDINATE} from './const.js';
import {pristine} from './validator.js';
import {postOffer} from './api.js';
import {showSuccess,showError} from './message.js';

const adFormElement = document.querySelector('.ad-form');
const submitButton = adFormElement.querySelector('.ad-form__submit');

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
export function getAddress(addressElement, {lat, lng}) {
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
