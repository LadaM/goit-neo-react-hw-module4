import PropTypes from 'prop-types';

const ImageCard = ({ image }) => {
  return (
      <img src={image.urls.small} alt={image.alt_description} />
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageCard;