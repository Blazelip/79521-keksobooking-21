'use strict';

(() => {
  const MAX_PIN_AMOUNT = 5;
  const FILTER_ALL = `any`;

  const filtersForm = document.querySelector(`.map__filters`);
  const houseType = filtersForm.querySelector(`#housing-type`);
  const housePrice = filtersForm.querySelector(`#housing-price`);
  const houseRooms = filtersForm.querySelector(`#housing-rooms`);
  const houseGuests = filtersForm.querySelector(`#housing-guests`);

  const housePriceMap = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      max: 10000
    },
    high: {
      min: 50000,
    }
  };

  const filterHouseType = (item) => {
    const houseFilter = houseType.value;

    if (item.offer.type === parseInt(houseFilter, 10) || houseFilter === FILTER_ALL) {
      return true;
    }

    return false;
  };

  const filterHousePrice = (item) => {
    const priceFilter = housePrice.value;

    switch (priceFilter) {
      case FILTER_ALL:
        return true;
        break;

      case `middle`:
        if (item.offer.price >= housePriceMap.middle.min && item.offer.price <= housePriceMap.middle.max) {
          return true;
        }
        break;

      case `low`:
        if (item.offer.price < housePriceMap.low.max) {
          return true;
        }
        break;

      case `high`:
        if (item.offer.price > housePriceMap.high.min) {
          return true;
        }
        break;
    }

    return false;
  };

  const filterHouseRooms = (item) => {
    const roomsFilter = houseRooms.value;

    if (item.offer.rooms === parseInt(roomsFilter, 10) || roomsFilter === FILTER_ALL) {
      return true;
    }

    return false;
  };

  const filterHouseGuests = (item) => {
    const guestsFilter = houseGuests.value;

    if (item.offer.guests === parseInt(guestsFilter, 10) || guestsFilter === FILTER_ALL) {
      return true;
    }

    return false;
  };

  const filterHouseFeatures = (item) => {
    const checkedFeatures = filtersForm.querySelectorAll(`.map__checkbox:checked`);
    const features = [];

    checkedFeatures.forEach((feature) => {
      features.push(feature.value);
    });

    return features.every((feature) => {
      return item.offer.features.includes(feature);
    });
  };

  const filterData = (offers) => {
    const filteredData = [];

    for (let i = 0; i < offers.length; i++) {

      if (filterHouseType(offers[i]) && filterHousePrice(offers[i]) && filterHouseRooms(offers[i]) && filterHouseGuests(offers[i]) && filterHouseFeatures(offers[i])) {

        if (filteredData.length < MAX_PIN_AMOUNT) {
          filteredData.push(offers[i]);
        }

      }
    }

    return filteredData;
  };

  const onFiltersFormChange = () => {
    window.card.closeCurrentCard();
    window.pin.deletePins();
    window.pin.renderPins(filterData(window.dataWithId));
  };

  filtersForm.addEventListener(`change`, window.debounce(onFiltersFormChange));

  window.filter = {
    filterData
  };
})();


