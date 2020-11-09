'use strict';

const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const pinBoard = document.querySelector(`.map__pins`);

const onSuccessLoadData = (serverData) => {
  window.dataWithId = window.util.addIdToSourceData(serverData);
  window.pin.render(window.filter.sortData(window.dataWithId));
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
  pinBoard.addEventListener(`click`, window.pin.onPinClick);
};

const deactivateApp = () => {
  map.classList.add(`map--faded`);

  window.form.disable();
  mainPin.addEventListener(`mousedown`, window.pin.moveMain);
  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinClick);
  pinBoard.removeEventListener(`click`, window.pin.onPinClick);
};

deactivateApp();

window.main = {
  deactivateApp
};
