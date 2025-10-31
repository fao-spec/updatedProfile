import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-6">
      <h1 className="text-8xl font-extrabold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page not found.</p>
      <p className="mb-8 text-gray-400">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-white font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
}
