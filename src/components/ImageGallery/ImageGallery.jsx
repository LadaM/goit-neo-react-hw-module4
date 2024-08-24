import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageCard from './ImageCard.jsx';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.container}>
      {images.map(image => (
        <li key={image.id}  className={css.card} onClick={() => onImageClick(image.id)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;