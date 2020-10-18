'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const pinBoard = document.querySelector(`.map__pins`);

  const onMainPinHandler = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      activateApp();
      window.pin.renderPins(window.data.roomsData);
    }
  };

  const activateApp = () => {
    map.classList.remove(`map--faded`);

    window.form.enableForm();
    mainPin.removeEventListener(`mousedown`, onMainPinHandler);
    mainPin.removeEventListener(`keydown`, onMainPinHandler);
    pinBoard.addEventListener(`click`, window.pin.onPinClick);
  };

  const deactivateApp = () => {
    map.classList.add(`map--faded`);

    window.form.disableForm();
    mainPin.addEventListener(`mousedown`, onMainPinHandler);
    mainPin.addEventListener(`keydown`, onMainPinHandler);
    pinBoard.removeEventListener(`click`, window.pin.onPinClick);
  };

  deactivateApp();

})();
