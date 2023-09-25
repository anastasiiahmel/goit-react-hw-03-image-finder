
import React, { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  
  handleKeyDown = (event) => {
    if (event.code === 'Escape' ) {
      this.props.onClose();
    }
  };
  handleOverlayClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() { 
    const { src, alt } = this.props;
    return (
      <Overlay>
        <div className="Overlay" onClick={this.handleOverlayClick}>
          <ModalStyled>
        <div className="Modal">
          <img src={src} alt={alt} className="img-modal"/>
            </div>
            </ModalStyled>
        </div>
        </Overlay>
    );
  }
}



