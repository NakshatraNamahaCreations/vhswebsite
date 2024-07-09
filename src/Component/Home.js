import React, { useState, useEffect } from "react";
import "../Component/layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NabarCompo from "./navbar";
import "./layout.css";
import Footer from "./Footer";
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
import hbanner from "../assests/hbanner.jpg";
import hbanner1 from "../assests/hbanner1.jpg";
import hbanner2 from "../assests/hbanner2.jpg";
import hbanner3 from "../assests/hbanner3.jpg";
import hbanner4 from "../assests/hbanner4.jpg";
import hbanner5 from "../assests/hbanner5.jpg";
import hbanner6 from "../assests/hbanner6.jpg";
import { setstoreCity } from "../dataStoreComponent/citySlice";
import { useSelector, useDispatch } from "react-redux";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import deal from "../../src/assests/deal.png";

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
  const [thoughtfull, setthoughtfull] = useState([]);
  const [homepagetitledata, sethomepagetitledata] = useState([]);
  const [sdata, setsdata] = useState([]);
  const [servicedata, setservicedata] = useState([]);
  const [secondsdata, setsecondsdata] = useState([]);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [activeCity, setActiveCity] = useState("");
  const distpatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;

  // Searc Modal
  const [searchlist, setSearchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getsearch();
  }, []);

  const getsearch = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat"
    );
    if (res.status === 200) {
      setSearchlist(res.data?.subcategory);
    }
  };

  console.log("searchlist", searchlist);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchlist.filter((data) => {
        const categoryMatches = data.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const subcategoryMatches = data.subcategory
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return categoryMatches || subcategoryMatches;
      });
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]); // Clear the results when the search query is empty
    }
  }, [searchQuery, searchlist]);

  useEffect(() => {
    // if (pathName === "/") {
    setOpenResetModal(true);
    // }
  }, []);

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
  const [selectedOption, setSelectedOption] = useState({
    value: "0",
    text: "Select City",
    icon: (
      <svg id="flag-icons-in" viewBox="0 0 640 480">
        <path fill="#f93" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#128807" d="M0 320h640v160H0z" />
        <g transform="matrix(3.2 0 0 3.2 320 240)">
          <circle r="20" fill="#008" />
          <circle r="17.5" fill="#fff" />
          <circle r="3.5" fill="#008" />
          <g id="d">
            <g id="c">
              <g id="b">
                <g id="a" fill="#008">
                  <circle r=".9" transform="rotate(7.5 -8.8 133.5)" />
                  <path d="M0 17.5.6 7 0 2l-.6 5L0 17.5z" />
                </g>
                <use width="100%" height="100%" transform="rotate(15)" />
              </g>
              <use width="100%" height="100%" transform="rotate(30)" />
            </g>
            <use width="100%" height="100%" transform="rotate(60)" />
          </g>
          <use width="100%" height="100%" transform="rotate(120)" />
          <use width="100%" height="100%" transform="rotate(-120)" />
        </g>
      </svg>
    ),
  });

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );
      if (res.status === 200) {
        const sortedCities = res.data.mastercity.sort((a, b) =>
          a.city.localeCompare(b.city)
        );
        setCity(sortedCities);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const handleResetModal = () => {
    setOpenResetModal(true);
  };
  const handleChange = (e) => {
    setSelectedOption(selectedOption);
    setActiveCity(e.city);
    setSelectedCity(e.city);
    localStorage.setItem("city", e.city);
    distpatch(setstoreCity(selectedOption.text));
    distpatch(setstoreCity(e.city));
    setOpenResetModal(false);
  };

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
    getservices();
  }, []);

  const getservices = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat"
    );
    if (res.status === 200) {
      const data = res.data?.subcategory;
      const filteredData = data.filter((i) => {
        const shouldInclude = i.homePagetitle === homepagetitledata[0]?.title;

        return shouldInclude;
      });

      setsdata(res.data?.subcategory);

      setservicedata(filteredData);
      setsecondsdata(
        data.filter((i) => i.homePagetitle === homepagetitledata[1]?.title)
      );
    }
  };

  useEffect(() => {
    getallthoughtfull();
  }, []);

  const getallthoughtfull = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/creation/getallwebcreation"
    );
    if ((res.status = 200)) {
      setthoughtfull(res.data?.creation);
    }
  };

  console.log("allthoughtfull=====", thoughtfull);

  useEffect(() => {
    gethomepagetitle();
  }, []);

  const gethomepagetitle = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/gettitle"
    );
    if ((res.status = 200)) {
      sethomepagetitledata(res.data?.homepagetitle);
    }
  };

  console.log("homepagetitle======", homepagetitledata);

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

  const getCategoryColor = (category) => {
    const colors = {
      Cleaning: "#FFB6C1",
      Painting: "#ADD8E6",
      "Pest Control": "#98FB98",
      "Floor Polishing": "#FFD700",
      "Home Repair Services": "#FFA07A",
      "Packers & Movers": "#20B2AA",
      "Appliance Service": "#9370DB",
      "Facility Management": "#FF6347",
    };
    return colors[category] || "#D3D3D3";
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

  const Bannerimages = [
    { images: hbanner },
    { images: hbanner1 },
    { images: hbanner2 },
    { images: hbanner3 },
    { images: hbanner4 },
    { images: hbanner5 },
    { images: hbanner6 },
  ];
  const [showModal, setShowModal] = useState(false);
  const filteredCleaning = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("cleaning")
  );
  const [viewmoreCategory, setViewMoreCategory] = useState(false);
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
    setFilteredCategory(viewmoreCategory ? category : category);
    setFilterCleaning(filteredCleaning);
    setFilteredPaint(filteredPaint);
    setFilterPestControl(filteredpestc);
    setFilterMarbelPolish(filtermarbel);
    setFilterRepairing(Repairing);
    setFilterPackers(filterpackers);
    setFilterAppliance(filterappliance);
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

  const getEmbedUrl1 = (videoUrl) => {
    return videoUrl;
  };

  console.log("FilterCleaningWithImages=====", FilterCleaningWithImages);

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
                      style={{ height: "250px" }}
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

          {/* <div
            className="row"
            style={{
              backgroundColor: "skyblue",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <div className="col-md-8  col-sm-12 col-xs-12">
              <div
                className="poppins-semibold mb-4"
                style={{ textAlign: "center" }}
              >
                The Award winning company
              </div>
              <input
                type="text"
                className="col-md-12 poppins-black"
                placeholder="Search for Services"
                style={{ height: "45px", paddingLeft: "140px" }}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <div
                onClick={handleResetModal}
                className="d-flex"
                style={{
                  position: "absolute",
                  marginTop: "-54px",
                  marginLeft: "15px",
                  borderRight: "2px solid black",
                }}
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{
                    fontSize: "16px",
                    marginTop: "3px",
                    color: "darkred",
                  }}
                ></i>
                <div
                  className="poppins-medium mx-2"
                  style={{ fontSize: "16px" }}
                >
                  {selectedCity ? selectedCity : "Select City"}
                </div>
              </div>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  marginTop: "13px",
                  marginLeft: "-40px",
                }}
              ></i>
            </div>
          </div>

          <div className="">
            {filteredResults.map((data) => (
              <div className="row" style={{ justifyContent: "center" }}>
                <div className="col-md-3 ">
                  <Link
                    className="row"
                    to="/servicedetails"
                    state={{ subcategory: data.subcategory }}
                    style={{
                      textDecoration: "none",
                      backgroundColor: "white",
                      padding: "10px",
                    }}
                  >
                    <div className="col-md-3">
                      <img
                        src={data.imglink}
                        alt="Subcategory"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="col-md-9" style={{}}>
                      <div
                        className="poppins-regular"
                        style={{ color: "black" }}
                      >
                        {data?.category}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{ color: "black" }}
                      >
                        {data?.subcategory}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div> */}
          <div
            className="row"
            style={{
              backgroundColor: "skyblue",
              padding: "20px",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div
                className="poppins-semibold mb-4"
                style={{ textAlign: "center" }}
              >
                The Award winning company
              </div>
              <input
                type="text"
                className="col-md-12 poppins-regular"
                placeholder="Search for Services"
                style={{
                  height: "45px",
                  paddingLeft: "140px",
                  fontSize: "16px",
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <div
                onClick={handleResetModal}
                className="d-flex"
                style={{
                  position: "absolute",
                  marginTop: "-54px",
                  marginLeft: "15px",
                  borderRight: "2px solid black",
                }}
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{
                    fontSize: "16px",
                    marginTop: "3px",
                    color: "darkred",
                  }}
                ></i>
                <div
                  className="poppins-regular mx-2"
                  style={{ fontSize: "16px", marginTop: "2px" }}
                >
                  {selectedCity ? selectedCity : "Select City"}
                </div>
              </div>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  marginTop: "13px",
                  marginLeft: "-40px",
                }}
              ></i>
            </div>

            {/* Display search results */}
            {searchQuery.length > 0 && (
              <div
                className="search-results"
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  width: "33%",
                  maxHeight: "300px",
                  overflowY: "auto",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  marginTop: "105px",
                  zIndex: 1000,
                  left: "40%",
                  right: "10%",
                }}
              >
                {filteredResults.length > 0 ? (
                  filteredResults.map((data) => (
                    <div
                      className="row"
                      key={data._id}
                      style={{ justifyContent: "center", padding: "5px 5px" }}
                    >
                      <div className="col-md-12">
                        <Link
                          to="/servicedetails"
                          state={{ subcategory: data.subcategory }}
                          style={{
                            textDecoration: "none",
                            backgroundColor: "white",
                            // padding: "10px",
                          }}
                        >
                          <div className="row">
                            <div className="col-md-3">
                              <img
                                src={data.imglink}
                                alt="Subcategory"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "5px",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                            <div className="col-md-9 mt-3">
                              <div
                                className="poppins-regular"
                                style={{ color: "black" }}
                              >
                                {data?.category}
                              </div>
                              <div
                                className="poppins-regular"
                                style={{ color: "black" }}
                              >
                                {data?.subcategory}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* {searchQuery.length > 0 ? (
            filteredResults.map((data) => (
              <Link
                className="row shadow"
                to="/servicedetails"
                state={{ subcategory: data.subcategory }}
                style={{
                  textDecoration: "none",
                  backgroundColor: "white",
                  padding: "15px",
                }}
              >
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={`https://api.vijayhomesuperadmin.in/subcat/${data?.subcatimg}`}
                        alt="Subcategory"
                        style={{
                          width: "100%",
                          height: 70,
                          borderRadius: 5,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div
                      className="col-md-8"
                      style={{
                        justifyContent: "center",
                        marginLeft: "15px",
                      }}
                    >
                      <div style={{ color: "black" }}>{data?.category}</div>
                      <div style={{ color: "black" }}>{data?.subcategory}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ color: "black" }}>No results found</div>
            </div>
          )} */}

          <div className="container mt-3">
            <div className="row">
              {/* <div className="col-md-4">
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
              </div> */}
              <div className="poppins-semibold" style={{ fontSize: "20px" }}>
                Thoughtful Curations
              </div>
              <div className="poppins-medium-italic mt-1 mb-4">
                Of our finest experiences
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
                  {thoughtfull.map((data) => (
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
                      <iframe
                        src={getEmbedUrl1(data.creationslink)}
                        title={data.category}
                        width="200px"
                        height="300px"
                        style={{ borderRadius: 10 }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>

          <div className="container mt-3">
            <div className="row">
              {/* <div className="col-md-4">
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
              </div> */}
              <div className="poppins-semibold mb-4">Category </div>

              {/* {allcategory.map((data) => (
                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          src={data.imglink}
                          alt="loading...."
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>
              ))} */}

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
                  {/* allcategory */}
                  {Bannerimages.map((data) => (
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
                      {/* <div
                        style={{
                     
                          backgroundColor: getCategoryColor(data.category),
                          padding: "10px",
                          width: "100%",
                          paddingLeft: "10px",
                          borderRadius: 5,
                        }}
                      >
                        <div className="row">
                          <div className="col-md-7">
                            <img
                              src={data.imglink}
                              alt="loading..."
                              style={{
                                width: "100%",
                                borderRadius: "5px",
                                height: "150px",
                              }}
                            />
                          </div>
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div className="poppins-medium">
                              {data.category}
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <img
                        src={data.images}
                        style={{
                          width: "350px",
                          height: "200px",
                          borderRadius: "10px",
                        }}
                        alt="loading...."
                      />
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>

          <div className="container">
            <div className="poppins-semibold mt-4 mb-2">
              Cleaning Services
              <span
                style={{
                  backgroundColor: "#FFB6C1",
                  padding: "3px 25px",
                  borderRadius: "20px",
                }}
                className="poppins-black mx-2"
              >
                up to 50% off
              </span>
            </div>
            <div className="mt-4" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-cleaning",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-cleaning",
                  prevEl: ".swiper-button-prev-cleaning",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilterCleaningWithImages.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="col-md-4"
                        style={{
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-cleaning">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-cleaning">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-cleaning"></div>
            </div>

            {/* Painting Services */}
            <div className="poppins-semibold mt-2 mb-2">
              Painting Services{" "}
              <span
                style={{
                  backgroundColor: "#ADD8E6",
                  padding: "3px 25px",
                  borderRadius: "20px",
                }}
                className="poppins-black mx-2"
              >
                100 % In House Staff
              </span>
            </div>
            <div className="mt-4" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-painting",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-painting",
                  prevEl: ".swiper-button-prev-painting",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilteredPaint.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-painting">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-painting">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-painting"></div>
            </div>

            {/* Pest Control */}
            <div className="poppins-semibold mt-4 mb-2">
              Pest Control{" "}
              <span
                style={{
                  backgroundColor: "#98FB98",
                  padding: "3px 25px",
                  borderRadius: "20px",
                }}
                className="poppins-black mx-2"
              >
                Licensed Company
              </span>
            </div>
            <div className="mt-4" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-pest",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-pest",
                  prevEl: ".swiper-button-prev-pest",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilterPestControl.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-pest">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-pest">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-pest"></div>
            </div>

            <div className="poppins-semibold mt-3">Deal of the week</div>

            <div className="row mt-3">
              <Swiper
                slidesPerView={4}
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
                  {offerBanner.map((data) => (
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
                        src={data.offer}
                        alt="loading..."
                        style={{
                          width: "100%",
                          height: "150px",
                          borderRadius: "10px",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>

            <div
              className="pt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={deal}
                alt="vhs"
                style={{ width: "480px", height: "100px" }}
              />
            </div>

            {/* Floor Polishing */}
            <div className="poppins-semibold mt-4 mb-2">
              Floor Polishing{" "}
              <span
                style={{
                  backgroundColor: "#FFD700",
                  padding: "3px 25px",
                  borderRadius: "20px",
                }}
                className="poppins-black mx-2"
              >
                Shine Like New
              </span>
            </div>
            <div className="mt-4" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-polishing",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-polishing",
                  prevEl: ".swiper-button-prev-polishing",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilterMarbelPolish.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-polishing">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-polishing">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-polishing"></div>
            </div>

            {/* Packers & Movers */}
            <div className="poppins-semibold mt-4 mb-2">
              Packers & Movers{" "}
              <span
                style={{
                  backgroundColor: "#20B2AA",
                  padding: "3px 25px",
                  borderRadius: "20px",
                }}
                className="poppins-black mx-2"
              >
                1Lakh + Happy Customer
              </span>
            </div>
            <div className="mt-4" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-packers",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-packers",
                  prevEl: ".swiper-button-prev-packers",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilterPackers.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-packers">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-packers">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-packers"></div>
            </div>

            {/* Appliance Services */}
            <div className="poppins-semibold mt-4 mb-2">
              Appliance Services{" "}
              <span
                style={{
                  backgroundColor: "#9370DB",
                  padding: "3px 25px",
                  borderRadius: "20px",
                }}
                className="poppins-black mx-2"
              >
                Amazon prime Partner
              </span>
            </div>
            <div className="mt-4" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-appliance",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-appliance",
                  prevEl: ".swiper-button-prev-appliance",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilterAppliance.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-appliance">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-appliance">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-appliance"></div>
            </div>

            {/* Home Repairing Services */}
            <div className="poppins-semibold mt-4 mb-2">
              Home Repairing Services
              <span
                style={{
                  backgroundColor: "#FFA07A",
                  padding: "3px 25px",
                  borderRadius: "20px",
                }}
                className="poppins-black mx-2"
              >
                Amazon prime Partner
              </span>
            </div>
            <div className="mt-4" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-repairing",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-repairing",
                  prevEl: ".swiper-button-prev-repairing",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FilterRepairing.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-repairing">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-repairing">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-repairing"></div>
            </div>

            {/* Facility man agement Services */}
            <div className="poppins-semibold mt-4">
              Corporate Facility Management
            </div>
            <div className="mt-3" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-appliance",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-appliance",
                  prevEl: ".swiper-button-prev-appliance",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {FacilityManagement.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
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
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
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
              <div className="swiper-button-prev swiper-button-prev-appliance">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-appliance">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-appliance"></div>
            </div>

            {/* suman */}
            <div className="poppins-semibold mb-4 mt-5">TestiMonial</div>
            <Swiper
              slidesPerView={3}
              spaceBetween={40}
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

            <div className="poppins-semibold mt-4 mb-4">
              {homepagetitledata[0]?.title}
            </div>

            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-packers",
              }}
              navigation={{
                nextEl: ".swiper-button-next-packers",
                prevEl: ".swiper-button-prev-packers",
              }}
              modules={[FreeMode, Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {sdata
                .filter((i) => i.homePagetitle === homepagetitledata[0]?.title)
                .map((i) => (
                  <SwiperSlide
                    key={i._id}
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
                      state={{ subcategory: i?.subcategory }}
                      key={i.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            // source={{
                            //   uri: `https://api.vijayhomesuperadmin.in/subcat/${i.subcatimg}`,
                            // }}
                            source={i.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2">
                          {i.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className="poppins-semibold mt-4 mb-4">
              {homepagetitledata[1]?.title}
            </div>

            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-packers",
              }}
              navigation={{
                nextEl: ".swiper-button-next-packers",
                prevEl: ".swiper-button-prev-packers",
              }}
              modules={[FreeMode, Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {sdata
                .filter((i) => i.homePagetitle === homepagetitledata[1]?.title)
                .map((i) => (
                  <SwiperSlide
                    key={i._id}
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
                      state={{ subcategory: i?.subcategory }}
                      key={i.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="col-md-4" style={{ width: "100%" }}>
                        <div>
                          <img
                            // source={{
                            //   uri: `https://api.vijayhomesuperadmin.in/subcat/${i.subcatimg}`,
                            // }}
                            source={i.imglink}
                            alt="loading...."
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-2 mb-5">
                          {i.subcategory}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* <div className="row">
              <div
                className="col-md-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div className="poppins-semibold">Deal of the week</div>
              </div>
              <div className="col-md-8">
                <div className="" style={{}}>
                  <img
                    src={deal}
                    alt="vhs"
                    style={{ width: "480px", height: "100px" }}
                  />
                </div>
              </div>
            </div> */}
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

      {/* <Modal show={openResetModal} centered onHide={handleResetModal}>
        <div className="">
          <div className="">
            <div className="col-12">
              <img
                src="./assests/citybanner1.jpg"
                alt="loading...."
                style={{
                  width: "450px",
                  height: "130px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
            </div>
          </div>

          <div className="modal_body">
            <div className="title poppins-semibold">
              <span>
                <img
                  src="./assests/indiaflg.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              India
            </div>
            <div className="row">
              {city.map((city) => (
                <div className="" key={city._id}>
                  <div
                    className={`city-name p-2 ${
                      activeCity === city.city ? "active" : ""
                    }`}
                    onClick={() => handleChange(city)}
                  >
                    <i
                      className={`fa-solid fa-location-dot ${
                        activeCity === city.city ? "active-icon" : ""
                      }`}
                      style={{
                        color: "darkred",
                        marginTop: "3px",
                        fontSize: "15px",
                      }}
                    ></i>
                    <p className="poppins-regular mx-2">{city.city}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="title poppins-semibold mt-1">
              <span>
                <img
                  src="./assests/dubai.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              Dubai{" "}
              <span
                className="poppins-light"
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Coming Soon
              </span>
            </div>

            <div className="title poppins-semibold mt-1">
              <span>
                <img
                  src="./assests/london.webp"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              London{" "}
              <span
                className="poppins-light"
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </Modal> */}
      {/* <Modal show={openResetModal} centered onHide={handleResetModal}>
        <div className="modal_grid">
          <div className="modal_header">
            <img src="./assests/citybanner1.jpg" alt="loading...." />
          </div>

          <div className="modal_body">
            <div className="title poppins-semibold">
              <span>
                <img
                  src="./assests/indiaflg.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              India
            </div>
            <div className="row">
              {city.map((city) => (
                <div className="city-item" key={city._id}>
                  <div
                    className={`city-name p-2 ${
                      activeCity === city.city ? "active" : ""
                    }`}
                    onClick={() => handleChange(city)}
                  >
                    <i
                      className={`fa-solid fa-location-dot ${
                        activeCity === city.city ? "active-icon" : ""
                      }`}
                      style={{
                        color: "darkred",
                        marginTop: "3px",
                        fontSize: "15px",
                      }}
                    ></i>
                    <p className="poppins-regular mx-2">{city.city}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="title poppins-semibold mt-1">
              <span>
                <img
                  src="./assests/dubai.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              Dubai{" "}
              <span
                className="poppins-light"
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Coming Soon
              </span>
            </div>

            <div className="title poppins-semibold mt-1">
              <span>
                <img
                  src="./assests/london.webp"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              London{" "}
              <span
                className="poppins-light"
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </Modal> */}
      {/* <Modal
        show={openResetModal}
        style={{ width: "100%" }}
        centered
        onHide={handleResetModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="modal_grid">
          <div className="modal_header">
            <img src="./assests/citybanner1.jpg" alt="loading...." />
          </div>

          <div className="modal_body">
            <div className="title poppins-semibold">
              <span>
                <img
                  src="./assests/indiaflg.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              India
            </div>
            <div className="city-grid">
              {city.map((city) => (
                <div className="city-item" key={city._id}>
                  <div
                    className={`city-name ${
                      activeCity === city.city ? "active" : ""
                    }`}
                    onClick={() => handleChange(city)}
                  >
                    <i
                      className={`fa-solid fa-location-dot ${
                        activeCity === city.city ? "active-icon" : ""
                      }`}
                      style={{
                        color: "darkred",
                        marginTop: "3px",
                        fontSize: "15px",
                      }}
                    ></i>
                    <p className="poppins-regular">{city.city}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="title poppins-semibold mt-1">
              <span>
                <img
                  src="./assests/dubai.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              Dubai{" "}
              <span
                className="poppins-light"
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Coming Soon
              </span>
            </div>

            <div className="title poppins-semibold mt-1">
              <span>
                <img
                  src="./assests/london.webp"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              London{" "}
              <span
                className="poppins-light"
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </Modal> */}

      <Modal
        show={openResetModal}
        style={{ width: "100%" }}
        centered
        onHide={handleResetModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="modal_grid">
          <div className="modal_header">
            <img src="./assests/citybanner1.jpg" alt="loading...." />
          </div>

          <div className="modal_body">
            <div
              className="title poppins-semibold"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingBottom: "20px",
              }}
            >
              <span>
                <img
                  src="./assests/indiaflg.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              India
            </div>
            <div className="city-grid">
              {city.map((city) => (
                <div className="city-item" key={city._id}>
                  <div
                    className={`city-name ${
                      activeCity === city.city ? "active" : ""
                    }`}
                    onClick={() => handleChange(city)}
                  >
                    <i
                      className={`fa-solid fa-location-dot ${
                        activeCity === city.city ? "active-icon" : ""
                      }`}
                      style={{
                        color: "darkred",
                        marginTop: "3px",
                        fontSize: "15px",
                      }}
                    ></i>
                    <p className="poppins-regular">{city.city}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="row mt-4"
              style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
            >
              <div className="col-md-5">
                <div className=" poppins-semibold mt-1">
                  <span>
                    <img
                      src="./assests/dubai.png"
                      alt="loading..."
                      style={{
                        width: "23px",
                        height: "23px",
                        marginRight: "10px",
                        borderRadius: "50px",
                      }}
                    />
                  </span>
                  Dubai{" "}
                  <span
                    className="poppins-light"
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
              <div className="col-md-5">
                <div className=" poppins-semibold mt-1">
                  <span>
                    <img
                      src="./assests/london.webp"
                      alt="loading..."
                      style={{
                        width: "23px",
                        height: "23px",
                        marginRight: "10px",
                        borderRadius: "50px",
                      }}
                    />
                  </span>
                  London{" "}
                  <span
                    className="poppins-light"
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
