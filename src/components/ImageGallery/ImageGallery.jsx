import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  return (
    <ul>
      {/* TODO: extract image card component */}
      {images.map(image => (
        <li key={image.id}>
          <div>
          <img src={image.urls.small} alt={image.alt_description} />
          </div>
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ImageGallery;