const HttpMethod = {
  POST: 'POST',
  GET: 'GET',
};

const GET_OFFERS_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const POST_OFFERS_URL = 'https://27.javascript.pages.academy/keksobooking';

// Для описания взаимодействия с сервером
const load = async (url, config = { method: HttpMethod.GET}) => {
  const response = await fetch(url, {...config});

  if (!response.ok) {
    throw new Error('Не удалось загрузить объявления');
  }

  return await response.json();
};

// Для прикладной задачи (загрузка объявлений)
export const getOffers = async () => load(GET_OFFERS_URL);

// Для прикладной задачи (отправка формы объявления)
export const postOffer = async(body) => load(POST_OFFERS_URL, {
  method: HttpMethod.POST,
  body,
});
