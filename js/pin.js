'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_TALE = 22;

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
  const pinTemplate = document.getElementById(`pin`)
  .content
  .querySelector(`.map__pin`);

  const makePin = (offerData) => {
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
      fragment.appendChild(currentPin);
    });

    pinBoard.appendChild(fragment);
  };

  const onPinClick = (evt) => {
    const target = evt.target;

    if (target.tagName === `IMG` || target.classList.contains(`map__pin`)) {

      if (!target.classList.contains(`map__pin--main`)) {
        const id = parseInt(target.dataset.id, 10);
        const number = id ? id : parseInt(evt.target.closest(`.map__pin`).dataset.id, 10);

        const offer = window.data.roomsData.find((item) => {
          return item.offer.id === number;
        });

        if (offer) {
          window.card.showCard(offer);
        }
      }
    }
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

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.pin = {
    makePin,
    renderPins,
    onPinClick,
    moveMainPin
  };

})();
