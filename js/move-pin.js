'use strict';

(() => {
  const MIN_LOCATION_X = 0;
  const MAX_LOCATION_X = 1200;
  const MIN_LOCATION_Y = 130;
  const MAX_LOCATION_Y = 630;

  const mainPin = document.querySelector(`.map__pin--main`);

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

      // mainPin.style.left = `${finalCoords.x}px`;
      // mainPin.style.top = `${finalCoords.y}px`;

      if (finalCoords.x >= MAX_LOCATION_X) {
        mainPin.style.left = `${MAX_LOCATION_X}px`;
      } else if (finalCoords.x <= MIN_LOCATION_X) {
        mainPin.style.left = `${MIN_LOCATION_X}px`;
      } else {
        mainPin.style.left = `${finalCoords.x}px`;
      }

      if (finalCoords.y >= MAX_LOCATION_Y) {
        mainPin.style.top = `${MAX_LOCATION_Y}px`;
      } else if (finalCoords.y <= MIN_LOCATION_Y) {
        mainPin.style.top = `${MIN_LOCATION_Y}px`;
      } else {
        mainPin.style.top = `${finalCoords.y}px`;
      }
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.movePin = {
    moveMainPin
  };

})();
