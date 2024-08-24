import axios from 'axios';

// Create an Axios instance with default settings
const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID AbxwzioLFd-aXTDTzutpEipLGw7r7jy0Q_TTQ4LZHN0`,
  },
});

// Function to search photos with pagination and basic error handling
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
    handleError(error);
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
      throw new Error('No photo found with the provided ID');
    }
  } catch (error) {
    handleError(error);
  }
};


function handleError(error) {
  if (error.response) {
    console.error('Error Response:', error.response.data);
    throw new Error(`Error: ${error.response.status} - ${error.response.data.errors.join(', ')}`);
  } else if (error.request) {
    console.error('Error Request:', error.request);
    throw new Error('Network error, please try again later.');
  } else {
    console.error('Error Message:', error.message);
    throw new Error('An unexpected error occurred.');
  }
}
