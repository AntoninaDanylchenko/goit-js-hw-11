import axios from 'axios';
import { Notify } from 'notiflix';

export default class PixabayApiService {
  constructor() {
    this.searchQueryW = '';
    this.paginationPage = 1;
  }

  fetchingAxiosImg() {
    return axios({
      url: 'https://pixabay.com/api/',
      params: {
        key: '30996005-ea40810ea94cfe1a7fe206b35',
        q: this.searchQueryW,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: this.paginationPage,
      },
    })
      .then(r => {
        this.addsNotification(r.data.totalHits);
        this.incrementPage();
        return r.data.hits;
      })
      .catch(e => console.error(e));
  }

  incrementPage() {
    this.paginationPage += 1;
  }

  resetPage() {
    this.paginationPage = 1;
  }

  addsNotification(value) {
    if (this.paginationPage === 1 && value !== 0) {
      Notify.success(`Hooray! We found ${value} images.`);
    }
    if (value === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (Math.floor(value / 40) + 1 < this.paginationPage) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  }
}
