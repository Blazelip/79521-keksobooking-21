'use strict';

(() => {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_TALE = 22;

  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const formFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFiltersList = document.querySelectorAll(`.map__filter, .map__features`);
  const addressField = document.querySelector(`#address`);

  const formElementsSwitcher = (nodeList, flag) => {
    for (let element of nodeList) {
      element.disabled = flag;
    }
  };

  const calcPinAddress = (isActivePage) => {
    const pinAddressX = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2);
    const pinAddressY = (isActivePage)
      ? Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_TALE)
      : Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT / 2);

    return `${pinAddressX}, ${pinAddressY}`;
  };

  const disableForm = () => {
    adForm.classList.add(`ad-form--disabled`);
    formElementsSwitcher(formFieldsets, true);
    formElementsSwitcher(mapFiltersList, true);
    addressField.value = calcPinAddress(false);
  };

  const enableForm = () => {
    adForm.classList.remove(`ad-form--disabled`);
    formElementsSwitcher(formFieldsets, false);
    formElementsSwitcher(mapFiltersList, false);
    addressField.value = calcPinAddress(true);
  };

  window.form = {
    calcPinAddress,
    disableForm,
    enableForm
  };

})();
