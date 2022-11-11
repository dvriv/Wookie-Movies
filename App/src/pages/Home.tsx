import MainHeader from '../components/MainHeader';
import { useLoaderData, Link } from 'react-router-dom';
import type { Movies } from '../services/movies.services';

function Home() {
    const movies = useLoaderData() as { [k: string]: Movies };
    const noResults = Array.isArray(movies) && !movies.length;
    return (
        <div className="main-container min-h-full h-full flex flex-col ">
            <MainHeader />
            <div className="homepage-page flex flex-col grow items-center text-center bg-slate-800 text-slate-50">
                {noResults ? (
                    <div className="grow flex items-center content-center">
                        <h1 className="text-4xl"> No movies found</h1>
                    </div>
                ) : (
                    Object.keys(movies).map((genreTitle) => (
                        <div className="mt-5" key={genreTitle}>
                            <h1 className="text-3xl">{genreTitle}</h1>
                            <div className="flex flex-row flex-wrap gap-6 justify-center">
                                {movies[genreTitle].map((movie) => (
                                    <div
                                        className="my-5 hover:border-slate-300 hover:border-solid hover:border-2"
                                        key={movie.slug}
                                    >
                                        <Link
                                            className="my-5"
                                            to={'/movie/' + movie.slug}
                                        >
                                            <div>
                                                <p>
                                                    {movie.title} {' ('}
                                                    {new Date(
                                                        movie.released_on
                                                    ).getFullYear()}
                                                    {')'}
                                                </p>
                                                <img src={movie.poster}></img>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
