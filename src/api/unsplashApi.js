import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID AbxwzioLFd-aXTDTzutpEipLGw7r7jy0Q_TTQ4LZHN0`,
  },
});

export const searchPhotos = async (query, page = 1, perPage = 10) => {
  if (!query) {
    throw new Error('Please enter a search query');
  }
  try {
    const response = await unsplashApi.get('/search/photos', {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    if (response && response.data) {
      return {
        total: response.data.total,
        results: response.data.results,
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    // re-throw the error with humanized error message
    humanizeError(error);
  }
}

export const getPhotoById = async (id) => {
  if (!id) {
    throw new Error('No ID provided');
  }
  try {
    const response = await unsplashApi.get(`/photos/${id}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('No photo found with the provided ID'); // the error is re-thrown in the catch block
    }
  } catch (error) {
    // re-throw the error with humanized error message
    humanizeError(error);
  }
};


function humanizeError(error) {
  if (error.response) {
    throw new Error(`Error: ${error.response.status} - ${error.response.data.errors.join(', ')}`);
  } else if (error.request) {
    throw new Error('Network error, please try again later.');
  } else {
    throw new Error('An unexpected error occurred.');
  }
}
