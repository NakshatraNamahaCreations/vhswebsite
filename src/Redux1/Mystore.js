import { configureStore } from "@reduxjs/toolkit";
import MyProductReducer from "../Redux1/MyProductSlice";
import MyCartReducer from "../Redux1/MyCartSlice";
import MyCartReducer1 from "../Redux/MyCartSlice";

export const mystore = configureStore({
  reducer: {
    product: MyProductReducer,
    cart: MyCartReducer,
    addon: MyCartReducer1,
  },
});
