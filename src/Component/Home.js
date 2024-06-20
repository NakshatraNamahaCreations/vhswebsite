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

  console.log("bannerdata====", bannerdata);

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
    const image =
      bannerimage[index % bannerimage.length]?.image || defaultImage;
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
                      src={`https://api.vijayhomesuperadmin.in/webBanner/${data?.banner}`}
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
              <div className="col-md-4">
                <div className="c-back1">
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
                      <div className="c-back-text">Painting Services</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="c-back2">
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
                      <div className="c-back-text">Pest Control Services</div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="c-head mt-5">Cleaning Services</div>

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

                      <div className="c-desc"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider> */}

            <Slider {...settings}>
              {FilterCleaningWithImages.map((ele, index) => (
                <div className="row" key={index}>
                  <Link
                    to="/servicedetails"
                    state={{ subcategory: ele.subcategory }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="col-md-4">
                      <div>
                        <img
                          src={ele.image}
                          alt="loading...."
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                      <div className="c-desc" style={{ textAlign: "center" }}>
                        {" "}
                        {ele.subcategory}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Painting Services */}

            <div className="c-head mt-5">Painting Services</div>

            <Slider {...settings}>
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
                        src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="c-desc text-center">
                        {" "}
                        {ele.subcategory}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Pest Control */}

            <div className="c-head mt-5">Pest Control</div>

            <Slider {...settings}>
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
                        src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />
                      <div className="c-desc"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Floor Polishing  */}

            <div className="c-head mt-5">Floor Polishing</div>

            <Slider {...settings}>
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
                        src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="c-desc"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Home Repairing Services */}

            <div className="c-head mt-5">Home Repairing Services</div>

            <Slider {...settings}>
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
                        src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="c-desc"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Bannner */}

            <div className="mt-5">
              <img
                src="./assests/Appliances-Repair-Service.jpg"
                alt="loading...."
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            {/* Packers on Movers */}

            <div className="c-head mt-5">Packers & Movers</div>

            <Slider {...settings}>
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
                        src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="c-desc"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Appliance Services  */}

            <div className="c-head mt-5">Appliance Services</div>

            <Slider {...settings}>
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
                        src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        alt="loading..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="c-desc"> {ele.subcategory}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>

            {/* Facility Management  */}

            {/* <div className="c-head mt-5">Facility Management</div>

            <div className="d-flex  mt-3" style={{ gap: "20px" }}>
              <div className="col-md-2">
                <img
                  src="./assests/deepcln.webp"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <div className="c-desc">Deep Cleaning</div>
              </div>

              <div className="col-md-2">
                <img
                  src="./assests/deepcln.webp"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <div className="c-desc">Deep Cleaning</div>
              </div>
            </div> */}

            {/* Best Ongoing Services */}

            {/* <div className="c-head1 mt-5 text-center">
              Best Ongoing Services
            </div>

            <div className="row mt-4">
              <div className="col-md-3">
                <div className="b-back">
                  <img
                    src="./cleaning/download.jpeg"
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "20px",
                    }}
                  />
                  <div className="b-desc">Cleaning Services</div>
                  <div className="d-flex mt-3">
                    <div className="b-desc1 ">₹1500</div>
                    <div className="b-desc2">₹ 999</div>
                  </div>

                  <div className="b-button mt-4">
                    <span>
                      <i
                        class="fa-solid fa-cart-shopping"
                        style={{
                          color: "white",
                          fontSize: "14px",
                          marginRight: "10px",
                        }}
                      ></i>
                    </span>
                    Add to cart
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="b-back">
                  <img
                    src="./pestcontrol/images.jpeg"
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "20px",
                    }}
                  />
                  <div className="b-desc">Pest control Services</div>
                  <div className="d-flex mt-3">
                    <div className="b-desc1 ">₹1500</div>
                    <div className="b-desc2">₹ 999</div>
                  </div>

                  <div className="b-button mt-4">
                    <span>
                      <i
                        class="fa-solid fa-cart-shopping"
                        style={{
                          color: "white",
                          fontSize: "14px",
                          marginRight: "10px",
                        }}
                      ></i>
                    </span>
                    Add to cart
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="b-back">
                  <img
                    src="./assests/ac.jpg"
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "20px",
                    }}
                  />
                  <div className="b-desc">AC Services</div>
                  <div className="d-flex mt-3">
                    <div className="b-desc1 ">₹1500</div>
                    <div className="b-desc2">₹ 999</div>
                  </div>

                  <div className="b-button mt-4">
                    <span>
                      <i
                        class="fa-solid fa-cart-shopping"
                        style={{
                          color: "white",
                          fontSize: "14px",
                          marginRight: "10px",
                        }}
                      ></i>
                    </span>
                    Add to cart
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="b-back">
                  <img
                    src="./painting/download.jpeg"
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "20px",
                    }}
                  />
                  <div className="b-desc">Painting Services</div>
                  <div className="d-flex mt-3">
                    <div className="b-desc1 ">₹1500</div>
                    <div className="b-desc2">₹ 999</div>
                  </div>

                  <div className="b-button mt-4">
                    <span>
                      <i
                        class="fa-solid fa-cart-shopping"
                        style={{
                          color: "white",
                          fontSize: "14px",
                          marginRight: "10px",
                        }}
                      ></i>
                    </span>
                    Add to cart
                  </div>
                </div>
              </div>
            </div> */}

            {/* Deal of The Week */}

            <div className="row mt-5">
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
            </div>

            <div className="row mt-5">
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
            </div>

            <div className="c-head1 mt-5 text-center">Offer Announcement</div>

            <div className="row mt-5">
              <div className="col-md-6">
                <img
                  src="./assests/offer.jpg"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="col-md-6">
                <img
                  src="./assests/offer1.jpg"
                  alt="loading..."
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "10px",
                  }}
                />
              </div>
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
                <div className="c-desc">AC Services</div>
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
                <div className="c-desc">Pest Control Services</div>
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
                <div className="c-desc">Cleaning Services</div>
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
                <div className="c-desc">Painting Services</div>
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
