'use strict';

const OFFER_AMOUNT = 8;
const map = document.querySelector(`.map`);
const MAX_LOCATION_X = map.offsetWidth;

const TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];
const TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalo`
];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const CHECKIN = [
  `12:00`,
  `13:00`,
  `14:00`
];
const CHECKOUT = [
  `12:00`,
  `13:00`,
  `14:00`
];
// const PHOTOS = [
//   `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
//   `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
//   `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
// ];

const pinTemplate = document.getElementById('pin').content.querySelector(`.map__pin`);
const pinBoard = document.querySelector(`.map__pins`);

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const getRandomArrayIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const makeNewRandomArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    let j = getRandomInteger(0, array.length - 1);
    let swap = array[0];

    array[0] = array[j];
    array[j] = swap;
  }

  // ЕСТЬ ВОПРОСЫ, ПРАВИЛЬНО ЛИ ИДЕТ НАРЕЗКА МАССИВА
  return array.slice(getRandomInteger(0, array.length));
}

// ЕСТЬ ВОПРОСЫ К ТЗ, ПРАВИЛЬНО ЛИ Я ПОНЯЛ, КАКОЙ МАССИВ ФОТОК ОТ МЕНЯ НУЖЕН
const makePhotosArray = () => {
  const photos = [];

  for (let i = 1; i <= getRandomInteger(1, 10); i++) {
    let photo = `http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`;

    photos.push(photo);
  }

  return photos;
};


const getOffersData = (offerAmount) => {
  const offersData = [];

  for (let i = 1; i <= offerAmount; i++) {
    const offerData = {
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: TITLES[getRandomArrayIndex(TITLES)],
        address: `${this.location.x}`, // НЕ ОПРЕДЕЛЯЕТСЯ, ПАДЛА
        price: getRandomInteger(1000, 10000),
        type: TYPES[getRandomArrayIndex(TYPES)],
        rooms: getRandomInteger(1, 4),
        guests: getRandomInteger(1, 5),
        checkin: CHECKIN[getRandomArrayIndex(CHECKIN)],
        checkout: CHECKOUT[getRandomArrayIndex(CHECKOUT)],
        features: makeNewRandomArray(FEATURES),
        description: 'Описание обьекта', // ЛЕНЬ ПИСАТЬ БЫЛО
        photos: makePhotosArray()
      },
      location: {
        x: getRandomInteger(0, MAX_LOCATION_X),
        y: getRandomInteger(130, 630)
      }
    };

    offersData.push(offerData);
  }

  return offersData;
};

const makePin = (offerData) => {
  const node = pinTemplate.cloneNode(true);
  const pinImg = node.querySelector(`img`);

  node.style.left = 'BLA-BLA-BLA'; // НЕ ЯСНО, ЧТО ХОТЯТ В ТЗ
  node.style.top = 'BLA-BLA-BLA'; // НЕ ЯСНО, ЧТО ХОТЯТ В ТЗ
  pinImg.src = offerData.author.avatar;
  pinImg.alt = offerData.offer.title;

  return node;
};

const renderPins = (offers) => {
  const fragment = document.createDocumentFragment();

  offers.forEach(function (offer) {
    const currentPin = makePin(offer);
    fragment.appendChild(currentPin);
  });

  pinBoard.appendChild(fragment);
};

let pinsData = getOffersData(OFFER_AMOUNT);
renderPins(pinsData);

map.classList.remove(`.map--faded`);


