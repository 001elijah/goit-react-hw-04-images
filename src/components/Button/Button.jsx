import s from "./Button.module.scss";

import PropTypes from 'prop-types';

import Loader from "../Loader/Loader";

const Button = ({ onClickProp, isLoading }) => {


    return (
        <button type="button" className={s.Button} onClick={onClickProp}>
            Load more {isLoading && <Loader/>}
        </button>
    );
};

Button.propTypes = {
    onClickProp: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default Button;