import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { getPhotoById, searchPhotos } from './api/unsplashApi';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { toast, Toaster } from 'react-hot-toast';
import ImageModal from './components/ImageModal/ImageModal.jsx';
import Loader from './components/Loader/Loader.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageSearchResult, setImageSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!searchQuery) return;

      setImageSearchResult(null); // resetting the previous search results
      setLoading(true);
      try {
        const data = await searchPhotos(searchQuery);
        toast.success(`Found ${data.total} images`);
        setImageSearchResult(data.results);
      } catch (err) {
        toast.error(`Failed to fetch images: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [searchQuery]);

  const handleImageClick = async (id) => {
    try {
      const image = await getPhotoById(id);
      toast.success('Image loaded successfully');
      setSelectedImage(image);
      setIsModalOpen(true);
    } catch (err) {
      toast.error(`Failed to fetch image: ${err.message}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div><Toaster /></div>
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      {loading && <Loader />}
      {imageSearchResult && <ImageGallery images={imageSearchResult} onImageClick={handleImageClick} />}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage} />
    </>
  );
}

export default App;
