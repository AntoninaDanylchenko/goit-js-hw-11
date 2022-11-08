import PixabayApiService from './js/loadImgService';
import renderCardImg from './template/newImg.hbs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchFormEl: document.getElementById('search-form'),
  galleryEl: document.querySelector('.gallery'),
};
const simple = new SimpleLightbox('.gallery a');

const pixabayApiService = new PixabayApiService();

refs.searchFormEl.addEventListener('submit', onBtnSearchClick);

window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    loadMoreImg();
  }
});

function onBtnSearchClick(e) {
  e.preventDefault();

  pixabayApiService.searchQueryW =
    e.currentTarget.elements.searchQueryName.value;

  pixabayApiService.resetPage();
  refs.galleryEl.innerHTML = '';

  loadMoreImg();
}

async function loadMoreImg() {
  try {
    const response = await pixabayApiService.fetchingAxiosImg();
    return rendersAllCards(response);
  } catch (error) {
    console.log(error.message);
  }
}

function rendersAllCards(array) {
  refs.galleryEl.insertAdjacentHTML('beforeend', renderCardImg(array));
  simple.refresh();
  // const { height: cardHeight } = document
  //   .querySelector('.gallery')
  //   .firstElementChild.getBoundingClientRect();
  // console.log(cardHeight);
  // window.scrollBy({
  //   top: cardHeight,
  //   behavior: 'smooth',
  // });
}
