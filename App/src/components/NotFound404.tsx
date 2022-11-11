import MainHeader from './MainHeader';

function NotFound404() {
    return (
        <div className="main-container min-h-full h-full flex flex-col ">
            <MainHeader />
            <div className="homepage-page flex flex-col grow items-center text-center bg-slate-800 text-slate-50">
                <div className="grow flex items-center content-center">
                    <h1 className="text-4xl">404 - Page not found</h1>
                </div>
            </div>
        </div>
    );
}

export default NotFound404;
