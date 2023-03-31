import { createPortal } from "react-dom";
import { Component } from "react";
import PropTypes from 'prop-types';

import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modalRoot');

class Modal extends Component {

    static propTypes = {
        largePictureUrl: PropTypes.string.isRequired,
        closeModal: PropTypes.func.isRequired
    };

    componentDidMount() {
        window.addEventListener('keydown', this.closeModalWithEsc);
        document.documentElement.style.overflow = 'hidden';
    };

    componentWillUnmount () {
        window.removeEventListener('keydown', this.closeModalWithEsc);
        document.documentElement.style.overflow = 'unset';
    };

    closeModalWithEsc = (evt) => {
        if (evt.code === "Escape") {
            this.props.closeModal();
        };
    };
    
    render() {
        const { largePictureUrl, closeModal } = this.props;
        return createPortal(
            <div className={s.Overlay} onClick={() => closeModal()}>
                <div className={s.Modal}>
                    <img src={largePictureUrl} alt="" />
                </div>
            </div>,
            modalRoot
        );
    };
};

export default Modal;