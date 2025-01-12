import axios from 'axios';

class SearchService {
  constructor() {
    this.search = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getClubsByHour() {
    return this.search.get('/search').then(({ data: clubs }) => clubs);
  }

  dataPicker(search) {
    const { searchStartingHour, date } = search;
    return this.search.post('/search', { searchStartingHour, date }).then(({ data }) => {
      return data;
    });
  }

  getClubs(query) {
    return this.search.post('/search', { query }).then(({ data }) => data);
  }
}

const searchService = new SearchService();

export default searchService;
