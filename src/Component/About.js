import React from "react";
import NabarCompo from "./navbar";
import painterIcon from "../Assets/Images/painter.svg";
import certificateIcon from "../Assets/Images/certificate.svg";
import guaranteeIcon from "../Assets/Images/guarantee.svg";
import bestpriceIcon from "../Assets/Images/bestprice.svg";
import guaranteeeIcon from "../Assets/Images/guaranteee.svg";
import networkIcon from "../Assets/Images/network.svg";
import AwardImg from "../Assets/Images/award1.jpg";
import AwardImg1 from "../Assets/Images/award2.jpg";
import AwardImg2 from "../Assets/Images/award3.jpg";
import AwardImg3 from "../Assets/Images/award4.jpg";
import AwardImg4 from "../Assets/Images/award5.jpg";
import clientImg from "../Assets/Images/client.jpg";
import clientImg1 from "../Assets/Images/client1.jpg";
import clientImg2 from "../Assets/Images/client2.png";
import clientImg3 from "../Assets/Images/client3.png";
import clientImg4 from "../Assets/Images/client4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";

function About() {
  const settings = {
    dots: false,
    infinite: false, // Set infinite to false
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    Loop: false,
  };
  const data = [
    { img: clientImg },
    { img: clientImg1 },
    { img: clientImg2 },
    { img: clientImg3 },
    { img: clientImg4 },
  ];
  return (
    <div className="row">
      <NabarCompo />
      <img
        src="./assests/offer1.jpg"
        class="d-block w-100"
        alt="..."
        style={{ height: "450px" }}
      />
      <div className="container">
        <div className="row container m-auto mt-5 mb-3">
          <p>
            Vijay Home Services is the best Home service provider company in pan
            India. We operates in all the major cities,Ex Bangalore - Hyderabad
            - Chennai -Pune-Mumbai - Delhi - Gujarat - Kolkatta ,With 40m +
            Happy Customer's , Our services include all types of Home based
            services like Home Cleaning, Painting, Pest control, marble polish,
            Appliances Repair and many more.
          </p>
          <p>
            Our aims are to provide reliable, trustworthy and affordable with
            high quality services. We are feasible and best services provider to
            our customers through our trained professionals.Our customer’s
            satisfaction is our prime objective.
          </p>
          <p>
            Our goal is to reach the door step of each and every houses and
            should be word of mouth to der family, friends.
          </p>
          <p>
            Our vision is to provide the best services to millions of pan
            Indians and our states in the best feasible and affordable manner.
          </p>
          <p>
            we make sure our team is well trained to all our professionals
            before they start serving our valued customers.
          </p>

          <div
            className="text-center mt-3"
            style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
          >
            Why choose Us ?
          </div>
          <div className="col-md-2 mt-5">
            <img
              src={painterIcon}
              alt="Painter Icon"
              style={{
                width: "100%",
                height: "60px",
              }}
            />
            <div
              className="mt-2"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Trained Professional
            </div>
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={certificateIcon}
              alt="Painter Icon"
              style={{
                width: "100%",
                height: "60px",
                display: "flex",
                alignItems: "center",
              }}
            />
            <div
              className="mt-2"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Asian Paint Certified
            </div>
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={guaranteeIcon}
              alt="Painter Icon"
              style={{
                width: "100%",
                height: "60px",
              }}
            />
            <div
              className="mt-2"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              100% Guarantee
            </div>
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={bestpriceIcon}
              alt="Painter Icon"
              style={{
                width: "100%",
                height: "60px",
              }}
            />
            <div
              className="mt-2"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Best Price Best Work
            </div>
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={guaranteeeIcon}
              alt="Painter Icon"
              style={{
                width: "100%",
                height: "60px",
              }}
            />
            <div
              className="mt-2"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              1 Year Service Warranty
            </div>
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={networkIcon}
              alt="Painter Icon"
              style={{
                width: "100%",
                height: "60px",
              }}
            />
            <div
              className="mt-2"
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              No Subcontract
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="row container m-auto mt-2 mb-3"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="text-center"
            style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
          >
            Awards and Recognition
          </div>
          <div className="col-md-2 mt-5">
            <img
              src={AwardImg}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={AwardImg1}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={AwardImg2}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={AwardImg3}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-5">
            <img
              src={AwardImg4}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="row container m-auto mt-4 mb-3"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="text-center"
            style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
          >
            Some Facts about Vijay Home Service
          </div>
          <div className="col-md-3 mt-5">
            <div
              className="text-center"
              style={{ fontSize: "35px", fontWeight: "bold" }}
            >
              40 <span style={{ fontWeight: "400" }}>M+</span>
            </div>
            <div
              className="text-center"
              style={{ fontWeight: "600", color: "black", fontSize: "1rem" }}
            >
              COMPLETED JOBS
            </div>
          </div>

          <div className="col-md-3 mt-5">
            <div
              className="text-center"
              style={{ fontSize: "35px", fontWeight: "bold" }}
            >
              31<span style={{ fontWeight: "400" }}>M+</span>
            </div>
            <div
              className="text-center"
              style={{ fontWeight: "600", color: "black", fontSize: "1rem" }}
            >
              SATISFIED CUSTOMERS
            </div>
          </div>

          <div className="col-md-3 mt-5">
            <div
              className="text-center"
              style={{ fontSize: "35px", fontWeight: "bold" }}
            >
              4 <span style={{ fontWeight: "400" }}>K+</span>
            </div>
            <div
              className="text-center"
              style={{ fontWeight: "600", color: "black", fontSize: "1rem" }}
            >
              MONTHLY JOB REQUEST
            </div>
          </div>

          <div className="col-md-3 mt-5">
            <div
              className="text-center"
              style={{ fontSize: "35px", fontWeight: "bold" }}
            >
              90 <span style={{ fontWeight: "400" }}>%</span>
            </div>
            <div
              className="text-center"
              style={{ fontWeight: "600", color: "black", fontSize: "1rem" }}
            >
              REPEAT CUSTOMERS
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="row container m-auto mt-4 mb-3"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="text-center"
            style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
          >
            Our Clients
          </div>

          <Slider {...settings}>
            {data?.map((ele, index) => (
              <div className="row mt-4">
                <div className="col-md-3">
                  <img
                    src={ele.img}
                    alt="loading..."
                    style={{
                      width: "120px",
                      height: "100px",
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
