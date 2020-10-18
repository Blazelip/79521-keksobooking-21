'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const pinBoard = document.querySelector(`.map__pins`);
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

  const renderPins = (offers) => {
    const fragment = document.createDocumentFragment();

    offers.forEach((offer) => {
      const currentPin = makePin(offer);
      fragment.appendChild(currentPin);
    });

    pinBoard.appendChild(fragment);
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
          window.card.showCard(offer);
        }
      }
    }
  };

  window.pin = {
    makePin,
    renderPins,
    onPinClick
  };

})();
