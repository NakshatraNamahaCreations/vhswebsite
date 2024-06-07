// Redux1/Mystore.js
import { configureStore } from "@reduxjs/toolkit";
import MyProductReducer from "../Redux1/MyProductSlice";
import MyCartReducer from "../Redux1/MyCartSlice";
import MyCartReducer1 from "../Redux/MyCartSlice";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save state", e);
  }
};

// Initialize store with loaded state
const preloadedState = {
  cart: loadState(),
};

const mystore = configureStore({
  reducer: {
    product: MyProductReducer,
    cart: MyCartReducer,
    addon: MyCartReducer1,
  },
  preloadedState,
});

mystore.subscribe(() => {
  saveState(mystore.getState());
});

export default mystore;
