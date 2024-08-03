// citySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setstoreCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setstoreCity } = citySlice.actions;

export default citySlice.reducer;
