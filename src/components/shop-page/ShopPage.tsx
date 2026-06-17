import type { Product } from '../../types';
import { useOutletContext, useSearchParams, useParams } from 'react-router';
import Card from '../Card';

const PER_PAGE = 12;

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const products: Product[] = useOutletContext<Product[]>();

  const { category } = useParams();
  const filtered = category
    ? products.filter((p) => p.category.id === Number(category))
    : products;

  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  const goTo = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className='container'>
        <div className='py-6'>
          <h1 className='text-2xl font-bold'>All products</h1>
          <p className='text-base'>
            Clothes, electronics, shoes, furniture & more
          </p>
        </div>
        <div>
          <p>
            Showing {start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of{' '}
            {filtered.length}
          </p>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 px-4 py-6'>
            {pageItems.map((item) => (
              <Card
                imageUrl={item.images[0]}
                title={item.title}
                description={item.description}
                price={item.price}
                key={item.id}
              />
            ))}
          </div>

          <div className='join flex justify-center my-6'>
            <button
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage === 1}
              className='join-item btn btn-sm'
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goTo(page)}
                disabled={page === currentPage}
                className='join-item btn btn-sm'
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='join-item btn btn-sm'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
