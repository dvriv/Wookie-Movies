import Mainheader from '../components/MainHeader';
import { useLoaderData } from 'react-router-dom';
import type { Movie } from '../services/movies.services';

function MovieDetails() {
    const movieData = useLoaderData() as Movie;
    console.log(movieData);

    return (
        <>
            <Mainheader />
            <div className="movie-page">
                <div>
                    <img src={movieData.poster}></img>
                </div>
                <div>
                    <h1>{movieData.title}</h1>
                    <span>{movieData.imdb_rating}</span>
                </div>
                <div>
                    <span>{new Date(movieData.released_on).getFullYear()}</span>
                    <span>{movieData.length}</span>
                    <span>{movieData.director}</span>
                </div>
                <div>
                    <span>Cast: {movieData.cast}</span>
                </div>
                <div>
                    <p>{movieData.overview}</p>
                </div>
            </div>
        </>
    );
}

export default MovieDetails;
