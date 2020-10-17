'use strict';

(() => {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_TALE = 22;

  const mainPin = document.querySelector(`.map__pin--main`);

  const calcPinAddress = (isActivePage) => {
    const pinAddressX = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2);
    const pinAddressY = (isActivePage)
      ? Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_TALE)
      : Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT / 2);

    return `${pinAddressX}, ${pinAddressY}`;
  };

  window.form = {
    calcPinAddress
  };

})();
