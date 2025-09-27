// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryElem = document.querySelector(".gallery");
const loaderElem = document.querySelector(".loader");
const btnLoadElem = document.querySelector(".btn-load");

 const lightbox = new SimpleLightbox(".gallery a", {
      captions: true,
      captionsData: "alt",
      captionDelay: 250,
    });


export function  createGallery(images) {
  const markup = images
    .map(img => 
    `<li class="gallery-item">
        <a class="img-link" href="${img.largeImageURL}">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <ul class="img-list">
          <li class="img-item">
            <h3 class="img-title">Likes</h3>
            <p class="img-text">${img.likes}</p>
          </li>
          <li class="img-item">
            <h3 class="img-title">Views</h3>
            <p class="img-text">${img.views}</p>
          </li>
          <li class="img-item">
            <h3 class="img-title">Comments</h3>
            <p class="img-text">${img.comments}</p>
          </li>
          <li class="img-item">
            <h3 class="img-title">Downloads</h3>
            <p class="img-text">${img.downloads}</p>
          </li>
        </ul>
      </li>`
).join('');

galleryElem.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
}

export function clearGallery() {
  galleryElem.innerHTML = '';
}

export function showLoader() {
  loaderElem.classList.remove("visually-hidden");
}

export function hideLoader() {
  loaderElem.classList.add("visually-hidden");
}

// Load more btn
export function showLoadMoreButton() {
    if (btnLoadElem) btnLoadElem.classList.remove('visually-hidden');
}
export function hideLoadMoreButton() {
    if (btnLoadElem) btnLoadElem.classList.add('visually-hidden');
}




