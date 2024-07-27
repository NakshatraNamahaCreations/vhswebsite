import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";

import Footer from "./Component/Footer";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import ServicesView from "./Pages/ServicesView/ServicesView";
import ViewCart from "./Pages/ViewCart/ViewCart";
import Booking from "./Pages/Booking/Booking";
import BookingDetails from "./Pages/BookingDetail/BookingDetails";
import Servicedetails from "./Component/Servicedetails";
import Viewdetails from "./Component/Viewdetails";
import Cart from "./Component/Cart";
import Espage from "./Component/Espage";
import Cartbook from "./Component/Cartbook";
import Home from "./Component/Home";
import Summary from "./Component/Summary";
import Esuccess from "./Component/Esuccess";
import Success from "./Component/Success";
import Paymentgateway from "./Component/Paymentgateway";
import About from "./Component/About";
import Career from "./Component/Career";
import Paymentsuccess from "./Component/Paymentsuccess";
import Paymentfailure from "./Component/Paymentfailure";
import Header1 from "./Component/Header1";
import Mybooking from "./Component/Mybooking";
import Mainheader from "./Component/Mainheader";
import Completed from "./Component/Completed";
import Upcomingdetail from "./Component/Upcomingdetail";
import Enquirydetails from "./Component/Enquirydetails";
import Completeddetails from "./Component/Completeddetails";
import Category from "./Component/Category";
import Homecity from "./Component/Homecity";
import Subcategory from "./Component/Subcategory";
import Serviceviewdetails from "./Component/Serviceviewdetails";
import Terms from "./Component/Terms";
import Privacy from "./Component/Privacy";
import Cancellation from "./Component/Cancellation";
import Contact from "./Component/Contact";
import Interiorcompany from "./Component/Interiorcompany";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:cityName" element={<Homecity />} />
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="ServicesView" element={<ServicesView />} />
        <Route path="viewcart" element={<ViewCart />} />
        <Route path="booking" element={<Booking />} />
        <Route path="bookingdetails" element={<BookingDetails />} />
        <Route path="servicedetails" element={<Servicedetails />} />
        <Route path="viewdetails" element={<Viewdetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="Espage" element={<Espage />} />
        <Route path="cartbook" element={<Cartbook />} />
        <Route path="summary" element={<Summary />} />
        <Route path="Esuccess" element={<Esuccess />} />
        <Route path="success" element={<Success />} />
        <Route path="/p" element={<Paymentgateway />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/Paymentsuccess" element={<Paymentsuccess />} />
        <Route path="/Paymentfailure" element={<Paymentfailure />} />
        <Route path="/mybooking" element={<Mybooking />} />
        <Route path="/mainheader" element={<Mainheader />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/upcomingdetail" element={<Upcomingdetail />} />
        <Route path="/enquirydetails" element={<Enquirydetails />} />
        <Route path="/completeddetails" element={<Completeddetails />} />
        {/* <Route path="/services/:data" element={<Category />} /> */}

        <Route path="/services/:subcategory" element={<Subcategory />} />
        <Route
          path="/serviceview/:ServiceName"
          element={<Serviceviewdetails />}
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interiorcompany" element={<Interiorcompany />} />

        {/* <Route path="/" element={<Header1 />} /> */}
      </Routes>
      {/* <AppLink /> */}
    </>
  );
}

export default App;
