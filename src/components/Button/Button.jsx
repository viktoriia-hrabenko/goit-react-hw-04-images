import PropTypes from 'prop-types';
import css from '../Button/Button.module.css';

export const Button = ({ onloadMore }) => {
  return (
      <div className={css.ButtonContainer} onClick={onloadMore}>
      <button type="button" className={css.Button}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};
