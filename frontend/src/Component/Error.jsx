import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-8xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-red-600 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Error;
