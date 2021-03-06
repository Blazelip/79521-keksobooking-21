'use strict';

const DEBOUNCE_INTERVAL = 500;

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

const addIdToSourceData = (array) => {
  return array.map((item, index) => {
    item.offer.id = index;

    return item;
  });
};

const debounce = (cb, interval = DEBOUNCE_INTERVAL) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, interval);
  };
};

window.util = {
  getRandomInteger,
  getRandomArrayElement,
  shuffleArray,
  getRandomArray,
  addIdToSourceData,
  debounce
};
