'use strict';

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_TALE = 22;

const FILE_TYPES = [`jpg`, `jpeg`, `png`];

const DEFAULT_USERPIC_URL = `/img/muffin-grey.svg`;

const mainPin = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const formReset = adForm.querySelector(`.ad-form__reset`);
const formFieldsets = adForm.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFilterItems = mapFilters.querySelectorAll(`.map__filter, .map__features`);
const addressField = adForm.querySelector(`#address`);
const userPic = adForm.querySelector(`.ad-form-header__input`);
const userPicPreview = adForm.querySelector(`.ad-form-header__preview img`);
const uploadPic = adForm.querySelector(`.ad-form__input`);
const offerPicContainer = adForm.querySelector(`.ad-form__photo`);

const onFileInputLoadPic = (evt) => {
  const input = evt.target;
  const file = input.files[0];
  const fileType = file.type;

  const matches = FILE_TYPES.some(function (item) {
    return fileType.endsWith(item);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      if (input.classList.contains(`ad-form-header__input`)) {
        userPicPreview.src = reader.result;
      } else {
        offerPicContainer.innerHTML = `<img class="ad-form__photo-preview" src="${reader.result}">`;
      }
    });

    reader.readAsDataURL(file);
  }
};

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

const onSuccessSendForm = () => {
  window.card.closeCurrentCard();
  window.pin.deletePins();
  mapFilters.reset();
  adForm.reset();
  userPicPreview.src = DEFAULT_USERPIC_URL;
  offerPicContainer.innerHTML = ``;
  window.pin.resetMainPinCoord();
  window.main.deactivateApp();
  window.statusMsg.showSuccessMsg();
};

const onFailedRequest = (errorMsg) => {
  window.statusMsg.showErrorMsg(errorMsg);
};

const onResetBtnClick = () => {
  window.card.closeCurrentCard();
  window.pin.deletePins();
  mapFilters.reset();
  adForm.reset();
  userPicPreview.src = DEFAULT_USERPIC_URL;
  offerPicContainer.innerHTML = ``;
  window.pin.resetMainPinCoord();
  window.main.deactivateApp();
};

const disableForm = () => {
  adForm.classList.add(`ad-form--disabled`);
  formElementsSwitcher(formFieldsets, true);
  formElementsSwitcher(mapFilterItems, true);
  addressField.value = calcPinAddress(false);
  window.validation.setMinPrice();
  formReset.removeEventListener(`click`, onResetBtnClick);
};

const enableForm = () => {
  adForm.classList.remove(`ad-form--disabled`);
  formElementsSwitcher(formFieldsets, false);
  formElementsSwitcher(mapFilterItems, false);
  addressField.value = calcPinAddress(true);
  formReset.addEventListener(`click`, onResetBtnClick);
};

userPic.addEventListener(`change`, onFileInputLoadPic);
uploadPic.addEventListener(`change`, onFileInputLoadPic);

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.validation.roomsFieldChecker();
  if (adForm.checkValidity()) {
    window.backend.sendData(new FormData(adForm), onSuccessSendForm, onFailedRequest);
  }
});

window.form = {
  calcPinAddress,
  disableForm,
  enableForm
};
