import React, { useState, useEffect } from "react";
// import Card from "react-bootstrap/Card";
import "../Component/layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
// import Review from "./review";
import { SpinnerCircular } from "spinners-react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NabarCompo from "./navbar";
import "./layout.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
import { Loop } from "@mui/icons-material";
import one from "../assests/one.jpg";
import two from "../assests/two.jpg";
import theree from "../assests/theree.jpg";
import four from "../assests/four.jpg";
import five from "../assests/five.jpg";
import six from "../assests/six.jpg";
import seven from "../assests/seven.jpg";
// Swipper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation"; // Import navigation CSS

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

// updated home
export default function Home() {
  const [Banner, setBanner] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [FilteredCategory, setFilteredCategory] = useState([]);
  const [FilteredPaint, setFilteredPaint] = useState([]);
  const [FilterCleaning, setFilterCleaning] = useState([]);
  const [FilterPestControl, setFilterPestControl] = useState([]);
  const [FilterMarbelPolish, setFilterMarbelPolish] = useState([]);
  const [FilterRepairing, setFilterRepairing] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [FilterPackers, setFilterPackers] = useState([]);
  const [FilterAppliance, setFilterAppliance] = useState([]);
  const [bannerdata, setBannerdata] = useState([]);
  const [testimonialdata, settestimonialdata] = useState([]);
  // Offer Banner
  const [offerBanner, setofferBanner] = useState([]);
  const [allcategory, setallcategory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const styles = {
    ".carousel-control-prev": {
      backgroundColor: "darkred",
      width: "45px",
      height: "45px",
      borderRadius: "50px",
      top: "50%",
      left: "50px",
    },
    ".carousel-control-next": {
      backgroundColor: "darkred",
      width: "45px",
      height: "45px",
      borderRadius: "50px",
      top: "50%",
      right: "50px",
    },
  };

  console.log("FilterRepairing=====", FilterRepairing);

  // TestiMonial

  useEffect(() => {
    getalltestimonial();
  }, []);
  const getalltestimonial = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/testimonial/getalltestimonial"
    );
    if ((res.status = 200)) {
      settestimonialdata(res.data?.data);
    }
  };
  const getEmbedUrl = (videoUrl) => {
    if (videoUrl.includes("youtube.com/shorts")) {
      const videoId = videoUrl.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtube.com/watch")) {
      const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return videoUrl;
  };

  // Offer Banner

  useEffect(() => {
    getallofferbanner();
  }, []);

  const getallofferbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/offer/getallwebdoffer"
    );
    if ((res.status = 200)) {
      setofferBanner(res.data?.offer);
    }
  };

  useEffect(() => {
    GetAllWebBanner();
    getAllCategory();
  }, []);

  const GetAllWebBanner = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/website/getallwebbanner"
      );

      if (res.status === 200) {
        setBanner(res.data.banner);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getsubcategory();
  }, []);

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/website/getallwebbanner"
    );
    if ((res.status = 200)) {
      setBannerdata(res.data?.banner);
      console.log(res.data?.banner);
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const getallcategory = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/getcategory"
    );
    if ((res.status = 200)) {
      setallcategory(res.data?.category);
    }
  };

  console.log("allcategory====", allcategory);

  const getsubcategory = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/getcategory"
      );
      if (res.status === 200) {
        if (res.data.category.length === 0) {
          setIsLoading(true);
        } else {
          setCategory(res.data.category);
          setIsLoading(false);
        }
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("FilterPestControl======", FilterPestControl);

  const justforyou = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };
  const [showModal, setShowModal] = useState(false);

  const filteredCleaning = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("cleaning")
  );
  const [viewmoreCategory, setViewMoreCategory] = useState(false);
  const handleViewMoreCategory = () => {
    setViewMoreCategory(true);
  };

  const handleViewLessCategory = () => {
    setViewMoreCategory(false);
  };
  const filteredPaint = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("painting")
  );
  const filteredpestc = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("control")
  );
  const filtermarbel = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("polishing")
  );
  const FacilityManagement = categoryData.filter(
    (cat) =>
      cat.category.toLowerCase().includes("management") ||
      cat.category.toLowerCase().includes("corporate")
  );

  const Repairing = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("repair")
  );

  const filterpackers = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("packers")
  );

  const filterappliance = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("appliance")
  );

  useEffect(() => {
    setFilteredCategory(viewmoreCategory ? category : category.slice(0, 7));
    setFilterCleaning(filteredCleaning.slice(0, 7));
    setFilteredPaint(filteredPaint.slice(0, 7));
    setFilterPestControl(filteredpestc.slice(0, 7));
    setFilterMarbelPolish(filtermarbel.slice(0, 7));
    setFilterRepairing(Repairing.slice(0, 7));
    setFilterPackers(filterpackers.slice(0, 7));
    setFilterAppliance(filterappliance.slice(0, 7));
  }, [
    category,
    viewmoreCategory,
    filteredCleaning,
    filteredPaint,
    filteredpestc,
    filtermarbel,
    Repairing,
    filterpackers,
    filterappliance,
  ]);
  const MODAL_TYPE = {
    CLEANING: "CLEANING",
    PAINT: "PAINT",
    PEST_CONTROL: "PEST_CONTROL",
    MARBEL: "MARBEL",
    REPAIRING: "REPAIRING",
    PACKERS: "PACKERS",
    APPLIANCE: "APPLIANCE",
  };
  const [filteredData, setFilteredData] = useState([]);
  const [ModalSubcategoryView, setModalSubcategoryView] = useState(false);
  const [CateGoryName, setCateGoryName] = useState(null);

  const handleCloseSubcategoryView = () => {
    setModalSubcategoryView(false);
  };
  const handleViewMore = (modalType) => {
    setShowModal(true);
    switch (modalType) {
      case MODAL_TYPE.CLEANING:
        setFilteredData(filteredCleaning);
        break;
      case MODAL_TYPE.PAINT:
        setFilteredData(filteredPaint);
        break;
      case MODAL_TYPE.PEST_CONTROL:
        setFilteredData(filteredpestc);
        break;
      case MODAL_TYPE.MARBEL:
        setFilteredData(filtermarbel);
        break;
      case MODAL_TYPE.REPAIRING:
        setFilteredData(Repairing);
        break;
      case MODAL_TYPE.PACKERS:
        setFilteredData(filterpackers);
        break;
      case MODAL_TYPE.APPLIANCE:
        setFilteredData(filterappliance);
        break;
      default:
        break;
    }
  };
  const handleShowSelectCategory = (selectedcategory) => {
    setViewMoreCategory(false);
    setCateGoryName(selectedcategory);
    setModalSubcategoryView(true);
    const item = selectedcategory.toLowerCase();

    let filteredData = categoryData.filter((cat) =>
      cat.category.toLowerCase().includes(item)
    );

    setSelectedCategory(filteredData);
  };

  console.log("filteredData=====", filteredData);

  const settings = {
    dots: false,
    infinite: false, // Set infinite to false
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    Loop: false,
  };

  const settings1 = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    Loop: false,
  };

  const cleaningItemsCount = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("cleaning")
  )?.length;

  const actualCleaningSlidesToShow = Math?.min(cleaningItemsCount, 5);

  const pestControlItemsCount = categoryData?.filter((item) =>
    item?.category?.toLowerCase()?.includes("control")
  )?.length;

  const actualPestControlSlidesToShow = Math.min(pestControlItemsCount, 5);

  const paintingcontorl = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("painting")
  )?.length;

  const painitnca = Math.min(paintingcontorl, 5);

  const commonSliderSettings = {
    className: "common-slider",
    dots: true,
    infinite: true,
    speed: 900,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    initialSlide: 1,

    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          adaptiveHeight: true,
          centerMode: true,
          dots: true,
          arrows: true,
          lazyLoad: "ondemand",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          adaptiveHeight: true,
          centerMode: true,
          dots: true,
          arrows: true,
          lazyLoad: "ondemand",
          centerPadding: 5,
        },
      },
    ],
  };
  const pestControlSettings = {
    ...commonSliderSettings,
    slidesToShow: actualPestControlSlidesToShow,
  };

  const cleaningSettings = {
    ...commonSliderSettings,
    slidesToShow: actualCleaningSlidesToShow,
  };

  const actualPaintingSetting = {
    ...commonSliderSettings,
    slidesToShow: painitnca,
  };

  const bannerimage = [
    {
      id: 1,
      image: one,
    },
    {
      id: 2,
      image: two,
    },
    {
      id: 3,
      image: theree,
    },
    {
      id: 4,
      image: four,
    },
    {
      id: 7,
      image: five,
    },
    {
      id: 6,
      image: six,
    },
    {
      id: 7,
      image: seven,
    },
  ];

  const FilterCleaningWithImages = FilterCleaning.map((item, index) => {
    const image = bannerimage[index % bannerimage.length]?.image || one;
    return {
      ...item,
      image,
    };
  });

  return (
    <>
      {isLoading ? (
        <>
          <div className="row m-auto text-center" style={{ height: "100vh" }}>
            <div className="col-md-4"></div>
            <div className="col-md-4 m-auto ">
              <SpinnerCircular
                size={90}
                thickness={87}
                speed={80}
                color="rgba(27, 22, 22, 1)"
                secondaryColor="rgba(214, 191, 91, 1)"
              />
            </div>

            <div className="col-md-4"></div>
          </div>
        </>
      ) : (
        <>
          <NabarCompo />
          {/* Carousel-----------slider */}
          <div className="">
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                {bannerdata.map((data, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={data.webbanner}
                      className="d-block w-100"
                      alt={`Banner ${index + 1}`}
                      style={{ height: "500px" }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="c-back">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="./assests/deepcln.webp"
                        alt="loading..."
                        style={{
                          width: "100%",
                          borderRadius: "20px",
                          height: "180px",
                        }}
                      />
                    </div>
                    <div
                      className="col-md-6 d-flex"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <div className="c-back-text">Cleaning Services</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Swiper
                slidesPerView={3}
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
                  {allcategory.map((data) => (
                    <SwiperSlide
                      key={data._id}
                      style={{
                        // height: "500px",
                        // width: "500px",
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={data.imglink}
                        alt="loading...."
                        style={{ width: "100%", height: "200px" }}
                      />
                      <div className="poppins-medium mt-2">{data.category}</div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper> */}
            </div>
          </div>

          <div className="container">
            <div className="poppins-semibold mt-5">Cleaning Services</div>

            {/* <Slider {...settings}>
              {FilterCleaning?.map((ele, index) => (
                <div className="row">
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele?.subcategory }}
                    key={ele.subcategory}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="col-md-4">
                      {bannerimage.map((data, index) => (
                        <div>
                          <img
                            src={data.image}
                            alt="loading...."
                            style={{ width: "200px", height: "200px" }}
                          />
                        </div>
                      ))}

                      <div className="poppins-medium"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5} // Number of slides to show
                spaceBetween={30} // Space between slides
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilterCleaningWithImages.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele.subcategory }}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {ele.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-button-prev">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>

              <div className="swiper-pagination"></div>
            </div>

            {/* Painting Services */}

            <div className="poppins-semibold mt-5">Painting Services</div>

            {/* <Slider {...settings}>
              {FilteredPaint?.map((ele, index) => (
                <div className="row">
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele?.subcategory }}
                    key={ele.subcategory}
                    style={{ textDecoration: "none" }}
                    className="text-decoration-none text-black"
                  >
                    <div className="col-md-4">
                      <img
                        src={ele.imglink}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="poppins-medium text-center">
                        {" "}
                        {ele.subcategory}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {/* FilteredPaint */}
                {FilteredPaint.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Center text
                    }}
                  >
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {ele.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-button-prev">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>

              <div className="swiper-pagination"></div>
            </div>

            {/* Pest Control */}

            <div className="poppins-semibold mt-5">Pest Control</div>

            {/* <Slider {...settings}>
              {FilterPestControl?.map((ele, index) => (
                <div className="row">
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele?.subcategory }}
                    key={ele.subcategory}
                    style={{ textDecoration: "none" }}
                    className="text-decoration-none text-black"
                  >
                    <div className="col-md-4">
                      <img
                        src={ele.imglink}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />
                      <div className="poppins-medium"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5} // Number of slides to show
                spaceBetween={30} // Space between slides
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {/* FilterPestControl */}
                {FilterPestControl.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Center text
                    }}
                  >
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {ele.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom navigation buttons */}
              <div className="swiper-button-prev">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>

              {/* Hide pagination dots */}
              <div className="swiper-pagination"></div>
            </div>

            {/* Floor Polishing  */}

            <div className="poppins-semibold mt-5">Floor Polishing</div>

            {/* <Slider {...settings}>
              {FilterMarbelPolish?.map((ele, index) => (
                <div className="row">
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele?.subcategory }}
                    key={ele.subcategory}
                    style={{ textDecoration: "none" }}
                    className="text-decoration-none text-black"
                  >
                    <div className="col-md-4">
                      <img
                        src={ele.imglink}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="poppins-medium"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5} // Number of slides to show
                spaceBetween={30} // Space between slides
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {/* FilterMarbelPolish */}
                {FilterMarbelPolish.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Center text
                    }}
                  >
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {ele.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom navigation buttons */}
              <div className="swiper-button-prev">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>

              {/* Hide pagination dots */}
              <div className="swiper-pagination"></div>
            </div>

            {/* Home Repairing Services */}

            <div className="poppins-semibold mt-5">Home Repairing Services</div>

            {/* <Slider {...settings}>
              {FilterRepairing?.map((ele, index) => (
                <div className="row">
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele?.subcategory }}
                    key={ele.subcategory}
                    style={{ textDecoration: "none" }}
                    className="text-decoration-none text-black"
                  >
                    <div className="col-md-4">
                      <img
                        src={ele.imglink}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="poppins-medium"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5} // Number of slides to show
                spaceBetween={30} // Space between slides
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {/* FilterRepairing */}
                {FilterRepairing.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Center text
                    }}
                  >
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {ele.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom navigation buttons */}
              <div className="swiper-button-prev">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>

              {/* Hide pagination dots */}
              <div className="swiper-pagination"></div>
            </div>

            {/* Packers on Movers */}

            <div className="poppins-semibold mt-5">Packers & Movers</div>

            {/* <Slider {...settings}>
              {FilterPackers?.map((ele, index) => (
                <div className="row">
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele?.subcategory }}
                    key={ele.subcategory}
                    style={{ textDecoration: "none" }}
                    className="text-decoration-none text-black"
                  >
                    <div className="col-md-4">
                      <img
                        src={ele.imglink}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="poppins-medium"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5} // Number of slides to show
                spaceBetween={30} // Space between slides
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {/* FilterPackers */}
                {FilterPackers.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Center text
                    }}
                  >
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {ele.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom navigation buttons */}
              <div className="swiper-button-prev">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>

              {/* Hide pagination dots */}
              <div className="swiper-pagination"></div>
            </div>

            {/* Appliance Services  */}

            <div className="poppins-semibold mt-5">Appliance Services</div>

            {/* <Slider {...settings}>
              {FilterAppliance?.map((ele, index) => (
                <div className="row">
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele?.subcategory }}
                    key={ele.subcategory}
                    style={{ textDecoration: "none" }}
                    className="text-decoration-none text-black"
                  >
                    <div className="col-md-4">
                      <img
                        src={ele.imglink}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="poppins-medium"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5} // Number of slides to show
                spaceBetween={30} // Space between slides
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {/* FilterAppliance */}
                {FilterAppliance.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Center text
                    }}
                  >
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {ele.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom navigation buttons */}
              <div className="swiper-button-prev">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>

              {/* Hide pagination dots */}
              <div className="swiper-pagination"></div>
            </div>

            <div className="poppins-semibold mb-2">TestiMonial</div>
            <Swiper
              slidesPerView={3}
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
              <div className="col-md-4">
                {testimonialdata.map((testimonial) => (
                  <SwiperSlide
                    key={testimonial._id}
                    style={{
                      // height: "500px",
                      // width: "500px",
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    {testimonial.videolink && (
                      <iframe
                        width="100%"
                        height="200"
                        src={getEmbedUrl(testimonial.videolink)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                    <div className="poppins-medium mt-2">
                      {testimonial.title}
                    </div>

                    <div className="poppins-medium">
                      {testimonial.Testimonialname}
                    </div>

                    <div className="poppins-regular mt-2">
                      {testimonial.review}
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>

            {/* Deal of The Week */}

            {/* <div className="row mt-5">
              <div className="col-md-6">
                <div className="c-head1 text-end mt-2">Deal of The Week</div>
              </div>

              <div className="col-md-1">
                <div className="d-back">
                  <div className="d-desc">75</div>
                  <div className="d-desc">Days</div>
                </div>
              </div>

              <div className="col-md-1">
                <div className="d-back">
                  <div className="d-desc">20</div>
                  <div className="d-desc">Hours</div>
                </div>
              </div>

              <div className="col-md-1">
                <div className="d-back">
                  <div className="d-desc">8</div>
                  <div className="d-desc">Minutes</div>
                </div>
              </div>

              <div className="col-md-1">
                <div className="d-back">
                  <div className="d-desc">8</div>
                  <div className="d-desc">Seconds</div>
                </div>
              </div>
            </div> */}

            {/* <div className="row mt-5">
              <div className="col-md-6">
                <div className="c-back" style={{ borderRadius: "20px" }}>
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="./painting/images.jpeg"
                        alt="loading..."
                        style={{
                          width: "100%",
                          borderRadius: "20px",
                          height: "250px",
                        }}
                      />
                    </div>
                    <div
                      className="col-md-6 d-flex"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="c-back-text">Painting Services</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="c-back1" style={{ borderRadius: "20px" }}>
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="./assests/deepcln.webp"
                        alt="loading..."
                        style={{
                          width: "100%",
                          borderRadius: "20px",
                          height: "250px",
                        }}
                      />
                    </div>
                    <div
                      className="col-md-6 d-flex"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="c-back-text">Cleaning Services</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="poppins-semibold mt-3">Offer Announcement</div>

            <div className="row mt-3">
              {offerBanner.map((data) => (
                <div className="col-md-6">
                  <img
                    src={data.offer}
                    alt="loading..."
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))}

              {/* <div className="col-md-6">
                <img
                  src="./assests/offer1.jpg"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "10px",
                  }}
                />
              </div> */}
            </div>

            <div className="c-head1  mt-5">Best Ongoing Services</div>

            <div className="row mt-4">
              <div className="col-md-3">
                <img
                  src="./assests/ac.jpg"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <div className="poppins-medium">AC Services</div>
              </div>

              <div className="col-md-3">
                <img
                  src="./pestcontrol/images.jpeg"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <div className="poppins-medium">Pest Control Services</div>
              </div>

              <div className="col-md-3">
                <img
                  src="./assests/ac.jpg"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <div className="poppins-medium">Cleaning Services</div>
              </div>
              <div className="col-md-3">
                <img
                  src="./painting/images.jpeg"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <div className="poppins-medium">Painting Services</div>
              </div>
            </div>

            <div className="row mt-5">
              <h2 className="row">Corporate Facility Management</h2>
            </div>
            <div className="row mb-5 brclr1 p-4">
              {FacilityManagement?.map((ele, index) => (
                <div className="col-md-2 ">
                  <div className="row  ">
                    <div className="col-md-10">
                      <Link
                        to="/servicedetails"
                        state={{ subcategory: ele?.subcategory }}
                        key={ele.subcategory}
                        style={{ textDecoration: "none" }}
                        className="text-decoration-none text-black"
                      >
                        <img
                          className=" p-0 subimg3 shadow"
                          width={130}
                          height={130}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />{" "}
                        <p className="row fnt12 text-center m-auto p-2 boldt">
                          {ele.subcategory}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>All Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row m-auto p-4">
            {filteredData?.map((ele, index) => (
              <div className="col-md-3 ">
                <div className="row  mb-4">
                  <div className="col-md-10">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                        <img
                          className="subimg p-0 bg-white"
                          width={120}
                          height={120}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />
                      </div>
                      <p className="row fnt12 text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={viewmoreCategory} onHide={handleViewLessCategory}>
        <Modal.Header closeButton>
          <Modal.Title>All Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-4">
            {FilteredCategory?.map((ele, index) => (
              <div className="col-md-4">
                <div className="row">
                  <Link
                    className="linkt"
                    onClick={() => handleShowSelectCategory(ele.category)}
                  >
                    <div className="col-md-10">
                      <img
                        className="mb-3"
                        width={60}
                        height={60}
                        alt=""
                        src={`https://api.vijayhomesuperadmin.in/category/${ele?.categoryImg}`}
                      />
                      <p className="fnt col-md-10">{ele.category}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleViewLessCategory}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={ModalSubcategoryView}
        onHide={handleCloseSubcategoryView}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Subcategory Of {CateGoryName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-4">
            {SelectedCategory?.map((ele, index) => (
              <div className="col-md-3 ">
                <div className="row  mb-4">
                  <div className="col-md-10 ">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                        <img
                          className="subimg p-0 bg-white"
                          width={120}
                          height={120}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />
                      </div>
                      <p className="row fnt12 text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleCloseSubcategoryView}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
