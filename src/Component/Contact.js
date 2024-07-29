import React from "react";
import NavbarCompo from "./navbar";
import Footer from "./Footer";
import Homenavbar from "./Homenavbar";

function Contact() {
  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="row mt-4">
          <div className="poppins-light-italic">
            How Can We help you today ?
          </div>
          <div className="poppins-regular mt-1">
            You can fill the following form to address your issues.
          </div>
          <div className="row mt-2">
            <div className="col-md-7">
              {/* <div className="poppins-semibold">Send Us a Message</div> */}

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="poppins-light">First Name *</div>
                  <input
                    type="text"
                    className="input col-md-12 mt-2 vhs-input-value"
                  />
                </div>
                <div className="col-md-6">
                  <div className="poppins-light">Last Name *</div>
                  <input
                    type="text"
                    className="input col-md-12 mt-2 vhs-input-value"
                  />
                </div>
              </div>

              <div className="">
                <div className="poppins-light">Mobile Number *</div>
                <input
                  type="text"
                  className="input col-md-12 mt-2 vhs-input-value"
                />
              </div>

              <div className="">
                <div className="poppins-light">Email Id *</div>
                <input
                  type="text"
                  className="input col-md-12 mt-2 vhs-input-value"
                />
              </div>

              <div className="">
                <div className="poppins-light">Description *</div>
                <input
                  type="text"
                  className="input col-md-12 mt-2 vhs-input-value"
                />
              </div>

              <div className="d-flex">
                <div className="">
                  <input
                    type="checkbox"
                    value=""
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <div className="mx-2">
                  <div className="poppins-light">
                    I Agree to VHS{" "}
                    <span>
                      <a
                        href="/terms"
                        className="poppins-light"
                        style={{ textDecorationLine: "none" }}
                      >
                        Terms of Service
                      </a>
                    </span>{" "}
                    and{" "}
                    <span>
                      <a
                        href="/privacy"
                        className="poppins-light"
                        style={{ textDecorationLine: "none" }}
                      >
                        Privacy Policy.
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="mb-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="poppins-black mt-3"
                  style={{
                    backgroundColor: "orange",
                    padding: "6px",
                    textAlign: "center",
                    borderRadius: "5px",
                    width: "50%",
                  }}
                >
                  Send Message
                </div>
              </div>
            </div>
            {/* <div className="col-md-5">
              <div
                className="row"
                style={{
                  backgroundColor: "darkred",
                  padding: "40px",
                  borderRadius: "10px",
                }}
              >
                <div className="poppins-semibold" style={{ color: "white" }}>
                  Contact Information
                </div>
                <div className="poppins-black mt-3" style={{ color: "white" }}>
                  Vijay Home Services
                </div>
                <div
                  className="poppins-regular mt-3"
                  style={{ color: "white" }}
                >
                  #21, 4th Cross. Baddi Krishnappa Layout, Near Gangama Temple
                  Road, Mahadevpura Outer Ring Road, Bangalore - 560048
                </div>

                <div
                  className="poppins-regular mt-3"
                  style={{ color: "white" }}
                >
                  Email : <br />
                  support@vijayhomeservices.com
                </div>

                <div
                  className="poppins-regular mt-3"
                  style={{ color: "white" }}
                >
                  Mobile : <br />
                  +91 845 374 8478 <br />
                  +91 961 160 0990 <br />
                  +97 152 848 9436 (For NRI)
                </div>
              </div>
            </div> */}
            <div className="col-md-5 ">
              <div className="d-flex">
                <div
                  className="col-md-1"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ color: "darkred", fontSize: "17px" }}
                  ></i>
                </div>
                <div className="col-md-11 mx-2">
                  <div className="poppins-black">Our Office Address</div>
                  <div className="poppins-regular">
                    DTDC Building 3rd Floor, Mahadevapura Outer Ring Road,
                    Bengaluru, Karnataka - 560048
                  </div>
                </div>
              </div>

              <div className="d-flex mt-3">
                <div
                  className="col-md-1"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <i
                    className="fa-solid fa-phone"
                    style={{ color: "black", fontSize: "16px" }}
                  ></i>
                </div>
                <div className="col-md-11 mx-2">
                  <div className="poppins-regular">+91- 8453748478</div>
                </div>
              </div>

              <div className=" mt-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15550.90238463148!2d77.6883966!3d12.9893947!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156e6eec7cab%3A0x2f0fd5b9779254bb!2sVijay%20Home%20Services%20-%20Home%20Painting%20%26%20Deep%20cleaning%20Expert!5e0!3m2!1sen!2sin!4v1722236626757!5m2!1sen!2sin"
                  width="100%"
                  height="330"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Contact;
