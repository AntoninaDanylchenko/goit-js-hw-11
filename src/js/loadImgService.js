import axios from 'axios';
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.paginationPage = 1;
  }

  axiosImg() {
    return axios({
      url: 'https://pixabay.com/api/',
      params: {
        key: '30996005-ea40810ea94cfe1a7fe206b35',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: this.paddingPage,
      },
    })
      .then(r => {
        this.incrementPage;
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

  get searchQueryF() {
    this.searchQuery;
  }

  set searchQueryF(newQuery) {
    this.searchQuery = newQuery;
  }
}
