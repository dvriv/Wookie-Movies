import searchicon from '../assets/search-icon.svg';

function SearchBar() {
    return (
        <div className="search-bar">
            <label>
                <img alt="search-icon" src={searchicon}></img>
            </label>
            <input type="search"></input>
        </div>
    );
}

export default SearchBar;
