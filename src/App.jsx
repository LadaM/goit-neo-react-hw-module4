import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { searchPhotos } from './api/unsplashApi';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import { toast, Toaster } from 'react-hot-toast';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageSearchResult, setImageSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!searchQuery) return;  // Don't fetch if the query is empty

      setLoading(true);
      setError(null);
      try {
        const data = await searchPhotos(searchQuery);
        toast.success(`Found ${data.total} images`);
        setImageSearchResult(data.results);  // Set the imageSearchResult in state
      } catch (err) {
        toast.error(`Failed to fetch imageSearchResult: ${err.message}`);
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
      <div><Toaster /></div>
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      {loading && <p>Loading...</p>}
      {imageSearchResult && <ImageGallery images={imageSearchResult} />}
    </>
  );
}

export default App;
