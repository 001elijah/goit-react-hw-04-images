import { Oval } from 'react-loader-spinner';

const Loader = () => {
    return <Oval
        ariaLabel="loading-indicator"
        height={10}
        width={10}
        strokeWidth={1}
        strokeWidthSecondary={2000}
        color="white"
        secondaryColor="white"
    />
};

export default Loader;