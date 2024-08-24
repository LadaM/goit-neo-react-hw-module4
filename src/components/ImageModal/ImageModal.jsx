import React, { useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');
const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      {image ? (
        <>
          <img src={image.urls.regular} alt={image.alt_description} className={css.image} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  image: PropTypes.object,
};

export default ImageModal;
