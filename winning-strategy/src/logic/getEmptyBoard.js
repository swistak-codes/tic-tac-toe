/**
 * Funkcja generująca pustą tablicę dwuwymiarową
 * @param {Number} size - rozmiar tablicy (będzie kwadratowa)
 * @param {*} value - wartość którą mają być wypełnione komórki
 */
export function getEmptyBoard(size, value) {
  return [...Array(size)].map(() => Array(size).fill(value));
}
