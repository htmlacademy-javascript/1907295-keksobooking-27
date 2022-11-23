const GET_OFFERS_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const POST_OFFERS_URL = 'https://27.javascript.pages.academy/keksobooking';

const HttpMethod = {
  POST: 'POST',
  GET: 'GET',
};

const load = async (url, config = { method: HttpMethod.GET}) => {
  const response = await fetch(url, {...config});

  if (!response.ok) {
    throw new Error('Не удалось загрузить объявления');
  }

  return await response.json();
};

export const getOffers = async () => load(GET_OFFERS_URL);

export const postOffer = async (body) => load(POST_OFFERS_URL, {
  method: HttpMethod.POST,
  body,
});
