import React from "react";
import "./viewcart.scss";
// import Header from "../../Component/Header";

import CartDetails from "./Components/CartDetails/CartDetails";
import NabarCompo from "../../Component/navbar";
import Footer from "../../Component/Footer";

export default function ViewCart() {
  return (
    <>
      <NabarCompo className="full_screen" />
      <CartDetails />
    </>
  );
}
