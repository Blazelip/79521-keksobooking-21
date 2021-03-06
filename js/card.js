'use strict';

const typesMap = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`)
.content
.querySelector(`.map__card`);

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
  const filteredElems = Array.from(elements).filter((item) => {
    return item.tagName !== `IMG`;
  });

  for (let child of filteredElems) {
    if (child.innerHTML === `` && child.textContent === ``) {
      card.removeChild(child);
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
  const avatarImg = card.querySelector(`.popup__avatar`);

  card.querySelector(`.popup__title`).textContent = title;
  card.querySelector(`.popup__text--address`).textContent = address;
  card.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  card.querySelector(`.popup__type`).textContent = typesMap[type];
  card.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}.`;
  card.querySelector(`.popup__description`).textContent = description;
  if (avatar) {
    avatarImg.src = avatar;
  } else {
    card.removeChild(avatarImg);
  }

  makeOfferFeatures(features, card);
  makeOfferPhotos(photos, card);

  checkNullInCard(card);

  return card;
};

const showCard = (offer) => {
  closeCurrentCard();
  const card = makeCard(offer);
  const cardClose = card.querySelector(`.popup__close`);

  map.insertBefore(card, mapFilters);

  document.addEventListener(`keydown`, onCardClose);
  cardClose.addEventListener(`click`, onCardClose);
};

const onCardClose = (evt) => {
  if (evt.key === `Escape` || evt.button === 0) {
    closeCurrentCard();
    window.pin.removeActiveClass();
  }
};

const closeCurrentCard = () => {
  const currentCard = map.querySelector(`.map__card`);

  if (currentCard) {
    document.removeEventListener(`keydown`, onCardClose);
    currentCard.remove();
  }
};

window.card = {
  show: showCard,
  closeCurrent: closeCurrentCard
};


