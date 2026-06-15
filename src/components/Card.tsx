interface Props {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

const Card = ({ imageUrl, title, price }: Props) => {
  return (
    <div className='card bg-base-100 flex-1 shadow-sm'>
      <figure>
        <img src={imageUrl} alt='Shoes' className='w-90 h-48 object-cover' />
      </figure>
      <div className='card-body flex flex-col justify-between'>
        <h2 className='card-title'>{title}</h2>
        <div className='card-actions justify-end items-center'>
          <div className='badge badge-outline'>${price}</div>
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
