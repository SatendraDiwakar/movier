import {
  SEARCH_MOVIE_BASE_URL,
  SEARCH_TV_BASE_URL,
  API_URL,
  API_KEY,
} from './config';

const apiSettings = {
  fetchSearch: async (medType, searchTerm, page) => {
    const endpoint = (searchTerm && (medType==='movie'))
      ? `${SEARCH_MOVIE_BASE_URL}${searchTerm}&page=${page}`
      : `${SEARCH_TV_BASE_URL}${searchTerm}&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMedia: async (mediaId, medType) => {
    const endpoint = `${API_URL}${medType}/${mediaId}?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchSimilarMedia: async (mediaId, medType) => {
    const endpoint = `${API_URL}${medType}/${mediaId}/similar?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchTrending: async (medType) => {
    const endpoint = medType ?
      `${API_URL}trending/${medType}/week?api_key=${API_KEY}`
      : `${API_URL}trending/all/week?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMediaImages: async (mediaId, medType) => {
    const endpoint = `${API_URL}${medType}/${mediaId}/images?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMediaVideo: async (mediaId, medType) => {
    const endpoint = `${API_URL}${medType}/${mediaId}/videos?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchCredits: async (mediaId, medType) => {
    const creditsEndpoint = `${API_URL}${medType}/${mediaId}/credits?api_key=${API_KEY}`;
    return await (await fetch(creditsEndpoint)).json();
  }
};

export default apiSettings;
