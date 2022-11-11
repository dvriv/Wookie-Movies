import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function MainHeader() {
    return (
        <div className="header-container w-full">
            <div className="main-header flex flex-col sm:flex-row bg-sky-900 border-solid border-b-2 border-sky-800">
                <Link
                    to="/"
                    className="text-center self-center basis-full sm:basis-1/6 ml-2"
                >
                    <h1 className="text-3xl font-bold text-slate-50">
                        WOOKIE MOVIES
                    </h1>
                </Link>
                <SearchBar />
            </div>
        </div>
    );
}

export default MainHeader;
