'use strict';

(() => {
  const filtersBlock = document.querySelector(`.map__filters`);
  const houseType = filtersBlock.querySelector(`#housing-type`);

  const onHouseSelectChange = () => {
    const value = houseType.value;

    const filteredData = window.dataWithId.filter((item) => {
      return item.offer.type === value;
    });

    window.card.closeCurrentCard();
    window.pin.deletePins();
    window.pin.renderPins(filteredData);
  };

  houseType.addEventListener(`change`, onHouseSelectChange);

})();
