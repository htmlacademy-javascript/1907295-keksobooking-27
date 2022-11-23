import { isEscapeKey } from './util.js';

const mainElement = document.querySelector('main');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onOverlayClick = () => {
  closeMessage();
};

// Сообщение об успешной отправке
export const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOverlayClick);
  mainElement.append(successElement);
};

// Сообщение об ошибке
export const showError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.addEventListener('keydown', onEscKeydown);
  errorElement.querySelector('.error__button').addEventListener('click', onOverlayClick);
  mainElement.append(errorElement);
};

const closeMessage = () => {
  const messageElement =
    document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOverlayClick);
};
