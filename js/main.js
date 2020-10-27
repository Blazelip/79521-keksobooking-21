'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const pinBoard = document.querySelector(`.map__pins`);

  const onSuccessLoad = (data) => {
    console.log(data);
  };

  const onError = () => {

  };

  const onMainPinClick = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      activateApp();
      window.backend.getData(onSuccessLoad, onError);
      // window.pin.renderPins(window.data.roomsData);
    }
  };

  const activateApp = () => {
    map.classList.remove(`map--faded`);

    window.form.enableForm();
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinClick);
    pinBoard.addEventListener(`click`, window.pin.onPinClick);
  };

  const deactivateApp = () => {
    map.classList.add(`map--faded`);

    window.form.disableForm();
    mainPin.addEventListener(`mousedown`, window.pin.moveMainPin);
    mainPin.addEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`keydown`, onMainPinClick);
    pinBoard.removeEventListener(`click`, window.pin.onPinClick);
  };

  deactivateApp();

})();
