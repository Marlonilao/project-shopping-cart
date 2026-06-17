import type { Product } from '../../types';
import { useOutletContext, useSearchParams, useParams } from 'react-router';
import Card from '../Card';

const PER_PAGE = 12;

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z', value: 'name_asc' },
  { label: 'Name: Z to A', value: 'name_desc' },
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const products: Product[] = useOutletContext<Product[]>();
  const { category } = useParams();
  const filtered = category
    ? products.filter((p) => p.category.id === Number(category))
    : products;
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const currentSort = searchParams.get('sort') || 'default';
  const sorted = [...filtered].sort((a, b) => {
    switch (currentSort) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'name_asc':
        return a.title.localeCompare(b.title);
      case 'name_desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  const start = (currentPage - 1) * PER_PAGE;
  const totalPages = Math.ceil(sorted.length / PER_PAGE); // was filtered
  const pageItems = sorted.slice(start, start + PER_PAGE); // was filtered

  const goTo = (page: number) => {
    setSearchParams({ page: page.toString(), sort: currentSort }); // added sort
    window.scrollTo(0, 0);
  };

  const handleSort = (value: string) => {
    setSearchParams({ page: '1', sort: value });
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
          <div className='flex items-center justify-between'>
            <p>
              Showing {start + 1}–{Math.min(start + PER_PAGE, sorted.length)} of{' '}
              {sorted.length}
            </p>
            <select
              value={currentSort}
              onChange={(e) => handleSort(e.target.value)}
              className='select select-sm'
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
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
