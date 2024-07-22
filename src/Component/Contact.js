import React from "react";
import NavbarCompo from "./navbar";
import Footer from "./Footer";

function Contact() {
  return (
    <div>
      <NavbarCompo />
      <div className="container">
        <div className="row mt-4">
          <div className="poppins-light-italic">HAVE SOME QUESTIONS ?</div>
          <div className="poppins-regular mt-3">
            Feel Free to ask our experts.
          </div>
          <div className="row mt-4">
            <div className="col-md-7">
              <div className="poppins-semibold">Send Us a Message</div>

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

              <div className="row">
                <div className="col-md-1">
                  <input
                    type="checkbox"
                    value=""
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <div className="col-md-11">
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
                className=""
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
            <div className="col-md-5">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Contact;
