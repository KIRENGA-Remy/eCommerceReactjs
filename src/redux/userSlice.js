import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // You can initialize properties here if needed
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload);

      // Set individual properties directly
      
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;
    },
    logoutRedux: (state, action) => {
        state._id = "";
        state.firstName = "";
        state.lastName = "";
        state.email = "";
        state.image = "";
    }
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
