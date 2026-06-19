import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShopPage from './ShopPage';
import {
  createMockProduct,
  renderWithOutletContext,
} from '../test/test-utils';

const manyProducts = Array.from({ length: 15 }, (_, i) =>
  createMockProduct({
    id: i + 1,
    title: `Product ${String(i + 1).padStart(2, '0')}`,
    price: (i + 1) * 10,
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: '',
    },
  }),
);

describe('ShopPage', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('renders all products by default', () => {
    renderWithOutletContext(<ShopPage />, { route: '/shop' });

    expect(screen.getByRole('heading', { name: 'All Products' })).toBeInTheDocument();
    expect(screen.getByText('Showing 1–5 of 5')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Blue Shirt' })).toBeInTheDocument();
  });

  it('filters products by category', () => {
    renderWithOutletContext(<ShopPage />, { route: '/shop/electronics' });

    expect(screen.getByRole('heading', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Laptop' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Blue Shirt' })).not.toBeInTheDocument();
  });

  it('sorts products by price ascending', async () => {
    const user = userEvent.setup();

    renderWithOutletContext(<ShopPage />, { route: '/shop' });

    await user.selectOptions(screen.getByRole('combobox'), 'price_asc');

    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveTextContent('Water Bottle');
    expect(headings.at(-1)).toHaveTextContent('Laptop');
  });

  it('paginates products', async () => {
    const user = userEvent.setup();

    renderWithOutletContext(<ShopPage />, {
      route: '/shop',
      context: {
        data: manyProducts,
        addToCart: vi.fn(),
        userCart: [],
        removeFromCart: vi.fn(),
      },
    });

    expect(screen.getByText('Showing 1–12 of 15')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Product 01' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Product 13' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2' }));

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(screen.getByText('Showing 13–15 of 15')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Product 13' })).toBeInTheDocument();
  });

  it('filters products by search query', () => {
    renderWithOutletContext(<ShopPage />, { route: '/shop?search=laptop' });

    expect(screen.getByText('Showing 1–1 of 1')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Laptop' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Blue Shirt' })).not.toBeInTheDocument();
  });

  it('calls addToCart when a product is added', async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();

    renderWithOutletContext(<ShopPage />, {
      route: '/shop',
      context: {
        data: manyProducts,
        addToCart,
        userCart: [],
        removeFromCart: vi.fn(),
      },
    });

    const card = screen.getByRole('heading', { name: 'Product 01' }).closest('.card');
    await user.click(within(card!).getByRole('button', { name: 'Add to Cart' }));

    expect(addToCart).toHaveBeenCalledWith(manyProducts[0]);
  });
});
