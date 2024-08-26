import css from './SearchBar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const onSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    let query = event.currentTarget.elements.query.value.trim();
    if (!query) {
      toast.error('Please enter a search query');
      return;
    }
    setSearchQuery(query);
    event.currentTarget.reset();
  };

  return (
    <header className={css.header}>
      <h1 className={css.title}>Search images</h1>
      {searchQuery && <p className={css.query}>{searchQuery}</p>}
      <form className={css.container} onSubmit={onSubmit}>
        <input
          type="text"
          className={css.input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
          name="query"
        />
        <button type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
