'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const pinBoard = document.querySelector(`.map__pins`);

  const errorMsgTemplate = document.getElementById(`error`)
  .content
  .querySelector(`.error`);

  const onSuccessLoadData = (serverData) => {
    // const dataWithId = window.data.addIdToSourceData(serverData);
    window.dataWithId = window.data.addIdToSourceData(serverData);

    window.pin.renderPins(window.dataWithId);
  };

  const onFailedRequest = (errorMsg) => {
    const node = errorMsgTemplate.cloneNode(true);
    const text = node.querySelector(`.error__message`);

    text.textContent = `${errorMsg}`;

    pinBoard.appendChild(node);
  };

  const onMainPinClick = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      activateApp();
      window.backend.getData(onSuccessLoadData, onFailedRequest);
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
