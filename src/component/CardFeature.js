import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartItem } from '../redux/productSlide';

const CardFeature = ({name, category, price, image, loading, id}) => {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addCartItem({
      _id: id,
      name: name,
      image: image,
      category: category,
      price: price
    }))
  }
  return (
    <div className='bg-white w-full min-w-[152px] max-w-[152px] hover:shadow-lg drop-shadow-lg mt-3 whitespace-nowrap overflow-hidden'>
      {
        image ? <>
        <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top:"0", behavior:"smooth"})} >
            <div className='h-28 flex flex-col items-center justify-center'>
      <img src={image} className='h-full' alt="" />
    </div>
    <div className='p-3'>
    <p className=' text-slate-600 font-semibold capitalize'>{name}</p>
      <p className='text-slate-400 capitalize'>{category}</p>
      <p className='font-bold text-center mb-3'> <span className='text-red-500'>$</span>{price}</p>
      </div>
      </Link>
      <button className='bg-yellow-500 hover:bg-yellow-600 w-full mx-12 rounded-sm' onClick={handleAddCart}>Add Cart</button>
        </>
         : 
         <div className='min-h-[170px] flex justify-center items-center'>
          <p>{loading}</p>
         </div>
}
    </div>
  )
}
export default CardFeature;
