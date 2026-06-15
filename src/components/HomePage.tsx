import {
  Handbag,
  Shirt,
  LaptopMinimal,
  Armchair,
  SportShoe,
  LayoutGrid,
} from 'lucide-react';
import { Link, useOutletContext } from 'react-router';
import Card from './Card';
import { chooseRandomElements } from '../utility';
import type { Product } from '../types';
import Footer from './Footer';

const HomePage = () => {
  const products: Product[] = useOutletContext<Product[]>();
  const featuredProducts = chooseRandomElements(products);

  return (
    <div>
      <div className='bg-[#F0EEE8] hero py-12'>
        <div className='container lg:flex lg:items-center lg:justify-between'>
          <div className='text-left py-6 lg:w-1/2'>
            <h1 className='text-7xl font-bold mb-4'>
              Everything you need, all in one place
            </h1>
            <p className='text-lg mb-8'>
              From wardrobe staples to tech essentials and everything in between
            </p>
            <button className='btn btn-neutral'>
              <Link to='/shop'>Shop now</Link>
            </button>
          </div>
          <div className='flex justify-center items-center py-6 lg:w-1/2'>
            <Handbag size='64px' />
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-center gap-4 p-4'>
        <div className='flex flex-col justify-center items-center gap-2 p-8 w-full lg:w-auto'>
          <Shirt size='64px' className='lg:hidden' />
          <Shirt size='40px' className='hidden lg:block' />
          <h3 className='text-4xl font-bold'>Clothes</h3>
        </div>

        <div className='divider lg:divider-horizontal'></div>

        <div className='flex flex-col justify-center items-center gap-2 p-8 w-full lg:w-auto'>
          <LaptopMinimal size='64px' className='lg:hidden' />
          <LaptopMinimal size='40px' className='hidden lg:block' />
          <h3 className='text-4xl font-bold'>Electronics</h3>
        </div>

        <div className='divider lg:divider-horizontal'></div>

        <div className='flex flex-col justify-center items-center gap-2 p-8 w-full lg:w-auto'>
          <Armchair size='64px' className='lg:hidden' />
          <Armchair size='40px' className='hidden lg:block' />
          <h3 className='text-4xl font-bold'>Furniture</h3>
        </div>

        <div className='divider lg:divider-horizontal'></div>

        <div className='flex flex-col justify-center items-center gap-2 p-8 w-full lg:w-auto'>
          <SportShoe size='64px' className='lg:hidden' />
          <SportShoe size='40px' className='hidden lg:block' />
          <h3 className='text-4xl font-bold'>Shoes</h3>
        </div>

        <div className='divider lg:divider-horizontal'></div>

        <div className='flex flex-col justify-center items-center gap-2 p-8 w-full lg:w-auto'>
          <LayoutGrid size='64px' />
          <h3 className='text-4xl font-bold'>Misc</h3>
        </div>
      </div>

      <div className='px-4 py-8 container'>
        <h2 className='text-3xl font-bold text-center mb-8 relative after:content-[""] after:block after:w-16 after:h-1 after:bg-primary after:mx-auto after:mt-2 after:rounded-full'>
          Featured
        </h2>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-8 lg:items-stretch'>
          {featuredProducts.map((product) => (
            <Card
              imageUrl={product.images[0]}
              title={product.title}
              description={product.description}
              price={product.price}
              key={product.id}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
