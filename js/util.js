'use strict';

(() => {
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArrayElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const shuffleArray = (array) => {
    const copiedArray = array.slice();

    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copiedArray[i];
      copiedArray[i] = copiedArray[j];
      copiedArray[j] = temp;
    }

    return copiedArray;
  };

  const getRandomArray = (array) => {
    return shuffleArray(array).slice(getRandomInteger(0, array.length - 1));
  };

  window.util = {
    getRandomInteger,
    getRandomArrayElement,
    shuffleArray,
    getRandomArray
  };

})();
