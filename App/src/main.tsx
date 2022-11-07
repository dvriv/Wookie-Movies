import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { getMoviesPerGenre, fetchMovie } from './services/movies.services';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        loader: () => getMoviesPerGenre(),
    },
    {
        path: '/search',
        element: <Home />,
        loader: ({ request }) => {
            const url = new URL(request.url);
            const searchTerm = url.searchParams.get('q');
            return getMoviesPerGenre(searchTerm);
        },
    },
    {
        path: '/movie/:movieSlug',
        element: <MovieDetails />,
        loader: ({ params }) => fetchMovie(params.movieSlug),
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
