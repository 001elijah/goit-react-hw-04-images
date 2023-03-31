import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.scss';

function ImageGalleryItem({ smallPictureUrl, largePictureUrl, openModal, refInstance, galleryItemRef }) {
    return (
        <li className={s.ImageGalleryItem} onClick={() => openModal({ largePictureUrl })}
            ref={refInstance ? galleryItemRef : null} // new scroll get reference
        >
            <img src={smallPictureUrl} alt="" data-large={largePictureUrl} className={s.ImageGalleryItemImage}/>
        </li>
    );
};

ImageGalleryItem.propTypes = {
    smallPictureUrl: PropTypes.string.isRequired,
    largePictureUrl: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
};

export default ImageGalleryItem;