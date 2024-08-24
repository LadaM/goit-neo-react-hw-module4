import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { searchPhotos, getPhotoById } from './api/unsplashApi';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { toast, Toaster } from 'react-hot-toast';
import { Hourglass } from 'react-loader-spinner';
import css from './App.module.css';
import ImageModal from './components/ImageModal/ImageModal.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageSearchResult, setImageSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!searchQuery) return;

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
      {loading && (
        <div className={css.loaderContainer}>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </div>
      )}
      {imageSearchResult && (
        <ImageGallery images={imageSearchResult} onImageClick={handleImageClick} />
      )}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage} />
    </>
  );
}

export default App;
