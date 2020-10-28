'use strict';

(() => {
  // const OFFER_AMOUNT = 8;
  // const PRICE_MIN = 1000;
  // const PRICE_MAX = 10000;
  // const ROOMS_MIN = 1;
  // const ROOMS_MAX = 4;
  // const GUESTS_MIN = 1;
  // const GUESTS_MAX = 5;
  // const PHOTOS_AMOUNT_MIN = 1;
  // const PHOTOS_AMOUNT_MAX = 3;

  // const MIN_LOCATION_X = 0;
  // const MIN_LOCATION_Y = 130;
  // const MAX_LOCATION_Y = 630;

  // const TITLES = [
  //   `Большая уютная квартира`,
  //   `Маленькая неуютная квартира`,
  //   `Огромный прекрасный дворец`,
  //   `Маленький ужасный дворец`,
  //   `Красивый гостевой домик`,
  //   `Некрасивый негостеприимный домик`,
  //   `Уютное бунгало далеко от моря`,
  //   `Неуютное бунгало по колено в воде`
  // ];

  // const TYPES = [
  //   `palace`,
  //   `flat`,
  //   `house`,
  //   `bungalow`
  // ];

  // const FEATURES = [
  //   `wifi`,
  //   `dishwasher`,
  //   `parking`,
  //   `washer`,
  //   `elevator`,
  //   `conditioner`
  // ];

  // const CHECKIN = [
  //   `12:00`,
  //   `13:00`,
  //   `14:00`
  // ];

  // const CHECKOUT = [
  //   `12:00`,
  //   `13:00`,
  //   `14:00`
  // ];

  // const map = document.querySelector(`.map`);
  // const maxLocationX = map.offsetWidth;

  // const makePhotosArray = () => {
  //   const photos = [];

  //   for (let i = 1; i <= window.util.getRandomInteger(PHOTOS_AMOUNT_MIN, PHOTOS_AMOUNT_MAX); i++) {
  //     photos.push(`http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`);
  //   }

  //   return photos;
  // };

  // const getOffersData = (offerAmount) => {
  //   const offersData = [];

  //   for (let i = 1; i <= offerAmount; i++) {
  //     const locX = window.util.getRandomInteger(MIN_LOCATION_X, maxLocationX);
  //     const locY = window.util.getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);

  //     offersData.push({
  //       author: {
  //         avatar: `img/avatars/user0${i}.png`
  //       },
  //       offer: {
  //         title: window.util.getRandomArrayElement(TITLES),
  //         address: `${locX}, ${locY}`,
  //         price: window.util.getRandomInteger(PRICE_MIN, PRICE_MAX),
  //         type: window.util.getRandomArrayElement(TYPES),
  //         rooms: window.util.getRandomInteger(ROOMS_MIN, ROOMS_MAX),
  //         guests: window.util.getRandomInteger(GUESTS_MIN, GUESTS_MAX),
  //         checkin: window.util.getRandomArrayElement(CHECKIN),
  //         checkout: window.util.getRandomArrayElement(CHECKOUT),
  //         features: window.util.getRandomArray(FEATURES),
  //         description: `Описание обьекта`,
  //         photos: makePhotosArray()
  //       },
  //       location: {
  //         x: locX,
  //         y: locY
  //       }
  //     });
  //   }

  //   return offersData;
  // };

  const addIdToSourceData = (array) => {
    return array.map((item, index) => {
      item.offer.id = index;

      return item;
    });
  };

  // const sourceData = getOffersData(OFFER_AMOUNT);
  // const roomsData = addIdToSourceData(sourceData);

  window.data = {
    addIdToSourceData
  };
})();
