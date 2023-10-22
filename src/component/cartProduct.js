import React from 'react'
import { TbPlus, TbMinus} from 'react-icons/tb';
import { AiFillDelete }  from 'react-icons/ai';
import { deleteCartItem, increaseQty, descreaseQty } from '../redux/productSlide';
import { useDispatch } from 'react-redux';

const CartProduct = ({id, name, image, price, qty, total, category}) => {
  const dispatch = useDispatch();

  return (
    <div className='flex bg-slate-400 shadow-md drop-shadow-sm max-w-xl gap-2 mx-3 border-b  md:p-3'>
      <div className='mx-1 bg-white rounded overflow-hidden'>
        <img src={image} alt={image} className='h-28 w-32' />
      </div>
      <div className='flex flex-col w-full justify-center'>
      <div className='flex justify-between'>
    <p className='text-slate-600 font-medium text-lg capitalize md:text-xl'>{name}</p>
    <div className='text-slate-400 hover:text-red-600 text-2xl cursor-pointer' onClick={() => dispatch(deleteCartItem(id))}>
    <AiFillDelete />
    </div>
    </div>
      <p className='text-slate-400 font-lg capitalize'>{category}</p>
      <p className='font-bold'><span className='text-red-500'>$</span>{price}</p>

      <div className='tems-center flex justify-between'>
        <div className='flex gap-3'>
             <button className='bg-slate-500 hover:bg-slate-600 text-lg px-2 rounded-sm' onClick={() => dispatch(increaseQty(id))}><TbPlus /></button>
             <p className='p-2'>{qty}</p>
             <button className='bg-slate-500 hover:bg-slate-600 text-lg px-2 rounded-sm' onClick={() => dispatch(descreaseQty(id))}><TbMinus /></button>
        </div>
        <div className='flex items-center gap-1 font-bold text-slate-600'>
          <p>Total : </p>
          <p><span className='text-red-500'>$</span>{total}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CartProduct;
