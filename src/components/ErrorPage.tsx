import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Page not found</h1>
          <p className='py-6'>
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or the link you followed may be broken.
          </p>
          <button className='btn btn-primary'>
            <Link to='/'>Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
