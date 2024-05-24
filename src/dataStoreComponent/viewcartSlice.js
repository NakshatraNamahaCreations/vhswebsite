// viewcartSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const initialState = JSON.parse(localStorage.getItem("cart")) || {
  Servicedata: {},
};

export const viewCartSlice = createSlice({
  name: "viewCart",
  initialState,
  reducers: {
    SaveCartData: (state, action) => {
      state.Servicedata = { ...action.payload };
      {
        console.log(" action.payload", action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { SaveCartData } = viewCartSlice.actions;

export default viewCartSlice.reducer;
