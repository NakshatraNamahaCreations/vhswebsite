import React from "react";
import social from "../../src/assests/social.webp";
import socialone from "../../src/assests/socila1.webp";
import Footerimg from "../../src/assests/Footerimg.webp";
import homeicon from "../../src/assests/home_icon.png";
import whatsappcon from "../../src/assests/whatsapp_icon.png";
import callicon from "../../src/assests/call_icon.png";

function Footer() {
  return (
    <>
      <div
        className="row Footerweb"
        style={{
          backgroundColor: "aliceblue",
          padding: "30px",
        }}
      >
        <div className="d-flex">
          <img
            src="https://vijayahomeservices.b-cdn.net/vhs-lgo.png"
            alt="loading...."
            style={{ width: "60px", height: "55px" }}
          />
          <div
            className="mx-3 mt-2 pt-1 poppins-semibold"
            style={{ color: "darkred", fontSize: "20px", fontWeight: "bold" }}
          >
            Vijay Home Services
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-3 mb-3">
            <div
              className="poppins-black"
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              Company
            </div>

            <div className="f-desc">
              <a
                href="/about-us"
                className="poppins-regular"
                style={{ textDecoration: "none", color: "black" }}
              >
                About Us
              </a>
            </div>

            <div className="f-desc poppins-regular">
              <a
                href="/terms"
                className="poppins-regular"
                style={{ textDecoration: "none", color: "black" }}
              >
                Terms & conditions
              </a>
            </div>
            <div className="f-desc poppins-regular">
              <a
                href="/privacy"
                className="poppins-regular"
                style={{ textDecoration: "none", color: "black" }}
              >
                Privacy policy
              </a>
            </div>

            <div className="f-desc poppins-regular">
              {" "}
              <a
                href="/cancellation"
                className="poppins-regular"
                style={{ textDecoration: "none", color: "black" }}
              >
                Cancellation policy
              </a>
            </div>
            <div className="f-desc poppins-regular">
              {" "}
              <a
                className="poppins-regular"
                href="/career"
                style={{ textDecoration: "none", color: "black" }}
              >
                Career
              </a>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="poppins-black"
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              For Customers
            </div>

            <div className="f-desc poppins-regular">
              <a
                className="poppins-regular"
                href="/categories"
                style={{ textDecoration: "none", color: "black" }}
              >
                Categories
              </a>
            </div>
            <div className="f-desc poppins-regular">Blog</div>
            <div className="f-desc poppins-regular">
              <a
                className="poppins-regular"
                href="/contact"
                style={{ textDecoration: "none", color: "black" }}
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="poppins-black"
              style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
            >
              For Partners
            </div>

            <div className="f-desc">
              <a
                className="poppins-regular"
                href="/joinus"
                style={{ textDecoration: "none", color: "black" }}
              >
                Register as a professional
              </a>
            </div>

            <div className="f-desc">
              <a
                className="poppins-regular"
                href="/invest"
                style={{ textDecoration: "none", color: "black" }}
              >
                Register as a Investor
              </a>
            </div>
            <div className="f-desc">
              <a
                className="poppins-regular"
                href="/interiorcompany"
                style={{ textDecoration: "none", color: "black" }}
              >
                Interior Company Collaboration
              </a>
            </div>
            <div className="f-desc">
              <a
                className="poppins-regular"
                href="/"
                style={{ textDecoration: "none", color: "black" }}
              >
                Commercial Carpet Cleaning
              </a>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="poppins-black"
              style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
            >
              Social links
            </div>

            <div className="d-flex mt-3">
              <a href="https://www.instagram.com/vijayhomeservices/">
                <img
                  src="../assests/insta.webp"
                  alt="loading..."
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "20px",
                  }}
                />
              </a>

              <a href="https://www.youtube.com/channel/UC72EHMng8A2mr0Xs7YnoH4g">
                <img
                  className="mx-3"
                  src="../assests/youtube.png"
                  alt="loading..."
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "20px",
                  }}
                />
              </a>

              <a href="https://www.linkedin.com/company/vijay-home-services/?viewAsMember=true">
                <img
                  // className="mx-3"
                  src="../assests/linkdin.jpeg"
                  alt="loading..."
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "20px",
                  }}
                />
              </a>

              <a href="https://x.com/vijay_home_serv">
                <img
                  className="mx-3"
                  src="../assests/twitter.jpeg"
                  alt="loading..."
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "20px",
                  }}
                />
              </a>
            </div>
            <a href="https://play.google.com/store/apps/details?id=com.vhs1">
              <img
                src={social}
                alt="loading...."
                style={{ width: "140px", height: "40px", marginTop: "10px" }}
              />
            </a>

            <br />
            <a href="https://play.google.com/store/apps/details?id=com.vhs1">
              <img
                src={socialone}
                alt="loading...."
                style={{ width: "140px", height: "40px", marginTop: "10px" }}
              />
            </a>
          </div>
        </div>

        {/* <div className="text-center poppins-black">
        ©2024 Vijay Home Services .All rights reserved. Designed and Developed
        By Nakshatra Namaha Creations
      </div> */}
      </div>
      <div
        className="d-flex Footermobile"
        style={{ justifyContent: "space-around" }}
      >
        <div className="col-md-2 text-center">
          <a href="/" style={{ textDecoration: "none", color: "black" }}>
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <img
                src={homeicon}
                alt="Home"
                style={{ width: "20px", height: "20px" }}
              />
            </div>

            <div
              className="poppins-extralight pt-1"
              style={{ fontSize: "12px" }}
            >
              Home
            </div>
          </a>
        </div>
        <div className="col-md-2 text-center">
          <a
            href="https://wa.me/919611600990?text=Hi%20I'm%20looking%20for%20the%20services%20from%20you,%20Please%20reach%20out%20to%20me%20soon"
            style={{ textDecoration: "none", color: "inherit" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <img
                src={whatsappcon}
                alt="Whatsapp"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
            <div
              className="poppins-extralight pt-1"
              style={{ fontSize: "12px" }}
            >
              Whatsapp
            </div>
          </a>
        </div>
        <div className="col-md-2 text-center">
          <a
            href="tel:+918453748478"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <img
                src={callicon}
                alt="Call Us"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
            <div
              className="poppins-extralight pt-1"
              style={{ fontSize: "12px" }}
            >
              Call Us
            </div>
          </a>
        </div>
        <div className="col-md-6">
          <div className="d-flex" style={{ justifyContent: "center" }}>
            <a href="https://play.google.com/store/apps/details?id=com.vhs1">
              <img
                src={socialone}
                alt="Whatsapp"
                style={{ width: "80px", height: "20px" }}
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.vhs1">
              <img
                className="mx-2"
                src={social}
                alt="Whatsapp"
                style={{ width: "80px", height: "20px" }}
              />
            </a>
          </div>
          <div
            className="poppins-extralight text-center pt-1"
            style={{ fontSize: "12px" }}
          >
            Download Our App Today!
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
