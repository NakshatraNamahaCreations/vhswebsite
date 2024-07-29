import React, { useEffect, useState } from "react";
import NavbarCompo from "./navbar";
import Homenavbar from "./Homenavbar";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";

function Categeries() {
  const [categorydata, setCategoryData] = useState([]);
  useEffect(() => {
    getsubcategory();
  }, []);
  const getsubcategory = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("categorydata", categorydata);
  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="row mt-3" style={{ justifyContent: "center" }}>
          <div className="poppins-semibold text-center">
            Choose Your Service
          </div>
          <div className="row mt-3">
            {categorydata.map((data) => (
              <div className="col-md-2">
                <Link
                  to="/servicedetails"
                  state={({ subcategory: data.subcategory }, { data: data })}
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src={data.imglink}
                      alt="category Images"
                      style={{
                        borderRadius: "50px",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div
                    className="poppins-regular mb-4"
                    style={{ color: "black", textAlign: "center" }}
                  >
                    {data?.subcategory}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Categeries;
