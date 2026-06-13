import { Link } from 'react-router';

const NavBar = () => {
  return (
    <nav className='border-b border-gray-200 bg-white'>
      <div className='flex items-center justify-between px-5 py-3 w-4/5 max-w-300 mx-auto'>
        <div className='text-lg font-medium'>Fake Store</div>
        <div className='flex gap-3'>
          <button className='px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50'>
            <Link to='/'>Home</Link>
          </button>
          <button className='px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50'>
            <Link to='/shop'>Shop</Link>
          </button>
          <button className='px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50'>
            <Link to='/cart'>Cart</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
