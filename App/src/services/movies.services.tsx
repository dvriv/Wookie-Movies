export type Movie = {
    backdrop: string;
    cast: [];
    classification: string;
    director: string;
    genres: string[];
    id: string;
    imdb_rating: number;
    length: string;
    overview: string;
    poster: string;
    released_on: string;
    slug: string;
    title: string;
};

export type Movies = Movie[];

const fetchMovies: (
    query?: string | undefined | null
) => Promise<Movies> = async (query) => {
    const response = await fetch(
        `https://wookie.codesubmit.io/movies${query ? '?q=' + query : ''}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer Wookie2021',
            },
        }
    );
    const movies = await response.json();
    if (movies.length === 0) return movies;
    return movies?.movies;
};

// This function group the movies with all its data by genre also repeating movies that share genres
export const getMoviesPerGenre = async (
    query: string | undefined | null = ' '
) => {
    try {
        const movies: Movie[] = await fetchMovies(query);

        if (movies.length === 0) {
            return [];
        }

        // This gets all unique genres on that query using a Set
        const uniqueGenres = new Set(
            movies.map((movie: Movie) => movie.genres).flat()
        );

        // And this constructs the object grouping all the movies per each genre
        const moviesByGenre: {
            [k: string]: Movies;
        } = Object.fromEntries(
            Array.from(uniqueGenres, (genreName) => [
                genreName,
                movies.filter((movie) => {
                    if (movie.genres.includes(genreName)) return movie;
                }),
            ])
        );
        return moviesByGenre;
    } catch (e) {
        throw Error('Error on API request');
    }
};
