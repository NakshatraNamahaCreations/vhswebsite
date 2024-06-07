import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing an icon from react-icons
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartaddon,
  addToCart1addon,
  removeMyCartItemaddon,
  clearCartaddon,
} from "../Redux/MyCartSlice";
import { addToCart1, removeMyCartItem, clearCart } from "../Redux1/MyCartSlice";
function Paymentsuccess() {
  const dispatch = useDispatch();
  const handleclick = () => {
    window.location.assign("/");
    dispatch(clearCart());
    dispatch(clearCartaddon());
  };
  return (
    <div className="paymentsuccess-container">
      <div className="paymentsuccess-icon">
        <FaCheckCircle size={100} color="green" />
      </div>
      <div className="paymentsuccess-message">
        <h1>Payment Successful!</h1>
        <p>
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <button className="paymentsuccess-button" onClick={handleclick}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default Paymentsuccess;
