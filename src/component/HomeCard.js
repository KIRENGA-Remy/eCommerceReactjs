import React from 'react'
import { Link } from 'react-router-dom';

const HomeCard = ({ name,image, category, price, loading, id}) => {
  return (
    <div className='bg-white rounded shadow-md min-w-[115px] min-h-[120px]'>
      {
        name ? <>
        <Link to={`menu/${id}`} >
              <div className='w-40'>
        <img src={image} className='h-full w-full' alt="" />
      </div>
      <p className='text-center text-slate-600 font-semibold capitalize'>{name}</p>
      <p className='text-slate-400 text-center capitalize'>{category}</p>
      <p className='text-center font-bold'><span className='text-red-500'>$</span>{price}</p>
      </Link>
        </> 
        : 
        <div className='flex justify-center items-center h-full text-slate-400 font-medium'>
          <p>{loading}</p>
        </div>
      }
    </div>
  )
}

export default HomeCard;
