// import React from 'react'
// import { TbPlus, TbMinus} from 'react-icons/tb';
// import { AiFillDelete }  from 'react-icons/ai';
// import { deleteCartItem, increaseQty, decreaseQTY } from '../redux/productSlide';
// import { useDispatch } from 'react-redux';

// const CartProduct = ({id, name, image, price, qty, total, category}) => {
//   const dispatch = useDispatch();

//   return (
//     <div className='flex bg-white shadow-md drop-shadow-sm max-w-xl gap-2 mx-3 border-b  md:p-3'>
//       <div className='mx-1 bg-white rounded overflow-hidden'>
//         <img src={image} alt={image} className='h-28 w-32' />
//       </div>
//       <div className='flex flex-col w-full justify-center'>
//       <div className='flex justify-between'>
//     <p className='text-slate-600 font-medium text-lg capitalize md:text-xl'>{name}</p>
//     <div className='text-slate-400 hover:text-red-600 text-2xl cursor-pointer' onClick={() => dispatch(deleteCartItem(id))}>
//     <AiFillDelete />
//     </div>
//     </div>
//       <p className='text-slate-400 font-lg capitalize'>{category}</p>
//       <p className='font-bold'><span className='text-red-500'>$</span>{price}</p>

//       <div className='tems-center flex justify-between'>
//         <div className='flex gap-3'>
//              <button className='bg-slate-400 hover:bg-slate-500 text-lg px-2 rounded-sm' onClick={() => dispatch(increaseQty(id))}><TbPlus /></button>
//              <p className='p-2'>{qty}</p>
//              <button className='bg-slate-400 hover:bg-slate-500 text-lg px-2 rounded-sm' onClick={() => dispatch(decreaseQTY(id))}><TbMinus /></button>
//         </div>
//         <div className='flex items-center gap-1 font-bold text-slate-600'>
//           <p>Total : </p>
//           <p><span className='text-red-500'>$</span>{total}</p>
//         </div>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default CartProduct;










import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem,increaseQty,decreaseQTY } from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch()

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover " />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div className="cursor-pointer text-slate-700 hover:text-red-500" onClick={()=>dispatch(deleteCartItem(id))}>
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500  font-medium ">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-500 ">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button onClick={()=>dispatch(increaseQty(id))} className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 ">
              <TbPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              onClick={()=>dispatch(decreaseQTY(id))}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1">
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p><span className="text-red-500">₹</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

