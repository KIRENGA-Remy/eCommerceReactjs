import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productSlide';

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {filterby} = useParams();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const productCartItems = useSelector((state) => state.product.cartItem);
  console.log(productCartItems);
  
  const handleAddCartItem = () => {
    dispatch(addCartItem(productDisplay))
  }

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay))
    navigate("/cart");
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
      <button onClick={handleBuy} className='bg-yellow-500 hover:bg-yellow-600 text-lg px-2 rounded-sm'>Buy</button>
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











// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import AllProduct from "../component/AllProduct";
// import { addCartItem } from "../redux/productSlide";

// const Menu = () => {
//   const { filterby } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
//   const productData = useSelector((state) => state.product.productList);

//   const productDisplay = productData.filter((el) => el._id === filterby)[0];

//   const handleAddCartProduct = (e) => {
//     dispatch(addCartItem(productDisplay))
//   };

//   const handleBuy = ()=>{
//     dispatch(addCartItem(productDisplay))
//       navigate("/cart")
//   }
//   return (
//     <div className="p-2 md:p-4">
//       <div className="w-full max-w-4xl m-auto md:flex bg-white">
//         <div className="max-w-sm  overflow-hidden w-full p-5">
//           <img
//             src={productDisplay.image}
//             className="hover:scale-105 transition-all h-full"
//           />
//         </div>
//         <div className="flex flex-col gap-1">
//           <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
//             {productDisplay.name}
//           </h3>
//           <p className=" text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
//           <p className=" font-bold md:text-2xl">
//             <span className="text-red-500 ">₹</span>
//             <span>{productDisplay.price}</span>
//           </p>
//           <div className="flex gap-3">
//           <button onClick={handleBuy} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Buy</button>
//           <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Add Cart</button>
//           </div>
//           <div>
//             <p className="text-slate-600 font-medium">Description : </p>
//             <p>{productDisplay.description}</p>
//           </div>
//         </div>
//       </div>

//       <AllProduct heading={"Related Product"}/>
//     </div>
//   );
// };

// export default Menu;

