import css from './LoadMoreBtn.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ onClick, loading }) => {
  return (
    <button onClick={onClick} disabled={loading} className={css.loadMoreButton}>
      {loading ? 'Loading...' : 'Load More'}
    </button>);
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoadMoreBtn;
