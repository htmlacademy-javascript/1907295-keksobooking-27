// Получение случайного целого числа из переданного диапазона включительно
export function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Получение случайного числа с плавающей точкой из переданного диапазона включительно
export function getRandomPositiveFloat (a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

export function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}
