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
      // Handle specific error types
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error Response:', error.response.data);
        throw new Error(`Error: ${error.response.status} - ${error.response.data.errors.join(', ')}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error Request:', error.request);
        throw new Error('Network error, please try again later.');
      } else {
        // Something else happened while setting up the request
        console.error('Error Message:', error.message);
        throw new Error('An unexpected error occurred.');
      }
    }
  }
;

export default unsplashApi;
