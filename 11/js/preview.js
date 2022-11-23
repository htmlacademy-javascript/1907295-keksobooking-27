const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooseElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoChooseElement = document.querySelector('#images');
const photoPreviewElement = document.querySelector('.ad-form__photo');
const photoPreview = document.createElement('img');

photoPreviewElement.appendChild(photoPreview);

avatarChooseElement.addEventListener('change', () => {
  const [file] = avatarChooseElement.files;
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

photoChooseElement.addEventListener('change', () => {
  const [file] = photoChooseElement.files;
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.style.width = '70px';
    photoPreview.style.height = '70px';
  }
});

export function resetPreview () {
  avatarChooseElement.value = '';
  photoChooseElement.value = '';
  avatarPreviewElement.src = DEFAULT_AVATAR;
  photoPreviewElement.innerHTML = '';
}
