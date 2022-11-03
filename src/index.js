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

  pixabayApiService.searchQueryW = e.currentTarget.searchQuery.value;
  pixabayApiService.resetPage();
  refs.galleryEl.innerHTML = '';
  pixabayApiService.axiosImg().then(rendersAllCards);
}

function onLoadMoreDtnClick(e) {
  e.preventDefault();
  pixabayApiService.axiosImg().then(rendersAllCards);
}

function rendersAllCards(array) {
  refs.galleryEl.insertAdjacentHTML('beforeend', renderCardImg(array));
}
