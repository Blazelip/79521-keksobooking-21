'use strict';

const OFFER_AMOUNT = 8;
const PRICE_MIN = 1000;
const PRICE_MAX = 10000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 4;
const GUESTS_MIN = 1;
const GUESTS_MAX = 5;
const PHOTOS_AMOUNT_MIN = 1;
const PHOTOS_AMOUNT_MAX = 10;

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

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

const TYPES_MAP = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalo: `Бунгало`
};

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

const map = document.querySelector(`.map`);
const pinBoard = document.querySelector(`.map__pins`);
const mapFilters = map.querySelector(`.map__filters-container`);

const pinTemplate = document.getElementById(`pin`)
  .content
  .querySelector(`.map__pin`);
const cardTemplate = document.getElementById(`card`)
  .content
  .querySelector(`.map__card`);

const MIN_LOCATION_X = 0;
const maxLocationX = map.offsetWidth;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const getRandomArray = (array) => {
  return shuffleArray(array).slice(getRandomInteger(0, array.length - 1));
};

const makePhotosArray = () => {
  const photos = [];

  for (let i = 1; i <= getRandomInteger(PHOTOS_AMOUNT_MIN, PHOTOS_AMOUNT_MAX); i++) {
    photos.push(`http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`);
  }

  return photos;
};


const getOffersData = (offerAmount) => {
  const offersData = [];

  for (let i = 1; i <= offerAmount; i++) {
    const locX = getRandomInteger(MIN_LOCATION_X, maxLocationX);
    const locY = getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);

    offersData.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: getRandomArrayElement(TITLES),
        address: `${locX}, ${locY}`,
        price: getRandomInteger(PRICE_MIN, PRICE_MAX),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomInteger(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomArrayElement(CHECKIN),
        checkout: getRandomArrayElement(CHECKOUT),
        features: getRandomArray(FEATURES),
        description: `Описание обьекта`,
        photos: makePhotosArray()
      },
      location: {
        x: locX,
        y: locY
      }
    });
  }

  return offersData;
};

const makePin = (offerData) => {
  const node = pinTemplate.cloneNode(true);
  const pinImg = node.querySelector(`img`);

  node.style.left = `${offerData.location.x - PIN_WIDTH / 2}px`;
  node.style.top = `${offerData.location.y - PIN_HEIGHT}px`;
  pinImg.src = offerData.author.avatar;
  pinImg.alt = offerData.offer.title;

  return node;
};

const renderPins = (offers) => {
  const fragment = document.createDocumentFragment();

  offers.forEach((offer) => {
    const currentPin = makePin(offer);
    fragment.appendChild(currentPin);
  });

  pinBoard.appendChild(fragment);
};

const makeOfferFeatures = (offerData, node) => {
  const featuresList = node.querySelector(`.popup__features`);
  featuresList.innerHTML = ``;

  for (let i = 0; i < offerData.offer.features.length; i++) {
    const listItem = document.createElement(`li`);

    listItem.classList.add(`popup__feature`, `popup__feature--${offerData.offer.features[i]}`);

    featuresList.appendChild(listItem);
  }
};

const makeOfferPhotos = (offerData, node) => {
  const photosList = node.querySelector(`.popup__photos`);
  const photoTemplate = photosList.children[0];
  photoTemplate.src = offerData.offer.photos[0];

  const copiedPhoto = photoTemplate.cloneNode(true);

  for (let i = 1; i < offerData.offer.photos.length; i++) {
    copiedPhoto.src = `${offerData.offer.photos[i]}`;

    photosList.appendChild(copiedPhoto);
  }
};

const makeCard = (offerData) => {
  const node = cardTemplate.cloneNode(true);

  node.querySelector(`.popup__title`).textContent = offerData.offer.title;
  node.querySelector(`.popup__text--address`).textContent = offerData.offer.address;
  node.querySelector(`.popup__text--price`).textContent = `${offerData.offer.price}₽/ночь`;
  node.querySelector(`.popup__type`).textContent = TYPES_MAP[offerData.offer.type];
  node.querySelector(`.popup__text--capacity`).textContent = `${offerData.offer.rooms} комнаты для ${offerData.offer.guests} гостей`;
  node.querySelector(`.popup__text--time`).textContent = `Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}.`;
  node.querySelector(`.popup__description`).textContent = offerData.offer.description;
  node.querySelector(`.popup__avatar`).src = offerData.author.avatar;

  makeOfferFeatures(offerData, node);
  makeOfferPhotos(offerData, node);

  return node;
};

const renderCards = (offers) => {
  map.insertBefore(makeCard(offers[0]), mapFilters);
};

map.classList.remove(`map--faded`);

const pinsData = getOffersData(OFFER_AMOUNT);
renderPins(pinsData);
renderCards(pinsData);
