import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { searchPhotos } from './api/unsplashApi';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageSearchResult, setImageSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!searchQuery) return;  // Don't fetch if the query is empty

      setLoading(true);
      setError(null);
      try {
        const data = await searchPhotos(searchQuery);
        console.log(data);
        setImageSearchResult(data.results);  // Set the imageSearchResult in state
      } catch (err) {
        setError('Failed to fetch imageSearchResult');
      } finally {
        setLoading(false);
      }
    };
    // fetching photos when searchQuery changes
    fetchPhotos();
  }, [searchQuery]);

  useEffect(() => {
    console.dir(imageSearchResult); //TODO remove the log
  }, [imageSearchResult]);


  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {imageSearchResult && <ImageGallery images={imageSearchResult} />}
    </>
  );
}

export default App;
