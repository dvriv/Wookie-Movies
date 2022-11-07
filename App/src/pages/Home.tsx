import Mainheader from '../components/MainHeader';
import { useLoaderData, Link } from 'react-router-dom';
import type { Movies } from '../services/movies.services';

function Home() {
    const movies = useLoaderData() as { [k: string]: Movies };
    return (
        <>
            <Mainheader />
            <div className="homepage-page">
                <>
                    {Object.keys(movies).map((genreTitle) => (
                        <div key={genreTitle}>
                            <h1>{genreTitle}</h1>
                            <div>
                                {movies[genreTitle].map((movie) => (
                                    <div key={movie.slug}>
                                        <Link to={'/movie/' + movie.slug}>
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
                    ))}
                </>
            </div>
        </>
    );
}

export default Home;
