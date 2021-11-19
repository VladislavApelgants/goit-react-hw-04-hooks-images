import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRef = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
  }

  closeByEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeByClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.closeByClick}>
        <div className="Modal">
          <img src={this.props.img} alt={this.props.alt} />
        </div>
      </div>,
      modalRef,
    );
  }
}

Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func,
};
