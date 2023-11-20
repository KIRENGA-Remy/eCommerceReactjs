import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/cartProduct';
import emptyCartImage  from "../assest/empty.gif";

const Cart = () => {
  const productCartItems = useSelector((state) => state.product.cartItem);
  console.log(productCartItems);

  const totalPrice = productCartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0);
  const totalQty = productCartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
  return (
    <div className='flex min-h-screen mt-[-15px] bg-slate-300'>
            <h2 className='text-xl text-slate-40 font-lg md:text-2xl p-3 font-medium md:font-semibold'>Your Cart Items</h2>

            { productCartItems[0] ? 
    <div className='w-full flex gap-10'>
    <div className='mt-14 w-1/2'>

        {
          productCartItems.map(el => {
            return(
              <CartProduct 
              key={el._id}
              id={el._id}
              name={el.name}
              image={el.image}
              price={el.price}
              category={el.category}
              qty={el.qty}
              total={el.total}
              />
            )
          })
        }
        </div>
    <div className=' ml-auto w-full max-w-md mt-14 mr-6'>
      <p className='text-xl p-1 bg-blue-500 text-white'>Summary</p> 
      <div className='flex justify-between p-1 border-b'>
        <p className='text-lg text-slate-600 '>Total Qty:</p>
        <p className='font-bold w-32'>{totalQty}</p>
      </div>
      <div className='flex justify-between  border-b p-1'>
        <p className='text-lg text-slate-600'>Total Price:</p>
        <p className='font-bold w-32'><span className='text-red-500'>$</span>{totalPrice}</p>
      </div>
      <button className='bg-red-500 hover:bg-red-600 w-full text-white font-serif  p-1'>Payment</button>
    </div>
    </div>
    : 
    <div className='flex w-full justify-center mr-9 items-center flex-col md:items-center md:justify-center'>
      <img src={emptyCartImage} alt={emptyCartImage} className='w-full max-w-sm' />
      <p className='text-slate-500 text-2xl font-bold'>Empty Cart</p>
    </div>
    }
    </div>
  )
}

export default Cart