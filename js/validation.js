'use strict';

(() => {
  const TITLE_MIN = 30;
  const TITLE_MAX = 100;

  const ROOMS_MAX = 100;
  const GUESTS_MIN = 0;

  const PRICE_MAX = 1000000;

  const priceMinMap = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };

  const adForm = document.querySelector(`.ad-form`);

  const titleField = adForm.querySelector(`#title`);
  const roomField = adForm.querySelector(`#room_number`);
  const guestField = adForm.querySelector(`#capacity`);
  const priceField = adForm.querySelector(`#price`);
  const typeField = adForm.querySelector(`#type`);
  const timeFieldset = adForm.querySelector(`.ad-form__element--time`);
  const checkinField = adForm.querySelector(`#timein`);
  const checkoutField = adForm.querySelector(`#timeout`);

  const onTitleInput = () => {
    const value = titleField.value.trim().length;

    if (value < TITLE_MIN) {
      titleField.setCustomValidity(`Заголовок должен быть не менее ${TITLE_MIN} символов`);
    } else if (value > TITLE_MAX) {
      titleField.setCustomValidity(`Заголовок не должен превышать ${TITLE_MAX} символов`);
    } else {
      titleField.setCustomValidity(``);
    }

    titleField.reportValidity();
  };

  const onPriceInput = () => {
    const minPrice = priceMinMap[typeField.value];

    if (priceField.value < minPrice) {
      priceField.setCustomValidity(`Минимальная цена за ночь ${minPrice} руб. Нужно увеличить цену.`);
    } else if (priceField.value > PRICE_MAX) {
      priceField.setCustomValidity(`Максимальная цена за ночь ${PRICE_MAX} руб. Нужно уменьшить цену.`);
    } else {
      priceField.setCustomValidity(``);
    }

    priceField.reportValidity();
  };

  const roomsFieldChecker = () => {
    const room = parseInt(roomField.value, 10);
    const person = parseInt(guestField.value, 10);

    if (room === ROOMS_MAX && person !== GUESTS_MIN) {
      guestField.setCustomValidity(`100 комнат, это шо, дворец по-твоему? Выбирай "Не для гостей"`);
    } else if (person === GUESTS_MIN && room !== ROOMS_MAX) {
      guestField.setCustomValidity(`Не для гостей подходит только 100 комнат, бро`);
    } else if (room < person) {
      guestField.setCustomValidity(`Количество комнат не должно быть меньше числа персон`);
    } else {
      guestField.setCustomValidity(``);
    }

    guestField.reportValidity();
  };

  const setMinPrice = () => {
    const minPrice = priceMinMap[typeField.value];
    priceField.min = `${minPrice}`;
    priceField.placeholder = `${minPrice}`;
  };

  const onTimeFieldsHandler = (evt) => {
    checkinField.value = evt.target.value;
    checkoutField.value = evt.target.value;
  };

  titleField.addEventListener(`change`, onTitleInput);
  priceField.addEventListener(`change`, onPriceInput);

  typeField.addEventListener(`change`, () => {
    setMinPrice();
  });

  timeFieldset.addEventListener(`change`, onTimeFieldsHandler);

  window.validation = {
    setMinPrice,
    roomsFieldChecker
  };

})();
