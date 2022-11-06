import searchicon from '../assets/search-icon.svg';
import { Form } from 'react-router-dom';

function SearchBar() {
    return (
        <div className="search-bar">
            <Form method="get" action="/search">
                <label>
                    <img alt="search-icon" src={searchicon}></img>
                </label>
                <input type="search" name="q"></input>
            </Form>
        </div>
    );
}

export default SearchBar;
