'use strict';

const OFFER_AMOUNT = 8;
const PRICE_MIN = 1000;
const PRICE_MAX = 10000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 4;
const GUESTS_MIN = 1;
const GUESTS_MAX = 5;
const PHOTOS_AMOUNT_MIN = 1;
const PHOTOS_AMOUNT_MAX = 3;

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
  `bungalow`
];

const typesMap = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
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

const makeOfferFeatures = (features, card) => {
  const featuresList = card.querySelector(`.popup__features`);
  featuresList.innerHTML = ``;

  features.forEach((feature) => {
    const listItem = document.createElement(`li`);

    listItem.classList.add(`popup__feature`, `popup__feature--${feature}`);

    featuresList.appendChild(listItem);
  });

};

const makeOfferPhotos = (photos, card) => {
  const photosList = card.querySelector(`.popup__photos`);
  const photoTemplate = photosList.querySelector(`.popup__photo`);

  photosList.innerHTML = ``;

  photos.forEach((photo) => {
    const copiedPhoto = photoTemplate.cloneNode(true);

    copiedPhoto.src = `${photo}`;
    photosList.appendChild(copiedPhoto);
  });
};

const checkNullInCard = (card) => {
  const elements = card.children;
  for (let child of elements) {
    if (child.classList.contains(`popup__features`)) {
      const listItems = child.children;
      console.log(listItems);

      // listItems.forEach(function (listItem) {
      //   if (listItem.textContent === ``) {
      //     child.removeChild(listItem);
      //   }
      // });

      for (let listItem of listItems) {
        if (listItem.textContent === ``) {
          child.removeChild(listItem);
        }
      }

    } else if (child.classList.contains(`popup__photos`)) {
      const images = child.children;
      console.log(images);

      // images.forEach(function (image) {
      //   if (image.src === undefined) {
      //     child.removeChild(image);
      //   }
      // });

      for (let image of images) {
        if (image.src === undefined) {
          child.removeChild(image);
        }
      }
    } else {
      if (child.src === undefined && child.textContent === ``) {
        card.removeChild(child);
      }
    }
  }
};

const makeCard = (offerData) => {
  const {offer, author} = offerData;
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos
  } = offer;
  const {avatar} = author;

  const card = cardTemplate.cloneNode(true);

  card.querySelector(`.popup__title`).textContent = title;
  card.querySelector(`.popup__text--address`).textContent = address;
  card.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  card.querySelector(`.popup__type`).textContent = typesMap[type];
  card.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}.`;
  card.querySelector(`.popup__description`).textContent = description;
  card.querySelector(`.popup__avatar`).src = avatar;

  makeOfferFeatures(features, card);
  makeOfferPhotos(photos, card);

  checkNullInCard(card);

  return card;
};

const renderCards = (offers) => {
  map.insertBefore(makeCard(offers[0]), mapFilters);
};

map.classList.remove(`map--faded`);

const roomsData = getOffersData(OFFER_AMOUNT);
renderPins(roomsData);
renderCards(roomsData);

// const test = makeCard(roomsData[0]);
// console.log(test);

// // const checkNullInCard = (card) = {
// const elements1 = test.children;
// console.log(elements1);

// for (let child of elements1) {
//   if (child.classList.contains(`popup__features`)) {
//     const listItems = child.children;

//     listItems.forEach((listItem) => {
//       if (listItem.textContent === ``) {
//         child.removeChild(listItem);
//       }
//     });
//   } else if (child.classList.contains(`popup__photos`)) {
//     const images = child.children;

//     images.forEach((image) => {
//       if (image.src === undefined) {
//         child.removeChild(image);
//       }
//     });
//   } else {
//     if (child.src === undefined && child.textContent === ``) {
//       card.removeChild(child);
//     }
//   }
// }
