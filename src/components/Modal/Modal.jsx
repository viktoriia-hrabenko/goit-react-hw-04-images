import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal}>
        <img className={css.ModalImage} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};