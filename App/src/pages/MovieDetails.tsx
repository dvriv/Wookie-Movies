import MainHeader from '../components/MainHeader';
import { useLoaderData } from 'react-router-dom';
import type { Movie } from '../services/movies.services';
import { Rating } from 'react-simple-star-rating';

function MovieDetails() {
    const movieData = useLoaderData() as Movie;

    return (
        <div className="main-container min-h-full h-full flex flex-col">
            <MainHeader />
            <div
                className="bg-no-repeat bg-cover bg-transparent text-slate-50 grow flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(173deg, rgba(97,97,97,0.4962185557816877) 0%, rgba(0,17,89,1) 100%), url("${movieData.backdrop}")`,
                }}
            >
                <div className="flex flex-col sm:flex-row  h-1/2 w-11/12 lg:w-2/3 items-center justify-center">
                    <div className="image-container h-full w-1/2 mr-2 items-center justify-center flex basis-1/4">
                        <img className="my-2" src={movieData.poster}></img>
                    </div>
                    <div className="data-container ml-2 basis-3/4">
                        <Rating
                            className="flex"
                            initialValue={Number(movieData.imdb_rating) / 2}
                            allowHover={false}
                            SVGclassName="inline-block"
                            readonly={true}
                            allowFraction={true}
                        />
                        <div className="text-base font-bold lg:text-3xl">
                            <h1 className="inline mr-2">{movieData.title}</h1>
                            <span>-</span>
                            <span className="inline ml-2">
                                {movieData.imdb_rating}
                            </span>
                        </div>
                        <div>
                            <span className="inline">
                                {new Date(movieData.released_on).getFullYear()}
                            </span>
                            <span className="inline ml-2">-</span>
                            <span className="inline ml-2">
                                {movieData.length}
                            </span>
                            <span className="inline ml-2">-</span>
                            <span className="inline list-none inline]">
                                {Array.isArray(movieData.director) ? (
                                    movieData.director.map(
                                        (director, index) => (
                                            <span
                                                className="inline"
                                                key={director}
                                            >
                                                {index ===
                                                movieData.director.length -
                                                    1 ? (
                                                    <span className="ml-2">
                                                        {director}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span className="ml-2">
                                                            {director}
                                                        </span>
                                                        <span className="ml-2">
                                                            -
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        )
                                    )
                                ) : (
                                    <span className="ml-2">
                                        {movieData.director}
                                    </span>
                                )}
                            </span>
                        </div>
                        <div>
                            <span>Cast: </span>
                            <span className="inline">
                                {Array.isArray(movieData.cast) ? (
                                    movieData.cast.map((cast, index) => (
                                        <span className="inline" key={cast}>
                                            {index ===
                                            movieData.cast.length - 1 ? (
                                                <span className="ml-2">
                                                    {cast}
                                                </span>
                                            ) : (
                                                <>
                                                    <span className="ml-2">
                                                        {cast}
                                                    </span>
                                                    <span className="ml-2">
                                                        -
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    ))
                                ) : (
                                    <span className="ml-2">
                                        {movieData.cast}
                                    </span>
                                )}
                            </span>
                        </div>
                        <div>
                            <p>{movieData.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
