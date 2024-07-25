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
import Aboutgif from "../../src/assests/aboutgif.gif";

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

      <div className="container">
        <div className="row container m-auto  mb-3">
          <img
            src={Aboutgif}
            class="d-block w-100"
            alt="..."
            style={{ height: "350px" }}
          />
          <p className="poppins-regular mt-3">
            Vijay Home Services is a premier home service provider operating in
            21 cities across India, including Bangalore, Hyderabad, Chennai,
            Pune, Mumbai, and many more.
          </p>
          <p className="poppins-regular">
            We offer a wide range of home-based services, including cleaning,
            painting, pest control, floor polishing, home repair services,
            packers and movers, appliance services, and facility management. Our
            aim is to provide reliable, trustworthy, and affordable services
            with the highest quality through our trained professionals. Customer
            satisfaction is our primary objective.
          </p>
          <p className="poppins-regular">
            Our goal is to reach every doorstep and become a household name,
            recommended by families and friends.
          </p>

          <div className="row">
            <div className="col-md-6">
              <div className="poppins-semibold">Our Vision</div>
              <p className="poppins-regular mt-2">
                Our vision is to deliver the best services to millions of people
                across India in an affordable and efficient manner. We ensure
                our team is well-trained and prepared before they start serving
                our valued customers.
              </p>
            </div>
            <div className="col-md-6">
              <div className="poppins-semibold">Our Mission</div>
              <p className="poppins-regular mt-2">
                Our mission is to deliver the best cleaning services across the
                states by using high-quality equipment and environmentally
                friendly detergents, backed by a professional team with
                sufficient training and experience.
              </p>
            </div>
          </div>

          <div
            className="text-center mt-3"
            style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
          >
            Why choose Us ?
          </div>
          <p className="poppins-regular mt-2 text-center">
            Vijay Home Services is India's leading home repair services
            provider, offering extended warranty, damage protection, AMC plans,
            and on-demand repair services. We cover all types of home repair
            services, including cleaning, painting, pest control, floor
            polishing, home repair services, packers and movers, appliance
            services, and facility management. Our services cater to both
            household and commercial areas.
          </p>

          <div className="col-md-2 mt-3">
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

          <div className="col-md-2 mt-3">
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

          <div className="col-md-2 mt-3">
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

          <div className="col-md-2 mt-3">
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

          <div className="col-md-2 mt-3">
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

          <div className="col-md-2 mt-3">
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

          <div className="poppins-semibold">Why We Stand Out</div>

          <div className="poppins-light mt-2">
            Trained Professionals:{" "}
            <span className="poppins-regular">
              Our team is composed of skilled and trained professionals
            </span>
          </div>

          <div className="poppins-light mt-2">
            Asian Paint Certified:{" "}
            <span className="poppins-regular">
              We are certified by Asian Paints, ensuring high-quality service.
            </span>
          </div>

          <div className="poppins-light mt-2">
            100% Guarantee:{" "}
            <span className="poppins-regular">
              We provide a full guarantee on our services.
            </span>
          </div>

          <div className="poppins-light mt-2">
            Best Price, Best Work:{" "}
            <span className="poppins-regular">
              We offer competitive pricing without compromising on quality.
            </span>
          </div>
          <div className="poppins-light mt-2">
            1 Year Service Warranty:{" "}
            <span className="poppins-regular">
              Enjoy peace of mind with our one-year service warranty.
            </span>
          </div>

          <div className="poppins-light mt-2">
            No Subcontracting:{" "}
            <span className="poppins-regular">
              We handle all services in-house, ensuring consistent quality and
              reliability.
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="row container m-auto mt-2"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="text-center"
            style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
          >
            Awards and Recognition
          </div>
          <div className="col-md-2 mt-4">
            <img
              src={AwardImg}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-4">
            <img
              src={AwardImg1}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-4">
            <img
              src={AwardImg2}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-4">
            <img
              src={AwardImg3}
              alt="loading"
              style={{
                width: "100%",
                height: "200px",
              }}
            />
          </div>

          <div className="col-md-2 mt-4">
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
          <div className="col-md-3 mt-3">
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

          <div className="col-md-3 mt-3">
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

          <div className="col-md-3 mt-3">
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

          <div className="col-md-3 mt-3">
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
