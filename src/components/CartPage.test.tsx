import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartPage from './CartPage';
import {
  createMockProduct,
  renderWithOutletContext,
} from '../test/test-utils';

describe('CartPage', () => {
  it('shows empty state when cart has no items', () => {
    renderWithOutletContext(<CartPage />, { route: '/cart' });

    expect(screen.getByRole('heading', { name: 'Your cart is empty' })).toBeInTheDocument();
    expect(screen.getByText('Add some items to get started.')).toBeInTheDocument();
  });

  it('renders cart items and order summary', () => {
    const product = createMockProduct({
      id: 1,
      title: 'Blue Shirt',
      price: 20,
    });

    renderWithOutletContext(<CartPage />, {
      route: '/cart',
      context: {
        data: [product],
        addToCart: vi.fn(),
        userCart: [product],
        removeFromCart: vi.fn(),
      },
    });

    expect(screen.getByRole('heading', { name: 'Your Cart (1)' })).toBeInTheDocument();
    expect(screen.getByText('Blue Shirt')).toBeInTheDocument();
    expect(screen.getAllByText('$20.00')).toHaveLength(2);
    expect(screen.getByText('Subtotal (1 items)')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('calls removeFromCart when Remove is clicked', async () => {
    const user = userEvent.setup();
    const product = createMockProduct({ id: 1, title: 'Blue Shirt' });
    const removeFromCart = vi.fn();

    renderWithOutletContext(<CartPage />, {
      route: '/cart',
      context: {
        data: [product],
        addToCart: vi.fn(),
        userCart: [product],
        removeFromCart,
      },
    });

    await user.click(screen.getByRole('button', { name: 'Remove' }));

    expect(removeFromCart).toHaveBeenCalledWith(product);
  });
});
