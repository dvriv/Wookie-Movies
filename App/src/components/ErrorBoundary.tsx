import { Link } from 'react-router-dom';

function ErrorBoundary() {
    return (
        <div className="main-container min-h-full h-full flex flex-col ">
            <div className="homepage-page flex flex-col grow items-center text-center bg-slate-800 text-slate-50">
                <div className="grow flex items-center content-center">
                    <div className="flex flex-col">
                        <h1 className="text-4xl">Unexpected error occurred</h1>
                        <Link className="block text-xl mt-1 underline" to="/">
                            {'Go back Home'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorBoundary;
