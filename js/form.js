'use strict';

(() => {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_TALE = 22;

  const PRICE_MIN_MAP = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };

  const PRICE_MAX = 1000000;

  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const formFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFiltersList = document.querySelectorAll(`.map__filter, .map__features`);

  const titleField = adForm.querySelector(`#title`);
  const addressField = adForm.querySelector(`#address`);
  const roomField = adForm.querySelector(`#room_number`);
  const guestField = adForm.querySelector(`#capacity`);
  const priceField = adForm.querySelector(`#price`);
  const typeField = adForm.querySelector(`#type`);
  const timeFieldset = adForm.querySelector(`.ad-form__element--time`);
  const checkinField = adForm.querySelector(`#timein`);
  const checkoutField = adForm.querySelector(`#timeout`);

  const onTitleInput = () => {
    if (titleField.validity.tooShort) {
      titleField.setCustomValidity(`Заголовок должен быть не менее 30 символов`);
    } else if (titleField.validity.tooLong) {
      titleField.setCustomValidity(`Заголовок не должен превышать 100 символов`);
    } else if (titleField.validity.valueMissing) {
      titleField.setCustomValidity(`Обязательное поле`);
    } else {
      titleField.setCustomValidity(``);
    }

    titleField.reportValidity();
  };

  titleField.addEventListener(`invalid`, onTitleInput);

  const onPriceInput = () => {
    const minPrice = PRICE_MIN_MAP[typeField.value];

    if (priceField.value <= minPrice) {
      priceField.setCustomValidity(`Минимальная цена за ночь ${minPrice} руб. Нужно увеличить цену.`);
    } else if (priceField.value >= PRICE_MAX) {
      priceField.setCustomValidity(`Максимальная цена за ночь ${PRICE_MAX} руб. Нужно уменьшить цену.`);
    } else {
      priceField.setCustomValidity(``);
    }

    priceField.reportValidity();
  };

  priceField.addEventListener(`input`, onPriceInput);

  const setMinPrice = () => {
    const minPrice = PRICE_MIN_MAP[typeField.value];
    priceField.min = `${minPrice}`;
    priceField.placeholder = `${minPrice}`;
  };

  typeField.addEventListener(`change`, () => {
    setMinPrice();
  });

  timeFieldset.addEventListener(`change`, (evt) => {
    checkinField.value = evt.target.value;
    checkoutField.value = evt.target.value;
  });

  const roomsFieldChecker = () => {
    const room = parseInt(roomField.value, 10);
    const person = parseInt(guestField.value, 10);

    if (room === 100 && person !== 0) {
      guestField.setCustomValidity(`100 комнат, это шо, дворец по-твоему? Не для гостей`);
    } else if (room === 3 && (person !== 1 && person !== 2 && person !== 3)) {
      guestField.setCustomValidity(`Трехкомнатные аппартаменты - до 3 персон`);
    } else if (room === 2 && (person !== 1 && person !== 2)) {
      guestField.setCustomValidity(`Двухкомнатные аппартаменты рассчитаны на 1 или 2 персоны`);
    } else if (room === 1 && person !== 1) {
      guestField.setCustomValidity(`Одна комната бронируется только на 1 персону`);
    } else {
      guestField.setCustomValidity(``);
    }

    guestField.reportValidity();
  };


  roomField.addEventListener(`change`, roomsFieldChecker);
  guestField.addEventListener(`change`, roomsFieldChecker);

  const formElementsSwitcher = (nodeList, flag) => {
    for (let element of nodeList) {
      element.disabled = flag;
    }
  };

  const calcPinAddress = (isActivePage) => {
    addressField.readOnly = true;

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
    setMinPrice();
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
