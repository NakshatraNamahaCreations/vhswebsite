import React from "react";
import { useLocation, useParams } from "react-router-dom";
import NavbarCompo from "./navbar";
import Footer from "./Footer";

const Subcategory = () => {
  const location = useLocation();
  const { subcategory, city } = useParams();

  return (
    <div>
      <NavbarCompo />
      <div className="container">
        <div className="row mt-3">
          <h1 className="poppins-semibold">{subcategory}</h1>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Subcategory;
