import searchicon from '../assets/search-icon.svg';
import { Form } from 'react-router-dom';

function SearchBar() {
    return (
        <div className="search-bar basis-full sm:basis-1/6 m-0 sm:ml-auto sm:flex">
            <Form
                className="flex flex-col sm:flex-row items-center justify-center"
                method="get"
                action="/search"
            >
                <input
                    className="basis-1/1 px-1 h-8 w-5/6 sm:w-64"
                    type="search"
                    name="q"
                ></input>
                <button type="submit" className="basis-1/2">
                    <img
                        className="max-w-none"
                        alt="search-icon"
                        src={searchicon}
                        width="30px"
                        height="30px"
                    ></img>
                </button>
            </Form>
        </div>
    );
}

export default SearchBar;
