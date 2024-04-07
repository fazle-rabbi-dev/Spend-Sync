import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
      <section className="flex flex-col items-center justify-center">
        <h1 className="heading3 md:heading2 text-gray-800 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">It seems like you're lost in cyberspace.</p>
        <img src="/404.svg" alt="404 Illustration" className="w-64 h-64 mb-8" />
        <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
      </section>
  );
};