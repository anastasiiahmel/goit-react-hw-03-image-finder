
import React, { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  
  handleKeyDown = (evt) => {
    if (evt.code === 'Escape' ) {
      this.props.onClose();
    }
  };
  handleOverlayClick = (evt) => {
    if (evt.target) {
      this.props.onClose();
    }
    console.log(this.handleOverlayClick());
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



