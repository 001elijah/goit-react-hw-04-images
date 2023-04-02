import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './Searchbar.module.scss';

const Searchbar = ({ searchbarToAppQuery }) => {

    const [query, setQuery] = useState('');

    const handleQuerySubmit = evt => {
        evt.preventDefault();
        if (query.trim() === '') {
            toast.error("Enter search query!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        };
        searchbarToAppQuery(query);
        setQuery('');
    };

    return (
        <header className={s.Searchbar}>
            <form onSubmit={handleQuerySubmit} className={s.SearchForm}>
                <button type="submit" className={s.SearchFormButton}>
                <span className={s.SearchForButtonLabel}>Search</span>
                </button>
    
                <input
                className={s.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={query}
                onChange={evt => setQuery(evt.currentTarget.value.toLowerCase())}
                />
            </form>
        </header>
    );
};

export default Searchbar;

// self state to push input search query to App