import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './HomePage';
import {
  createMockProduct,
  renderWithOutletContext,
} from '../test/test-utils';

describe('HomePage', () => {
  it('renders hero section and category links', () => {
    renderWithOutletContext(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: 'Everything you need, all in one place',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop now' })).toHaveAttribute('href', '/shop');
    expect(screen.getByRole('link', { name: 'Clothes' })).toHaveAttribute(
      'href',
      '/shop/clothes',
    );
    expect(screen.getByRole('link', { name: 'Electronics' })).toHaveAttribute(
      'href',
      '/shop/electronics',
    );
  });

  it('renders one featured product per category', () => {
    renderWithOutletContext(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Featured' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Blue Shirt' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Laptop' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Desk Chair' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Running Shoes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Water Bottle' })).toBeInTheDocument();
  });

  it('calls addToCart when a featured product is added', async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    const product = createMockProduct({ id: 1, title: 'Blue Shirt' });

    renderWithOutletContext(<HomePage />, {
      context: {
        data: [product],
        addToCart,
        userCart: [],
        removeFromCart: vi.fn(),
      },
    });

    await user.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
