'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const formFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFiltersList = document.querySelectorAll(`.map__filter, .map__features`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const addressField = document.querySelector(`#address`);

  const formElementsSwitcher = (nodeList, flag) => {
    for (let element of nodeList) {
      element.disabled = flag;
    }
  };

  const onMainPinHandler = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      activateApp();
      window.map.functions.renderPins(window.data.roomsData);
    }
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
          window.map.functions.showCard(offer);
        }
      }
    }
  };

  const activateApp = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    formElementsSwitcher(formFieldsets, false);
    formElementsSwitcher(mapFiltersList, false);
    addressField.value = window.form.calcPinAddress(true);
    mainPin.removeEventListener(`mousedown`, onMainPinHandler);
    mainPin.removeEventListener(`keydown`, onMainPinHandler);
    window.map.variables.pinBoard.addEventListener(`click`, onPinClick);
  };

  const deactivateApp = () => {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    formElementsSwitcher(formFieldsets, true);
    formElementsSwitcher(mapFiltersList, true);
    addressField.value = window.form.calcPinAddress(false);
    mainPin.addEventListener(`mousedown`, onMainPinHandler);
    mainPin.addEventListener(`keydown`, onMainPinHandler);
    window.map.variables.pinBoard.removeEventListener(`click`, onPinClick);
  };

  deactivateApp();

  window.main = {
    map,
    mainPin,
  };

})();
