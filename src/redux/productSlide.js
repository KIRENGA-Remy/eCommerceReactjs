import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: []
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem : (state, action) => {
      const check = state.cartItem.some(el => el._id === action.payload._id)
      if(check){
        toast("Item Arleady added to cart")
      } else{
        const total = action.payload.price;
        state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: total}]
        toast("Item is added successfully")
      }
    },
    deleteCartItem : (state, action) => {
      console.log(action.payload);
      toast("One Item is Deleted Successfully")
      const index = state.cartItem.findIndex((el) => el._id === action.payload)
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state,action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload)
      let qty = state.cartItem[index].qty
      const qtyIncrease = ++qty;
      state.cartItem[index].qty = qtyIncrease
      const price = state.cartItem[index].price
      const total = price * qtyIncrease;
      state.cartItem[index].total = total
    },
    decreaseQTY : (state,action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload)
      let qty = state.cartItem[index].qty
      if(qty > 1){
        const qtyDecrease = --qty;
        state.cartItem[index].qty = qtyDecrease
        const price = state.cartItem[index].price
        const total = price * qtyDecrease;
        state.cartItem[index].total = total
      }
    }
    }
});
export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQTY } = productSlice.actions
export default productSlice.reducer;