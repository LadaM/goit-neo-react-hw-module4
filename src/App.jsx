import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { getPhotoById, searchPhotos } from './api/unsplashApi';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { toast, Toaster } from 'react-hot-toast';
import ImageModal from './components/ImageModal/ImageModal.jsx';
import Loader from './components/Loader/Loader.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';

const PER_PAGE = 16;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageSearchResult, setImageSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);  // State for current page
  const [perPage] = useState(PER_PAGE);  // State for results per page

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const data = await searchPhotos(searchQuery, page, perPage);
        if (page === 1) {
          setImageSearchResult(data.results);
          toast.success(`Found ${data.total} images`);
        } else {
          setImageSearchResult(prevResults => [...prevResults, ...data.results]);
        }
      } catch (err) {
        toast.error(`Failed to fetch images: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [searchQuery, page, perPage]);

  useEffect(() => {
    if (page > 1 && !loading && imageSearchResult) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [imageSearchResult, page, loading]);

  const handleImageClick = async (id) => {
    try {
      const image = await getPhotoById(id);
      setSelectedImage(image);
      setIsModalOpen(true);
    } catch (err) {
      toast.error(`Failed to fetch image: ${err.message}`);
    }
  };

  const handleSearchQueryChange = (query) => {
    const q = query.trim();
    if (!q) {
      toast.error('Please enter a search query');
      return;
    }
    setSearchQuery(q);
    setImageSearchResult(null);
    setPage(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <div><Toaster /></div>
      <SearchBar setSearchQuery={handleSearchQueryChange} searchQuery={searchQuery} />
      {loading && <Loader />}
      {imageSearchResult && (
        <>
          <ImageGallery images={imageSearchResult} onImageClick={handleImageClick} />
          <LoadMoreBtn onClick={loadMore} loading={loading} />
        </>
      )}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage} />
    </>
  );
}

export default App;
