import {
  SEARCH_BASE_URL,
  SEARCH_TV_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL
} from './config';

const defaultConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const apiSettings = {
  fetchSearch: async (medType, searchTerm, page) => {
    const endpoint = (searchTerm && (medType==='movie'))
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
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
  },
  // Bonus material below for login
  getRequestToken: async () => {
    const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
    return reqToken.request_token;
  },
  authenticate: async (requestToken, username, password) => {
    const bodyData = {
      username,
      password,
      request_token: requestToken
    };
    // First authenticate the requestToken
    const data = await (
      await fetch(LOGIN_URL, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
    // Then get the sessionId with the requestToken
    if (data.success) {
      const sessionId = await (
        await fetch(SESSION_ID_URL, {
          ...defaultConfig,
          body: JSON.stringify({ request_token: requestToken })
        })
      ).json();
      return sessionId;
    }
  },
  rateMovie: async (sessionId, movieId, value) => {
    const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

    const rating = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify({ value })
      })
    ).json();

    return rating;
  }
};

export default apiSettings;
