// import React from 'react'
// import { useSelector } from 'react-redux'
// import CartProduct from '../component/cartProduct';
// import emptyCartImage  from "../assest/empty.gif";

// const Cart = () => {
//   const productCartItems = useSelector((state) => state.product.cartItem);
//   console.log(productCartItems);

//   const totalPrice = productCartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0);
//   const totalQty = productCartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
//   return (
//     <div className='flex min-h-screen mt-[-15px] bg-slate-300'>
//             <h2 className='text-xl text-slate-40 font-lg md:text-2xl p-3 font-medium md:font-semibold'>Your Cart Items</h2>

//             { productCartItems[0] ? 
//     <div className='w-full flex gap-10'>
//     <div className='mt-14 w-1/2'>

//         {
//           productCartItems.map(el => {
//             return(
//               <CartProduct 
//               key={el._id}
//               id={el._id}
//               name={el.name}
//               image={el.image}
//               price={el.price}
//               category={el.category}
//               qty={el.qty}
//               total={el.total}
//               />
//             )
//           })
//         }
//         </div>
//     <div className=' ml-auto w-full max-w-md mt-14 mr-6'>
//       <p className='text-xl p-1 bg-blue-500 text-white'>Summary</p> 
//       <div className='flex justify-between p-1 border-b'>
//         <p className='text-lg text-slate-600 '>Total Qty:</p>
//         <p className='font-bold w-32'>{totalQty}</p>
//       </div>
//       <div className='flex justify-between  border-b p-1'>
//         <p className='text-lg text-slate-600'>Total Price:</p>
//         <p className='font-bold w-32'><span className='text-red-500'>$</span>{totalPrice}</p>
//       </div>
//       <button className='bg-red-500 hover:bg-red-600 w-full text-white font-serif  p-1'>Payment</button>
//     </div>
//     </div>
//     : 
//     <div className='flex w-full justify-center mr-9 items-center flex-col md:items-center md:justify-center'>
//       <img src={emptyCartImage} alt={emptyCartImage} className='w-full max-w-sm' />
//       <p className='text-slate-500 text-2xl font-bold'>Empty Cart</p>
//     </div>
//     }
//     </div>
//   )
// }

// export default Cart





import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  
  
  const handlePayment = async()=>{

      if(user.email){
          
          const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
          const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,{
            method : "POST",
            headers  : {
              "content-type" : "application/json"
            },
            body  : JSON.stringify(productCartItem)
          })
          if(res.statusCode === 500) return;

          const data = await res.json()
          console.log(data)

          toast("Redirect to payment Gateway...!")
          stripePromise.redirectToCheckout({sessionId : data}) 
      }
      else{
        toast("You have not Login!")
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }
    
  }
  return (
    <>
    
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ?
        <div className="my-4 flex gap-3">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      }
      </div>
    
    </>
  );
};

export default Cart;
