import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/shirt.jpg',
    title: 'Blue Shirt',
    price: 29.99,
    qty: 0,
    handleAddToCart: vi.fn(),
    handleRemoveFromCart: vi.fn(),
  };

  it('renders product details', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByRole('img', { name: 'Blue Shirt' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Blue Shirt' })).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('shows Add to Cart when quantity is zero', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '-' })).not.toBeInTheDocument();
  });

  it('calls handleAddToCart when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    const handleAddToCart = vi.fn();

    render(<Card {...defaultProps} handleAddToCart={handleAddToCart} />);
    await user.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(handleAddToCart).toHaveBeenCalledOnce();
  });

  it('shows quantity controls when item is in cart', async () => {
    const user = userEvent.setup();
    const handleAddToCart = vi.fn();
    const handleRemoveFromCart = vi.fn();

    render(
      <Card
        {...defaultProps}
        qty={2}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />,
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '-' }));

    expect(handleAddToCart).toHaveBeenCalledOnce();
    expect(handleRemoveFromCart).toHaveBeenCalledOnce();
  });
});
