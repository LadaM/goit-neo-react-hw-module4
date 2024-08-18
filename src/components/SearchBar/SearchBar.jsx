import css from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <header>
      <form className={css.container}>
        <input
          type="text"
          className={css.input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;