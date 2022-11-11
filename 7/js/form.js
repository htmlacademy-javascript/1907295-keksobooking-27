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
