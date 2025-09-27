
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import errorSvg from './img/errorSVG.svg';
import cautionSvg from './img/caution.svg';
import informSvg from './img/informSvg.svg';

const formElem = document.querySelector('.form');
const formInputElem = document.querySelector('.form-input');
const btnLoadElem = document.querySelector('.btn-load');

let page = 1;
const PER_PAGE = 15;
let totalPages = 0;
let requestValue = '';

formElem.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = formInputElem.value.trim();
  if (!query) {
    formElem.reset();
    return;
  }

  // підготовка до нового пошуку
  page = 1;
  requestValue = query;
  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(requestValue, page);

    if (!data.totalHits) { 
      iziToast.error({
        iconUrl: errorSvg,
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoader();
      formElem.reset();
      return;
    }

    // додаємо першу пачку — передаємо масив hits
    createGallery(data.hits);

    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        iconUrl: informSvg,
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    iziToast.warning({
      iconUrl: cautionSvg,
      position: 'topRight',
      message: 'Whoops, something went wrong! We gonna fix it soon.',
    });
  } finally {
    hideLoader();
    formElem.reset();
  }
});

if (btnLoadElem) {
  btnLoadElem.addEventListener('click', async () => {
    page += 1;

    showLoader();

    try {
      const data = await getImagesByQuery(requestValue, page);

      createGallery(data.hits);

      // Прокрутка: отримуємо висоту однієї карточки
      const cardHeight = document.querySelector('.gallery .gallery-item')?.getBoundingClientRect().height || 0;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      if (page >= Math.ceil(data.totalHits / PER_PAGE)) {
        hideLoadMoreButton();
        iziToast.info({
          iconUrl: informSvg,
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } catch (err) {
      iziToast.warning({
        iconUrl: cautionSvg,
        position: 'topRight',
        message: 'Whoops, something went wrong! We gonna fix it soon.',
      });
    } finally {
      hideLoader();
    }
  });
}

// import { getImagesByQuery } from "./js/pixabay-api";
// import {
//   createGallery,
//   clearGallery,
//   showLoader,
//   hideLoader,
//   showLoadMoreButton,
//   hideLoadMoreButton,
// } from "./js/render-functions";

// import errorSvg from "./img/errorSVG.svg";
// import cautionSvg from "./img/caution.svg";
// import informSvg from "./img/informSvg.svg";

// const formElem = document.querySelector(".form");
// const formInputElem = document.querySelector(".form-input");
// const btnLoadElem =document.querySelector(".btn-load");

// let page = 1;
// let totalPages = 0;
// let requestValue = '';
// const PER_PAGE = 15;

// formElem.addEventListener("submit", async (e) => {
//   e.preventDefault();

//  const query = formElem.value.trim();
//  if (!query) {
//     formElem.reset();
//     return;
//   }

//     page = 1;
//     requestValue = query;
//     hideLoadMoreButton();
//     clearGallery();
//     showLoader();

//     try {
//     const data = await getImagesByQuery(requestValue, page);

//     if (!data.totalHits) {
//       iziToast.error({
//         iconUrl: errorSvg,
//         position: "topRight",
//         message:
//           "Sorry, there are no images matching your search query. Please try again!",
//       });

//     hideLoader();
//     formElem.reset();
//     return;
//     }

//     createGallery(data.hits);

//     totalPages = Math.ceil(data.totalHits / PER_PAGE);
//     if (page < totalPages) {
//         showLoadMoreButton();
//     }
//      } else {
//        hideLoader();
//        iziToast.info({
//        iconUrl: informSvg,
//        position: 'topRight',
//        message:  "We're sorry, but you've reached the end of search results.",
//     });

// } finally {
//     hideLoader();
//     formElem.reset();
// }
// });

// if (btnLoadElem) {
//   btnLoadElem.addEventListener('click', async () => {
//     page += 1;

//     showLoader();

//     try {
//       const data = await getImagesByQuery(requestValue, page);

//       createGallery(data.hits);

      
//       const cardHeight = document.querySelector('.gallery .gallery-item')?.getBoundingClientRect().height || 0;
//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: 'smooth',
//       });

//       if (page >= Math.ceil(data.totalHits / PER_PAGE)) {
//         hideLoadMoreButton();
//         iziToast.info({
//           iconUrl: informSvg,
//           position: 'topRight',
//           message: "We're sorry, but you've reached the end of search results.",
//         });
//       }
//     } catch (err) {
//       iziToast.warning({
//         iconUrl: cautionSvg,
//         position: 'topRight',
//         message: 'Whoops, something went wrong! We gonna fix it soon.',
//       });
//     } finally {
//       hideLoader();
//     }
//   });
// }

