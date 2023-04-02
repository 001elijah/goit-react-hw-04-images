import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from 'prop-types';

import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modalRoot');

const Modal = ({ largePictureUrl, closeModal }) => {

    useEffect(() => {
        window.addEventListener('keydown', closeModalWithEsc);
        document.documentElement.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', closeModalWithEsc);
            document.documentElement.style.overflow = 'unset';
        };
    }, []);

    const closeModalWithEsc = (evt) => {
        if (evt.code === "Escape") {
            this.props.closeModal();
        };
    };
    
    return createPortal(
        <div className={s.Overlay} onClick={() => closeModal()}>
            <div className={s.Modal}>
                <img src={largePictureUrl} alt="" />
            </div>
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    largePictureUrl: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default Modal;