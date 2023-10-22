import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productSlide';

const Menu = () => {
  const dispatch = useDispatch();
  const {filterby} = useParams();
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  console.log(productDisplay);

  const productCartItems = useSelector((state) => state.product.cartItem);
  console.log(productCartItems);
  
  const handleAddCartItem = () => {
    dispatch(addCartItem(productDisplay))
  }
  return (
    <>
      <div className='mt-4 flex bg-white w-1/2 m-auto rounded md:flex md:flex-row flex-col'>
        <div className='max-w-[200px] overflow-hidden p-5'>
        <img src={productDisplay.image} className='hover:scale-105 transition-all w-full md:max-w-xs' alt={productDisplay.image} />
        </div>
        <div className='flex flex-col py-2 pl-1 justify-center'>
    <p className=' text-slate-600 font-bold text-2xl capitalize'>{productDisplay.name}</p>
      <p className='text-slate-400 font-bold capitalize'>{productDisplay.category}</p>
      <p className='font-bold'><span className='text-red-500'>$</span>{productDisplay.price}</p>
      <div className='flex gap-3'>
      <button className='bg-yellow-500 hover:bg-yellow-600 text-lg px-2 rounded-sm'>Buy</button>
      <button onClick={handleAddCartItem} className='bg-yellow-500 hover:bg-yellow-600 text-lg px-2 rounded-sm'>Add Cart</button>
      </div>
      <p className='text-slate-400 font-semibold pt-2'>Description</p>
      <p className='capitalize'>{productDisplay.description}</p>
      </div>
      </div>
            <AllProduct heading={"Related Products"} />
            </>
  )
}

export default Menu
