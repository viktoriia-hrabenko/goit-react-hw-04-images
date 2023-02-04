import css from '../Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {
  const handleSubmit = e => {
    const queryValue = e.target.searchQuery.value;
    e.preventDefault();
    if (queryValue.trim() === '') {
      return alert('Please enter something:)');
    }
    onSubmit(queryValue.toLowerCase());
  };

    return (
      <header className={css.Searchbar}>
        <form onSubmit={handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}></button>

          <input
            className={css.SearchFormInput}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};