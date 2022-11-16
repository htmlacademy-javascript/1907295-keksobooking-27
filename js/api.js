const GET_OFFERS_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const POST_OFFERS_URL = 'https://27.javascript.pages.academy/keksobooking';

// Для описания взаимодействия с сервером
async function load(url, config = { method: 'GET'}) {
  const response = await fetch(url, {...config});

  if (!response.ok) {
    throw new Error('Не удалось загрузить объявления');
  }

  return await response.json();
}

// Для прикладной задачи (загрузка объявлений)
export async function getOffers() {
  return load(GET_OFFERS_URL);
}

// Для прикладной задачи (отправка формы объявления)
export async function postOffer(body) {
  return load(POST_OFFERS_URL, {
    method: 'POST',
    body,
  });
}
