'use strict';

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const pinBoard = document.querySelector(`.map__pins`);

const onSuccessLoadData = (serverData) => {
  window.dataWithId = window.util.addIdToSourceData(serverData);
  window.pin.render(window.filter.getData(window.dataWithId));
};

const onFailedRequest = (errorMsg) => {
  window.statusMsg.showError(errorMsg);
};

const onMainPinClick = (evt) => {
  if (evt.button === 0 || evt.key === `Enter`) {
    activateApp();
  }
};

const activateApp = () => {
  map.classList.remove(`map--faded`);

  window.backend.getData(onSuccessLoadData, onFailedRequest);
  window.form.enable();
  mainPin.removeEventListener(`mousedown`, onMainPinClick);
  mainPin.removeEventListener(`keydown`, onMainPinClick);
  pinBoard.addEventListener(`click`, window.pin.onClick);
};

const deactivateApp = () => {
  map.classList.add(`map--faded`);

  window.form.disable();
  mainPin.addEventListener(`mousedown`, window.pin.onMainMove);
  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinClick);
  pinBoard.removeEventListener(`click`, window.pin.onClick);
};

deactivateApp();

window.main = {
  deactivateApp
};
