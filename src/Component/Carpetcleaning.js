import React from "react";
import NavbarCompo from "./navbar";
import Homenavbar from "./Homenavbar";
import Footer from "./Footer";
import Carpet from "../../src/assests/carpet.jpg";
import deepcln from "../../src/assests/deepcln.webp";
import exprecln from "../../src/assests/exprecln.jpeg";
import bathromcln from "../../src/assests/bathromcln.webp";
import interiorimg from "../../src/assests/interiorimg.webp";
import clientImg from "../Assets/Images/client.jpg";
import clientImg1 from "../Assets/Images/client1.jpg";
import clientImg2 from "../Assets/Images/client2.png";
import clientImg3 from "../Assets/Images/client3.png";
import clientImg4 from "../Assets/Images/client4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Social1 from "../../src/assests/socila1.webp";
import Social from "../../src/assests/social.webp";
import Carpet7 from "../../src/assests/carpet7.jpg";

function Carpetcleaning() {
  const data = [
    { img: clientImg },
    { img: clientImg1 },
    { img: clientImg2 },
    { img: clientImg3 },
    { img: clientImg4 },
  ];

  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="row">
          <img
            src={Carpet}
            alt="Carpet cleaning Image"
            style={{ height: "270px" }}
          />
          <div className="mt-3">
            <div className="poppins-black text-center">
              Quality-focused Cleaning
            </div>
            <div className="poppins-semibold text-center mt-1">
              OUR EXPERT CLEANING SERVICES
            </div>
            <div className="poppins-regular text-center mt-1">
              Explore our wide range of Commercial & Residential cleaning
              services
            </div>

            <div className="d-flex mt-3 mb-4">
              <div className="col-md-4">
                <div
                  className=""
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={deepcln}
                    alt="Carpet Cleaning Image"
                    style={{ height: "325px", width: "300px" }}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="">
                  <img
                    src={exprecln}
                    alt="Carpet Cleaning Image"
                    style={{ height: "150px", width: "100%" }}
                  />
                </div>
                <div
                  className="d-flex mt-4"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-5">
                    <div className="">
                      <img
                        src={bathromcln}
                        alt="Carpet Cleaning Image"
                        style={{ height: "150px", width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-6">
                    <div className="">
                      <img
                        src={interiorimg}
                        alt="Carpet Cleaning Image"
                        style={{ height: "150px", width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="poppins-semibold text-center mt-1">
              UNDERSTANDING OUR CARPET CLEANING METHODS
            </div>
            <div className="row mt-4">
              <div className="col-md-4 d-flex justify-content-center">
                <div style={{ backgroundColor: "darkred", width: "320px" }}>
                  <img
                    src={deepcln}
                    alt="loading"
                    style={{ width: "320px", height: "150px" }}
                  />
                  <div className="p-2">
                    <div className="d-flex justify-content-center">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          padding: "5px 5px",
                          position: "absolute",
                          marginTop: "-20px",
                        }}
                      >
                        Carpet Encapsulation
                      </div>
                    </div>

                    <div
                      className="poppins-regular pt-3"
                      style={{ color: "white" }}
                    >
                      This low-moisture cleaning process not only cleans but
                      also protects your carpet, making it ideal for
                      high-traffic areas.
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center">
                <div style={{ backgroundColor: "darkred", width: "320px" }}>
                  <img
                    src={deepcln}
                    alt="loading"
                    style={{ width: "320px", height: "150px" }}
                  />
                  <div className="p-2">
                    <div className="d-flex justify-content-center">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          padding: "5px 5px",
                          position: "absolute",
                          marginTop: "-20px",
                        }}
                      >
                        Carpet Injection
                      </div>
                    </div>
                    <div
                      className="poppins-regular pt-3"
                      style={{ color: "white" }}
                    >
                      Perfect for tackling deep-seated stains and dirt, this
                      method ensures thorough cleaning from the base up.
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center">
                <div style={{ backgroundColor: "darkred", width: "320px" }}>
                  <img
                    src={deepcln}
                    alt="loading"
                    style={{ width: "320px", height: "150px" }}
                  />
                  <div className="p-2 ">
                    <div className="d-flex justify-content-center">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          padding: "5px 5px",
                          position: "absolute",
                          marginTop: "-20px",
                        }}
                      >
                        Carpet Shampooing
                      </div>
                    </div>
                    <div
                      className="poppins-regular pt-3"
                      style={{ color: "white" }}
                    >
                      For an extensive clean that rejuvenates your carpet’s
                      appearance, our shampooing technique is unmatched.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="poppins-semibold text-center mt-1">
              INDUSTRIES WE SERVE
            </div>

            <div className="row mt-4">
              <div className="col-md-4 d-flex justify-content-center">
                <div style={{ backgroundColor: "darkred", width: "320px" }}>
                  <img
                    src={deepcln}
                    alt="loading"
                    style={{ width: "320px", height: "150px" }}
                  />
                  <div className="p-3">
                    <div className="d-flex justify-content-center">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          padding: "5px 5px",
                          position: "absolute",
                          marginTop: "-30px",
                          width: "180px",
                        }}
                      >
                        IT Sector
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center">
                <div style={{ backgroundColor: "darkred", width: "320px" }}>
                  <img
                    src={deepcln}
                    alt="loading"
                    style={{ width: "320px", height: "150px" }}
                  />
                  <div className="p-2">
                    <div className="d-flex justify-content-center">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          padding: "5px 5px",
                          position: "absolute",
                          marginTop: "-20px",
                          width: "180px",
                        }}
                      >
                        Hospitals
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center">
                <div style={{ backgroundColor: "darkred", width: "320px" }}>
                  <img
                    src={deepcln}
                    alt="loading"
                    style={{ width: "320px", height: "150px" }}
                  />
                  <div className="p-2 ">
                    <div className="d-flex justify-content-center">
                      <div
                        className="poppins-regular text-center"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          padding: "5px 5px",
                          position: "absolute",
                          marginTop: "-20px",
                          width: "180px",
                        }}
                      >
                        Co-working office
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="poppins-semibold text-center mt-1">
              Why Choose Us?
            </div>
            <ol className="mt-3">
              <li className="poppins-regular">
                <span className="poppins-black">
                  {" "}
                  Comprehensive Cleaning Expertise :{" "}
                </span>
                Our specialized post-renovation cleaning services ensure every
                corner of your newly designed space is free from dust, debris,
                and any construction residues.
              </li>

              <li className="poppins-regular mt-3">
                <span className="poppins-black">
                  Enhanced Client Satisfaction :{" "}
                </span>
                A spotless, well-maintained space not only highlights the beauty
                of your designs but also significantly boosts client
                satisfaction.
              </li>
              <li className="poppins-regular mt-3">
                <span className="poppins-black">
                  Professional and Reliable Service :{" "}
                </span>
                Our team is known for reliability, attention to detail, and a
                commitment to delivering the highest standards of cleanliness.
              </li>
            </ol>
          </div>

          <div className="poppins-semibold text-center mt-1 mb-4">
            OUR CLIENTS
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
          >
            <div className="col-md-4" style={{ width: "100%" }}>
              {data.map((data) => (
                <SwiperSlide
                  key={data._id}
                  style={{
                    backgroundColor: "white",
                    padding: "0px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <img
                    className="mb-3"
                    src={data.img}
                    alt="loading..."
                    style={{
                      width: "100px",
                      height: "auto",
                    }}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

          <div className="row">
            <div className="poppins-semibold text-center">
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

          <div className="row ">
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

          <img
            src={Carpet7}
            alt="Carpet cleaning Image"
            style={{ width: "1005" }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Carpetcleaning;
