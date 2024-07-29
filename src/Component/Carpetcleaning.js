import React from "react";
import Footer from "./Footer";
import NavbarCompo from "./navbar";
import Homenavbar from "./Homenavbar";
import Carpet from "../../src/assests/carpet.jpg";
import Carpet1 from "../../src/assests/carpet1.jpg";
import Carpet2 from "../../src/assests/carpet2.jpg";
import Carpet3 from "../../src/assests/carpet3.jpg";
import Carpet4 from "../../src/assests/carpet4.jpg";
import Carpet5 from "../../src/assests/carpet5.jpg";
import Carpet6 from "../../src/assests/carpet6.jpg";
import Carpet7 from "../../src/assests/carpet7.jpg";
import Social1 from "../../src/assests/socila1.webp";
import Social from "../../src/assests/social.webp";

function Cartpetcleaning() {
  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="row">
          <img src={Carpet} alt="Carpet cleaning Image" />
          <img src={Carpet1} alt="Carpet cleaning Image" />
          <img src={Carpet2} alt="Carpet cleaning Image" />
          <img src={Carpet3} alt="Carpet cleaning Image" />
          <img src={Carpet4} alt="Carpet cleaning Image" />
          <img src={Carpet5} alt="Carpet cleaning Image" />
          <img src={Carpet6} alt="Carpet cleaning Image" />
          <div className="row">
            <div className="poppins-semibold text-center mt-3">
              BOOK FREE APPOINTMENT
            </div>
            <div className="row mt-3 p-4">
              <div className="col-md-4">
                <div className="d-flex">
                  <div
                    className="col-md-6"
                    style={{
                      display: "flex",

                      justifyContent: "center",
                    }}
                  >
                    <div className="poppins-black">Name</div>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className=" c-input" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex">
                  <div
                    className="col-md-6"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="poppins-black">Contact No</div>
                  </div>
                  <div className="col-md-6">
                    <input type="number" className=" c-input" />
                  </div>
                </div>
              </div>
              <div
                className="col-md-4"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <div
                  className="text-center poppins-black p-2"
                  style={{
                    backgroundColor: "red",
                    fontSize: "14px",
                    color: "white",
                    borderRadius: "5px",
                    width: "70%",
                    height: "40px",
                  }}
                >
                  GET STARTED
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="poppins-semibold text-center">
              Get Started Today!
            </div>
            <div
              className="mt-3"
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <div
                className="col-md-6"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <a href="https://play.google.com/store/apps/details?id=com.vhs1">
                  <img
                    src={Social1}
                    alt="vhs"
                    style={{ width: "auto", height: "50px" }}
                  />
                </a>
              </div>
              <div className="col-md-6" style={{}}>
                <img
                  src={Social}
                  alt="vhs"
                  style={{ width: "auto", height: "50px" }}
                />
              </div>
            </div>
            <div className="poppins-extralight-italic text-center mt-3 mb-3">
              Download the Vijay Home Services app and book your post-interior
              cleaning service now to transform your newly renovated space into
              a pristine, livable home.
            </div>
          </div>
          <img src={Carpet7} alt="Carpet cleaning Image" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Cartpetcleaning;
