'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const pinBoard = document.querySelector(`.map__pins`);
  const mapFilters = map.querySelector(`.map__filters-container`);

  const renderPins = (offers) => {
    const fragment = document.createDocumentFragment();

    offers.forEach((offer) => {
      const currentPin = window.pin.makePin(offer);
      fragment.appendChild(currentPin);
    });

    pinBoard.appendChild(fragment);
  };

  const showCard = (offer) => {
    closeCurrentCard();
    const card = window.card.makeCard(offer);
    const cardClose = card.querySelector(`.popup__close`);

    map.insertBefore(card, mapFilters);

    document.addEventListener(`keydown`, closePopup);
    cardClose.addEventListener(`click`, closePopup);
  };

  const closePopup = (evt) => {
    if (evt.key === `Escape` || evt.button === 0) {
      closeCurrentCard();
    }
  };

  const closeCurrentCard = () => {
    const currentCard = map.querySelector(`.map__card`);

    if (currentCard) {
      document.removeEventListener(`keydown`, closePopup);
      currentCard.remove();
    }
  };

  window.map = {
    variables: {
      pinBoard
    },
    functions: {
      showCard,
      renderPins
    }
  };

})();
