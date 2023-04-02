import { Component, createRef } from "react"; // new scroll
import PropTypes from 'prop-types';
// import * as Scroll from 'react-scroll';
import { toast } from 'react-toastify';

import fetchPicturesWithQuery from "../../services/api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import s from './ImageGallery.module.scss';

const customId = "custom-id-yes";

class ImageGallery extends Component {

    static propTypes = {
        query: PropTypes.string.isRequired
    };

    state = {
        query: '',
        pictures: null,
        page: 1,
        isLoading: false,
        error: null,
        endOfCollection: false,
        modalData: null
    };

    galleryItemRef = createRef(); // new scroll, get reference

    static getDerivedStateFromProps(props, state) {
        if (state.query !== props.query) {
          return { page: 1, query: props.query };
        };
        return null;
    };

    componentDidMount() {
        this.notify('Type in your search query...');
    };

    async componentDidUpdate(prevProps, prevState) {
        const { page, query, pictures } = this.state;
        if (
          (prevProps.query !== query && query !== '') ||
          (prevState.page !== page && page !== 1)
        ) {
            this.setPics();
        }
        if (prevState.pictures !== pictures) { // new scroll
            this.galleryItemRef.current?.scrollIntoView({ // new scroll
                behavior: "smooth", // new scroll
                block: "start", // new scroll
            }); // new scroll
        }; // new scroll
    };

    setPics = async () => {
        const { page, query, pictures: picturesInState } = this.state;
        this.setState({ isLoading: true, error: null, endOfCollection: false });
    
        try {
          const pictures = await fetchPicturesWithQuery(query, page);
          if (pictures.length === 0 && page === 1 && !this.state.endOfCollection) {
            throw new Error("No pictures found");
          };
          if (pictures.length < 12 && picturesInState) {
            this.setState({ endOfCollection: true });
            this.notify("That's all! Try another query.");
            // return;
          };
          this.setState((prevState) => ({
            pictures: page === 1 ? pictures : [...prevState.pictures, ...pictures],
          }));
        //   const scroll = Scroll.animateScroll;
        //   if (page > 1) {
        //     setTimeout(() => {
        //         scroll.scrollToBottom();
        //     }, 500);
        //   };
        } catch (error) {
          this.setState({ error: error.message });
          this.notify(`Error: ${error.message}!`);
        } finally {
          this.setState({ isLoading: false });
        }
    };

    changePage = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    };

    openModal = (modalData) => {
        this.setState({ modalData });
    };

    closeModal = () => {
        this.setState({ modalData: null });
    };

    notify = (message) => {
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

    render () {
        const { pictures, error, isLoading, endOfCollection, modalData, itemsAmount = 12 } = this.state;
        return (
            <>
                {modalData && <Modal {...modalData} closeModal={this.closeModal}/>}
                {error ? this.notify(`Error: ${error}!`) :
                    <>
                        <ul className={s.ImageGallery}>
                                {pictures && pictures.map((picture, idx, arr) => {
                                        return <ImageGalleryItem
                                            key={picture.id}
                                            refInstance={arr.length - itemsAmount === idx} // new scroll get reference
                                            galleryItemRef={this.galleryItemRef}
                                            smallPictureUrl={picture.webformatURL}
                                            largePictureUrl={picture.largeImageURL}
                                            openModal={this.openModal}
                                        />
                                        }
                                    )
                                }
                        </ul>
                        {(pictures && !endOfCollection) && <Button onClickProp={this.changePage} isLoading={isLoading}/>}
                    </>
                }
            </>
        );
    };
};

export default ImageGallery;

// http requests here