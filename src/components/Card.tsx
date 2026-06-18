interface Props {
  imageUrl: string;
  title: string;
  price: number;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  qty: number;
}

const Card = ({
  imageUrl,
  title,
  price,
  handleAddToCart,
  handleRemoveFromCart,
  qty,
}: Props) => {
  return (
    <div className='card bg-base-100 flex-1 shadow-sm'>
      <figure>
        <img src={imageUrl} alt={title} className='w-90 h-48 object-cover' />
      </figure>
      <div className='card-body flex flex-col justify-between'>
        <h2 className='card-title'>{title}</h2>
        <div className='card-actions justify-end items-center'>
          <div className='badge badge-outline badge-lg'>${price}</div>
          {qty === 0 ? (
            <button
              className='btn btn-neutral btn-sm'
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          ) : (
            <div className='flex items-center gap-2'>
              <button
                className='btn btn-neutral btn-sm'
                onClick={handleRemoveFromCart}
              >
                -
              </button>
              <span className='w-4 text-center'>{qty}</span>
              <button
                className='btn btn-neutral btn-sm'
                onClick={handleAddToCart}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
