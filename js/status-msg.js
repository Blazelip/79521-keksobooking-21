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

    text.textContent = `${errorMsg}`;

    pinBoard.appendChild(node);

    const onStatusClose = () => {
      node.remove();
      document.removeEventListener(`keydown`, onDocumentPressEsc);
      document.removeEventListener(`click`, onDocumentClick);
    };

    const onDocumentClick = () => {
      onStatusClose();
    };

    const onDocumentPressEsc = (evt) => {
      if (evt.key === `Escape`) {
        onStatusClose();
      }
    };

    document.addEventListener(`keydown`, onDocumentPressEsc);
    document.addEventListener(`click`, onDocumentClick);
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
