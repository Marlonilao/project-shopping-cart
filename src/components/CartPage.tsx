import { useOutletContext } from 'react-router';
import type { Product } from '../types';

const CartPage = () => {
  const {
    userCart,
    removeFromCart,
  }: {
    userCart: Product[];
    removeFromCart: (product: Product) => void; // was (index: number)
  } = useOutletContext();

  const subtotal = userCart.reduce((sum, item) => sum + item.price, 0);
  const shipping = userCart.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  if (userCart.length === 0) {
    return (
      <div className='container py-20 text-center'>
        <h1 className='text-2xl font-bold'>Your cart is empty</h1>
        <p className='text-sm mt-2'>Add some items to get started.</p>
      </div>
    );
  }

  return (
    <div className='container py-6 px-4'>
      <h1 className='text-2xl font-bold mb-6'>Your Cart ({userCart.length})</h1>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Cart Items */}
        <div className='flex flex-col gap-4 flex-1'>
          {userCart.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 border-b pb-4'
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className='w-20 h-20 object-cover rounded shrink-0'
              />
              <div className='flex-1 min-w-0'>
                <p className='font-medium truncate'>{item.title}</p>
                <p className='text-sm text-gray-500'>{item.category.name}</p>
                <p className='font-semibold mt-1'>${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item)} // was removeFromCart(index)
                className='btn btn-sm btn-error shrink-0'
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className='lg:w-80 shrink-0'>
          <div className='border rounded-lg p-4 flex flex-col gap-3 lg:sticky lg:top-4'>
            <h2 className='text-lg font-bold'>Order Summary</h2>

            <div className='flex justify-between text-sm'>
              <span>Subtotal ({userCart.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className='flex justify-between text-sm'>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className='border-t pt-3 flex justify-between font-bold'>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className='btn btn-primary w-full mt-2'>
              Proceed to Checkout
            </button>

            <p className='text-xs text-center text-gray-400'>
              Taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
