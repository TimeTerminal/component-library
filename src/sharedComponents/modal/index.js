import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './styles.scss';

class Modal extends Component {
  constructor() {
    super();

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onDialogClick = this.onDialogClick.bind(this);
  }

  listenKeyboard(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.toggleModal();
    }
  }

  componentDidMount() {
    if (this.props.toggleModal) {
      window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  componentWillUnmount() {
    if (this.props.toggleModal) {
      window.removeEventListener(
        'keydown',
        this.listenKeyboard.bind(this),
        true
      );
    }
  }

  onOverlayClick() {
    this.props.toggleModal();
  }

  onDialogClick(event) {
    event.stopPropagation();
  }

  render() {
    const { title, component, isOpen, toggleModal } = this.props;
    const activeModalStyle = `${css.modal} ${css.isActive}`;

    return (
      <div className={isOpen ? activeModalStyle : css.modal}>
        <div className={css.modalBackground} onClick={this.onOverlayClick} />
        <div className={css.modalCard} onClick={this.onDialogClick}>
          <header className={css.modalCardHeader}>
            <p className={css.modalCardTitle}>{title}</p>
            <button onClick={toggleModal} className={css.close} />
          </header>
          <div className={css.modalCardBody}>{component}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  component: PropTypes.object,
};

export default Modal;
