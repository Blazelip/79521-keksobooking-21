'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_TALE = 22;

const MAIN_PIN_DEFAULT_X = 570;
const MAIN_PIN_DEFAULT_Y = 374;

const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = 1200;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

const pinLimits = {
  x: {
    min: MIN_LOCATION_X - MAIN_PIN_WIDTH / 2,
    max: MAX_LOCATION_X - MAIN_PIN_WIDTH / 2
  },
  y: {
    min: MIN_LOCATION_Y - (MAIN_PIN_HEIGHT + MAIN_PIN_TALE),
    max: MAX_LOCATION_Y - (MAIN_PIN_HEIGHT + MAIN_PIN_TALE)
  }
};

const mainPin = document.querySelector(`.map__pin--main`);
const pinBoard = document.querySelector(`.map__pins`);
const addressField = document.querySelector(`#address`);
const pinTemplate = document.querySelector(`#pin`)
.content
.querySelector(`.map__pin`);

const resetMainPinCoord = () => {
  mainPin.style.left = `${MAIN_PIN_DEFAULT_X}px`;
  mainPin.style.top = `${MAIN_PIN_DEFAULT_Y}px`;
};

const makePin = (offerData) => {
  if (offerData.offer === ``) {
    return null;
  }

  const node = pinTemplate.cloneNode(true);
  const pinImg = node.querySelector(`img`);

  node.dataset.id = `${offerData.offer.id}`;
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
    if (currentPin) {
      fragment.appendChild(currentPin);
    }

  });

  pinBoard.appendChild(fragment);
};

const deletePins = () => {
  const pins = pinBoard.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((pin) => {
    pin.remove();
  });
};

const onPinClick = (evt) => {
  const target = evt.target;

  if (target.tagName === `IMG` || target.classList.contains(`map__pin`)) {

    if (!target.classList.contains(`map__pin--main`) && !target.closest(`.map__pin--main`)) {
      const id = parseInt(target.dataset.id, 10);
      const number = id ? id : parseInt(evt.target.closest(`.map__pin`).dataset.id, 10);

      const offer = window.dataWithId.find((item) => {
        return item.offer.id === number;
      });

      if (offer) {
        removeActiveClass();
        const pin = target.closest(`.map__pin`);
        pin.classList.add(`map__pin--active`);
        window.card.show(offer);
      }
    }
  }
};

const removeActiveClass = () => {
  const activePins = pinBoard.querySelectorAll(`.map__pin--active`);

  activePins.forEach((item) => {
    item.classList.remove(`map__pin--active`);
  });
};

const moveMainPin = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const finalCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    if (finalCoords.x >= pinLimits.x.max) {
      finalCoords.x = `${pinLimits.x.max}px`;
    }

    if (finalCoords.x <= pinLimits.x.min) {
      finalCoords.x = `${pinLimits.x.min}px`;
    }

    if (finalCoords.y > pinLimits.y.max) {
      finalCoords.y = `${pinLimits.y.max}px`;
    }

    if (finalCoords.y < pinLimits.y.min) {
      finalCoords.y = `${pinLimits.y.min}px`;
    }

    mainPin.style.left = `${finalCoords.x}px`;
    mainPin.style.top = `${finalCoords.y}px`;

    addressField.value = window.form.calcPinAddress(true);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

window.pin = {
  resetMain: resetMainPinCoord,
  make: makePin,
  render: renderPins,
  onClick: onPinClick,
  onMainMove: moveMainPin,
  delete: deletePins,
  removeActiveClass
};
