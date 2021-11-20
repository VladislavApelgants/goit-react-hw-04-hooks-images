import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRef = document.querySelector('#modal-root');

export default function Modal({ img, alt, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', closeByEscape);

    return function cleanup() {
      return window.removeEventListener('keydown', closeByEscape);
    };
  });

  function closeByEscape(e) {
    console.log(e.code);
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function closeByClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className="Overlay" onClick={closeByClick}>
      <div className="Modal">
        <img src={img} alt={alt} />
      </div>
    </div>,
    modalRef,
  );
}

Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func,
};
