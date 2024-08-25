import css from './LoadMoreBtn.module.css';
import React from 'react';

const LoadMoreBtn = ({ onClick, loading }) => {
  return (
    <button onClick={onClick} disabled={loading} className={css.loadMoreButton}>
      {loading ? 'Loading...' : 'Load More'}
    </button>);
};

export default LoadMoreBtn;
