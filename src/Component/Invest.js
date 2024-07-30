import React from "react";
import NavbarCompo from "./navbar";
import Homenavbar from "./Homenavbar";
import Footer from "./Footer";
import Investimg from "../assests/invest.jpg";
import Investimg1 from "../assests/invest1.png";
import Investimg2 from "../assests/invest2.png";
import Investimg3 from "../assests/invest3.png";
import Investimg4 from "../assests/invest4.png";
import Social1 from "../../src/assests/socila1.webp";
import Social from "../../src/assests/social.webp";
import Carpet7 from "../../src/assests/carpet7.jpg";

function Invest() {
  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="">
          <img
            src={Investimg}
            style={{ width: "100%" }}
            className="Invest_Image"
            alt="Invest_Image"
          />
          <div
            className=""
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderBottom: "15px solid darkblue",
            }}
          >
            <div className="text-center poppins-semibold">
              Join Us on Our Journey to Revolutionize Home Services in India
            </div>
            <div className="poppins-regular text-center mt-2">
              At Vijay Home Services, we are committed to transforming the home
              service industry with our wide range of reliable, affordable, and
              high-quality services. Operating in 21 cities across India, we aim
              to reach every doorstep and become a household name. We invite you
              to be a part of our growth and success.
            </div>
          </div>
          <div
            className=""
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderBottom: "15px solid darkblue",
            }}
          >
            <div className="text-center poppins-semibold">
              Why Invest in Vijay Home Services?
            </div>
            <div className="d-flex">
              <div className="col-md-8">
                <div className="poppins-regular mt-2">
                  <span className="poppins-black">
                    Expanding Market Presence:{" "}
                  </span>
                  With operations in major cities like Bangalore, Hyderabad,
                  Chennai, Pune, and Mumbai, we are well-positioned to capture a
                  significant share of the growing home services market in
                  India.
                </div>

                <div className="poppins-regular mt-2">
                  <span className="poppins-black">
                    Diverse Service Offerings:{" "}
                  </span>
                  Our comprehensive range of services, including cleaning,
                  painting, pest control, floor polishing, home repairs, packers
                  and movers, appliance services, and facility management, meets
                  the diverse needs of our customers.
                </div>

                <div className="poppins-regular mt-2">
                  <span className="poppins-black">Proven Track Record: </span>
                  Our 15 years of industry experience and commitment to customer
                  satisfaction have earned us a loyal customer base and a
                  reputation for excellence.
                </div>

                <div className="poppins-regular mt-2">
                  <span className="poppins-black">
                    Eco-Friendly Practices:{" "}
                  </span>
                  We prioritize environmentally friendly products and methods,
                  meeting the increasing demand for sustainable solutions in the
                  home services industry.
                </div>

                <div className="poppins-regular mt-2">
                  <span className="poppins-black">Skilled Workforce: </span>
                  Our team of trained professionals ensures the highest quality
                  of service, setting us apart from competitors.
                </div>
              </div>
              <div
                className="col-md-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Investimg1}
                  style={{ width: "100%", mixBlendMode: "multiply" }}
                  className="Invest_Image"
                  alt="Invest_Image"
                />
              </div>
            </div>
          </div>

          <div
            className=""
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderBottom: "15px solid darkblue",
            }}
          >
            <div
              className="d-flex"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="col-md-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Investimg2}
                  style={{ width: "100%", mixBlendMode: "multiply" }}
                  className="Invest_Image"
                  alt="Invest_Image"
                />
              </div>
              <div className="col-md-7" style={{}}>
                <div className=" poppins-semibold">Our Vision for Growth</div>
                <div className="poppins-regular mt-2">
                  Our vision is to deliver the best home services to millions of
                  people across India in an affordable and efficient manner. We
                  are continuously expanding our reach and enhancing our service
                  offerings to meet the evolving needs of our customers.
                </div>
              </div>
            </div>
          </div>

          <div
            className=""
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderBottom: "15px solid darkblue",
            }}
          >
            <div
              className="d-flex"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="col-md-7" style={{}}>
                <div className=" poppins-semibold">
                  Investment Opportunities
                </div>
                <div className="poppins-regular mt-2">
                  By investing in Vijay Home Services, you are contributing to
                  the growth of a company that is dedicated to improving the
                  quality of life for families and businesses across India. We
                  offer attractive investment opportunities with the potential
                  for significant returns as we expand our operations and market
                  presence.
                </div>
              </div>
              <div className="col-md-5" style={{}}>
                <img
                  src={Investimg3}
                  style={{ width: "100%", mixBlendMode: "multiply" }}
                  className="Invest_Image"
                  alt="Invest_Image"
                />
              </div>
            </div>
          </div>

          <div
            className=""
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderBottom: "15px solid darkblue",
            }}
          >
            <div
              className="d-flex"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="col-md-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Investimg4}
                  style={{ width: "100%", mixBlendMode: "multiply" }}
                  className="Invest_Image"
                  alt="Invest_Image"
                />
              </div>
              <div className="col-md-7" style={{}}>
                <div className=" poppins-semibold">Partner with Us</div>
                <div className="poppins-regular mt-2">
                  We are looking for partners who share our vision and are
                  excited about the future of home services in India. Whether
                  you are an individual investor, venture capitalist, or a
                  strategic partner, we invite you to join us in our mission to
                  revolutionize the industry.
                </div>
              </div>
            </div>
          </div>

          <div
            className=""
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderBottom: "15px solid darkblue",
            }}
          >
            <div className="text-center poppins-semibold">Get in Touch</div>
            <div className="poppins-regular text-center mt-2">
              Ready to invest in Vijay Home Services? Contact our investment
              team to learn more about the opportunities available and how you
              can be a part of our success story.
            </div>
            <div className="d-flex mt-4" style={{ justifyContent: "center" }}>
              <div
                className="poppins-black"
                style={{
                  backgroundColor: "red",
                  padding: "8px",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "white",
                  width: "30%",
                }}
              >
                GET STARTED
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="poppins-semibold text-center">Download Our App</div>
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
          <img
            src={Carpet7}
            style={{ width: "100%" }}
            alt="Carpet cleaning Image"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Invest;
