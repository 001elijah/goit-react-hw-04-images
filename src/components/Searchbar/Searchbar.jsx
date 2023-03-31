import { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './Searchbar.module.scss';

class Searchbar extends Component {

    state = {
        query: ''
    }

    handleQueryChange = evt => {
        this.setState({query: evt.currentTarget.value.toLowerCase()});
    };

    handleQuerySubmit = evt => {
        evt.preventDefault();
        if (this.state.query.trim() === '') {
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
        this.props.searchbarToAppQuery(this.state.query);
        this.setState({ query: '' });
    };


    
    render() {
        return (
            <header className={s.Searchbar}>
                <form onSubmit={this.handleQuerySubmit} className={s.SearchForm}>
                    <button type="submit" className={s.SearchFormButton}>
                    <span className={s.SearchForButtonLabel}>Search</span>
                    </button>
        
                    <input
                    className={s.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.query}
                    onChange={this.handleQueryChange}
                    />
                </form>
            </header>
        );
    };
};

export default Searchbar;

// self state to push input search query to App