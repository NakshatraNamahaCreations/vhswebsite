import React from "react";
import social from "../../src/assests/social.webp";
import socialone from "../../src/assests/socila1.webp";

function Footer() {
  return (
    <div
      className="row"
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
        <div className="col-md-3">
          <div
            className="poppins-black"
            style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
          >
            Company
          </div>

          <div className="f-desc">
            <a
              href="/about"
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

        <div className="col-md-3">
          <div
            className="poppins-black"
            style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
          >
            For Customers
          </div>

          <div className="f-desc poppins-regular">Categories</div>
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

        <div className="col-md-3">
          <div
            className="poppins-black"
            style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
          >
            For Partners
          </div>

          <div className="f-desc">
            <a
              className="poppins-regular"
              href="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              Register as a professional
            </a>
          </div>

          <div className="f-desc">
            <a
              className="poppins-regular"
              href="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              Register as a Investor
            </a>
          </div>
          <div className="f-desc">
            <a
              className="poppins-regular"
              href="/"
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

        <div className="col-md-3 ">
          <div
            className="poppins-black"
            style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
          >
            Social links
          </div>

          <div className="d-flex mt-3">
            <img
              src="../assests/insta.webp"
              alt="loading..."
              style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            />
            <img
              className="mx-3"
              src="../assests/youtube.png"
              alt="loading..."
              style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            />
            <img
              // className="mx-3"
              src="../assests/facebook.png"
              alt="loading..."
              style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            />
          </div>
          <img
            src={social}
            alt="loading...."
            style={{ width: "140px", height: "40px", marginTop: "10px" }}
          />
          <br />
          <img
            src={socialone}
            alt="loading...."
            style={{ width: "140px", height: "40px", marginTop: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
