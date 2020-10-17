'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const pinTemplate = document.getElementById(`pin`)
  .content
  .querySelector(`.map__pin`);

  const makePin = (offerData) => {
    const node = pinTemplate.cloneNode(true);
    const pinImg = node.querySelector(`img`);

    node.dataset.id = `${offerData.offer.id}`;
    node.style.left = `${offerData.location.x - PIN_WIDTH / 2}px`;
    node.style.top = `${offerData.location.y - PIN_HEIGHT}px`;
    pinImg.src = offerData.author.avatar;
    pinImg.alt = offerData.offer.title;

    return node;
  };

  window.pin = {
    makePin
  };

})();
