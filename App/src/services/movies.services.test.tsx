import { fetchMovie, getMoviesPerGenre } from './movies.services';
import {
    THREE_MOVIES_WITH_SAME_THREE_GENRE_EACH,
    THREE_MOVIES_WITH_DIFFERENT_THREE_GENRE_EACH,
    ONE_MOVIE_DETAILS,
} from './movies.services.mock';
import type { Movies } from './movies.services';

const unmockedFetch = global.fetch;

// Testing getMoviesPerGenre()
describe('using 3 movies that have the SAME three genre each', () => {
    beforeAll(
        () =>
            (global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () =>
                        Promise.resolve(
                            THREE_MOVIES_WITH_SAME_THREE_GENRE_EACH
                        ),
                })
            ) as jest.Mock)
    );

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    it('check if getting the correct unique genre', async () => {
        const moviesPerGenre = await getMoviesPerGenre();
        expect(Object.keys(moviesPerGenre)).toEqual([
            'Action',
            'Crime',
            'Drama',
        ]);
    });

    it('check if getting the correct total movies', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(Object.values(moviesPerGenre).flat().length).toEqual(9);
    });

    it('check if getting the correct total movies for the "Action" category', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(moviesPerGenre.Action.length).toEqual(3);
    });

    it('check if getting the correct total movies for the "Drama" category', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(moviesPerGenre.Drama.length).toEqual(3);
    });

    it('check if the slug names of all the movies for the Action category are correct', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(moviesPerGenre.Drama.map((movie) => movie.slug)).toEqual([
            'slug1',
            'slug2',
            'slug3',
        ]);
    });
});

describe('using 3 movies that have DIFFERENT three genre each', () => {
    beforeAll(
        () =>
            (global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () =>
                        Promise.resolve(
                            THREE_MOVIES_WITH_DIFFERENT_THREE_GENRE_EACH
                        ),
                })
            ) as jest.Mock)
    );

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    it('check if getting the correct unique genre', async () => {
        const moviesPerGenre = await getMoviesPerGenre();
        expect(Object.keys(moviesPerGenre)).toEqual([
            'Genre1',
            'Genre2',
            'Genre3',
            'Genre4',
            'Genre5',
            'Genre6',
            'Genre7',
            'Genre8',
            'Genre9',
        ]);
    });

    it('check if getting the correct total movies', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(Object.values(moviesPerGenre).flat().length).toEqual(9);
    });

    it('check if getting the correct total movies for the "Genre1" category', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(moviesPerGenre.Genre1.length).toEqual(1);
    });

    it('check if getting the correct total movies for the "Genre2" category', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(moviesPerGenre.Genre2.length).toEqual(1);
    });

    it('check if the slug names of all the movies for the Genre1 category are correct', async () => {
        const moviesPerGenre = (await getMoviesPerGenre()) as {
            [k: string]: Movies;
        };
        expect(moviesPerGenre.Genre1.map((movie) => movie.slug)).toEqual([
            'slug1',
        ]);
    });
});

describe('when no movies found', () => {
    beforeAll(
        () =>
            (global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve([]),
                })
            ) as jest.Mock)
    );

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    it('should get an empty array', async () => {
        const moviesPerGenre = await getMoviesPerGenre();
        expect(moviesPerGenre).toEqual([]);
    });
});

describe('if there is an error', () => {
    beforeAll(
        () =>
            (global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(new Error('Error with API')),
                })
            ) as jest.Mock)
    );

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    it('should get an error', async () => {
        expect(async () => await getMoviesPerGenre()).rejects.toThrow();
    });
});

// Testing fetchMovie

describe('one movie details full object', () => {
    beforeAll(
        () =>
            (global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(ONE_MOVIE_DETAILS),
                })
            ) as jest.Mock)
    );

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    it('check if it matches the fake details object ', async () => {
        expect(await fetchMovie('slug3')).toEqual(ONE_MOVIE_DETAILS);
    });
});

describe('no movie found', () => {
    beforeAll(
        () =>
            (global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () =>
                        Promise.resolve(
                            'Not found (hint: use the slug, not the id)'
                        ),
                })
            ) as jest.Mock)
    );

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    it('check if getting the Not Found message correctly', async () => {
        expect(await fetchMovie('slug3')).toEqual(
            'Not found (hint: use the slug, not the id)'
        );
    });
});
