'use strict';

(() => {
  const pinBoard = document.querySelector(`.map__pins`);

  const errorMsgTemplate = document.getElementById(`error`)
  .content
  .querySelector(`.error`);

  const successMsgTemplate = document.getElementById(`success`)
  .content
  .querySelector(`.success`);


  const showErrorMsg = (errorMsg) => {
    const node = errorMsgTemplate.cloneNode(true);
    const text = node.querySelector(`.error__message`);
    // const button = node.querySelector(`.error__button`);

    text.textContent = `${errorMsg}`;

    pinBoard.appendChild(node);

    const onTryAgainButtonClick = () => {
      console.log(`YA tut`);
      node.remove();
      document.removeEventListener(`keydown`, onTryAgainButtonPressEsc);
      document.removeEventListener(`click`, onTryAgainButtonClick);
    };

    const onTryAgainButtonPressEsc = (evt) => {
      if (evt.key === `Escape`) {
        node.remove();
      }

      document.removeEventListener(`keydown`, onTryAgainButtonPressEsc);
      document.removeEventListener(`click`, onTryAgainButtonClick);
    };

    // button.addEventListener(`click`, onTryAgainButtonClick);
    document.addEventListener(`keydown`, onTryAgainButtonPressEsc);
    document.addEventListener(`click`, onTryAgainButtonClick);
  };

  const showSuccessMsg = () => {
    const node = successMsgTemplate.cloneNode(true);
    pinBoard.appendChild(node);

    const onStatusModalClose = (evt) => {
      if (evt.key === `Escape` || evt.button === 0) {
        node.remove();
      }

      document.removeEventListener(`keydown`, onStatusModalClose);
      document.removeEventListener(`click`, onStatusModalClose);
    };

    document.addEventListener(`keydown`, onStatusModalClose);
    document.addEventListener(`click`, onStatusModalClose);
  };

  window.statusMsg = {
    showErrorMsg,
    showSuccessMsg
  };

})();
