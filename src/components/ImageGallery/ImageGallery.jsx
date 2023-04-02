import { useRef, createRef, useEffect, useState } from "react"; // new scroll
import PropTypes from 'prop-types';
// import * as Scroll from 'react-scroll';
import { toast } from 'react-toastify';

import fetchPicturesWithQuery from "../../services/api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import s from './ImageGallery.module.scss';

const customId = "custom-id-yes";

const ImageGallery = ({ queryProp }) => {

    const [query, setQuery] = useState('');
    const [pictures, setPictures] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [endOfCollection, setEndOfCollection] = useState(false);
    const [modalData, setModalData] = useState(null);
    const itemsAmount = 12;

    const galleryItemRef = createRef(); // new scroll, get reference

    if (query !== queryProp) {
        setPage(1);
        setQuery(queryProp);
    };

    useEffect(() => {
        notify('Type in your search query...');
    }, []);

    const prevQueryProp = usePrevious(queryProp);
    const prevPage = usePrevious(page);
    const prevPictures = usePrevious(pictures);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        },[value]);
        return ref.current;
    };

    useEffect(() => {
        const setPics = async () => {

            setIsLoading(true);
            setError(null);
            setEndOfCollection(false);
        
            try {
              const newPictures = await fetchPicturesWithQuery(query, page);
              if (newPictures.length === 0 && prevQueryProp !== query) {
                throw new Error("No pictures found");
              };
              if (newPictures.length < 12 && pictures && prevQueryProp === query) {
                setEndOfCollection(true);
                notify("That's all! Try another query.");
                // return;
              };
              setPictures(page === 1 ? newPictures : [...prevPictures, ...newPictures]);
            //   const scroll = Scroll.animateScroll;
            //   if (page > 1) {
            //     setTimeout(() => {
            //         scroll.scrollToBottom();
            //     }, 500);
            //   };
            } catch (error) {
                setError(error.message);
                notify(`Error: ${error.message}!`);
                setEndOfCollection(false);
            } finally {
                setIsLoading(false);
            }
        };
        if (
            (prevQueryProp !== query && query !== '') ||
            (prevPage !== page && page !== 1)
          ) {
              setPics();
          }
          if (prevPictures !== pictures) { // new scroll
              galleryItemRef.current?.scrollIntoView({ // new scroll
                  behavior: "smooth", // new scroll
                  block: "start", // new scroll
              }); // new scroll
          }; // new scroll
    }, [page, query, pictures, prevQueryProp, prevPage, prevPictures, galleryItemRef, endOfCollection]);

    const changePage = () => {
        setPage(prevPage + 1);
    };

    const openModal = (modalData) => {
        setModalData(modalData);
    };

    const closeModal = () => {
        setModalData(null);
    };

    const notify = (message) => {
        switch (message) {
            case "Type in your search query...":
                toast.info(message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    toastId: customId,
                    autoClose: 2000,
                });
                break;
            case "That's all! Try another query.":
                toast.warning(message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    toastId: customId,
                    autoClose: 3000,
                });
                break;
            default:
                toast.error(message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    toastId: customId,
                    autoClose: 5000,
                    theme: "colored"
                });
                break;
        };
        
    };


    // const { pictures, error, isLoading, endOfCollection, modalData, itemsAmount = 12 } = this.state;
    return (
        <>
            {modalData && <Modal {...modalData} closeModal={closeModal}/>}
            {error ? notify(`Error: ${error}!`) :
                <>
                    <ul className={s.ImageGallery}>
                            {pictures && pictures.map((picture, idx, arr) => {
                                    return <ImageGalleryItem
                                        key={picture.id}
                                        refInstance={arr.length - itemsAmount === idx} // new scroll get reference
                                        galleryItemRef={galleryItemRef}
                                        smallPictureUrl={picture.webformatURL}
                                        largePictureUrl={picture.largeImageURL}
                                        openModal={openModal}
                                    />
                                    }
                                )
                            }
                    </ul>
                    {(pictures && !endOfCollection) && <Button onClickProp={changePage} isLoading={isLoading}/>}
                </>
            }
        </>
    );
};

ImageGallery.propTypes = {
    queryProp: PropTypes.string.isRequired
};

export default ImageGallery;