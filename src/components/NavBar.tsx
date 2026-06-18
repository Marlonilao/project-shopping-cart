import { Link } from 'react-router';
import { useNavigate, useSearchParams } from 'react-router';

interface Props {
  cartNumber: number;
}

const NavBar = ({ cartNumber }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim()) {
      navigate(`/shop?search=${encodeURIComponent(value)}&page=1`);
    } else {
      navigate('/shop');
    }
  };
  return (
    <div className='max-lg:collapse bg-base-200 shadow-sm w-full rounded-md sticky top-0 z-50'>
      <input id='navbar-1-toggle' className='peer hidden' type='checkbox' />
      <label
        htmlFor='navbar-1-toggle'
        className='fixed inset-0 hidden max-lg:peer-checked:block'
      ></label>
      <div className='collapse-title navbar container'>
        <div className='navbar-start'>
          <label htmlFor='navbar-1-toggle' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <button className='btn btn-ghost text-xl hidden md:block lg:block'>
            <Link to='/'>Fake Store</Link>
          </button>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link to='/shop'>Shop All</Link>
            </li>
            <li>
              <Link to='/shop/clothes'>Clothes</Link>
            </li>
            <li>
              <Link to='/shop/electronics'>Electronics</Link>
            </li>
            <li>
              <Link to='/shop/furniture'>Furniture</Link>
            </li>
            <li>
              <Link to='/shop/shoes'>Shoes</Link>
            </li>
            <li>
              <Link to='/shop/miscellaneous'>Misc</Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end mr-2'>
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='Search'
              defaultValue={searchParams.get('search') ?? ''}
              onChange={handleSearch}
              className='input input-bordered w-64 lg:w-auto'
            />

            <button
              className='py-1 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out'
              aria-label='Cart'
            >
              <Link to='/cart'>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                </svg>
                <span className='absolute inset-0 object-top-right -mr-6'>
                  {cartNumber > 0 && (
                    <div className='inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white'>
                      {cartNumber}
                    </div>
                  )}
                </span>
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className='collapse-content lg:hidden z-1'>
        <ul className='menu'>
          <li className='md:hidden'>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/shop'>Shop All</Link>
          </li>
          <li>
            <Link to='/shop/clothes'>Clothes</Link>
          </li>
          <li>
            <Link to='/shop/electronics'>Electronics</Link>
          </li>
          <li>
            <Link to='/shop/furniture'>Furniture</Link>
          </li>
          <li>
            <Link to='/shop/shoes'>Shoes</Link>
          </li>
          <li>
            <Link to='/shop/miscellaneous'>Misc</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
