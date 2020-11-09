'use strict';

const API_URL = `https://21.javascript.pages.academy/keksobooking/`;

const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

const getServerResponse = (xhr, onLoad, onError) => {
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} - ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};

const getData = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  getServerResponse(xhr, onLoad, onError);

  xhr.open(`GET`, `${API_URL}data`);
  xhr.send();
};

const sendData = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  getServerResponse(xhr, onLoad, onError);

  xhr.open(`POST`, API_URL);
  xhr.send(data);
};

window.backend = {
  getData,
  sendData
};
