import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from './js/loadImgService';
import renderCardImg from './template/newImg.hbs';

const refs = {
  searchFormEl: document.getElementById('search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const pixabayApiService = new PixabayApiService();

refs.searchFormEl.addEventListener('submit', onBtnSearchClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreDtnClick);

function onBtnSearchClick(e) {
  e.preventDefault();

  pixabayApiService.searchQueryF = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  pixabayApiService.axiosImg().then(rendersAllCards);
}

function onLoadMoreDtnClick(e) {
  e.preventDefault();
  pixabayApiService.axiosImg().then(rendersAllCards);
}

Notify.failure(
  'Sorry, there are no images matching your search query. Please try again.'
);

function rendersAllCards(array) {
  refs.galleryEl.insertAdjacentHTML('beforeend', renderCardImg(array));
}
