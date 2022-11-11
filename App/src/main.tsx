import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { getMoviesPerGenre, fetchMovie } from './services/movies.services';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound404 from './components/NotFound404';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound404 />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/',
        element: <Home />,
        loader: () => getMoviesPerGenre(),
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/search',
        element: <Home />,
        loader: ({ request }) => {
            const url = new URL(request.url);
            const searchTerm = url.searchParams.get('q');
            return getMoviesPerGenre(searchTerm);
        },
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/movie/:movieSlug',
        element: <MovieDetails />,
        loader: ({ params }) => fetchMovie(params.movieSlug),
        errorElement: <ErrorBoundary />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
