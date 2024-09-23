import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex justify-center">
      <h1>404 Not Found</h1>
      <p>Sorry, an error has occured, Requested page not found!</p>
      <Link to="/" className="bg-blue-700 p-1">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
