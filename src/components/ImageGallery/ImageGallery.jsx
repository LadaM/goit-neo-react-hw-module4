import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageCard from './ImageCard.jsx';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.container}>
      {/* TODO: extract image card component */}
      {images.map(image => (
        <li key={image.id}  className={css.card}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ImageGallery;