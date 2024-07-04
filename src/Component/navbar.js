import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Input from "@mui/material/Input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchIcon from "@mui/icons-material/Search";
import img from "./img/Flag-India.webp";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import { Link, NavLink } from "react-router-dom";
import "../Component/layout.css";
// import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect } from "react";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setstoreCity } from "../dataStoreComponent/citySlice";
import { Modal } from "react-bootstrap";

export default function NabarCompo({}) {
  const cartItems = useSelector((state) => state.viewCart?.CartItemsQnty);
  const distpatch = useDispatch();
  const citys = useSelector((state) => state.city);
  const location = useLocation();
  const MyCartItmes = useSelector((state) => state.cart);
  console.log("MyCartItmes====234", MyCartItmes);
  const pathName = location.pathname;
  let cartShow = true;
  if (pathName === "/servicedetails" || pathName === "/ViewCart") {
    cartShow = false;
  } else {
    cartShow = true;
  }

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const storedUserDataJSON = sessionStorage.getItem("userdata");
  const [openResetModal, setOpenResetModal] = useState(true);
  const [SearchSubCategory, setSearchSubCategory] = useState("");
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(true);
  // let userData = null;
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [SearchSubCategoryd, setSearchSubCategoryD] = useState([]);
  const [activeCity, setActiveCity] = useState("");
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (pathName === "/") {
      setOpenResetModal(true);
    }
  }, []);
  useEffect(() => {
    getCity();
    getsubcategory();
  }, []);
  const getsubcategory = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err, "err while fetching data");
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("userdata");
    window.location.reload("/");
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchSubCategory(searchTerm);
    setIsDropdownEnabled(searchTerm.length === 0);

    const filterData = CategoryData.filter((ele) => {
      const data = ele.subcategory.toLowerCase();
      return data.includes(searchTerm);
    });

    const subcategories = filterData.map((ele) => ele.subcategory);
    setSearchSubCategoryD(subcategories);
  };

  const handleLinkClick = () => {
    if (SearchSubCategory === "" || selectedOption?.city?.length === 0) {
      alert("Please Select city or service");
    }
    setSearchSubCategory("");
  };
  // const getCity = async () => {
  //   try {
  //     let res = await axios.get(
  //       "https://api.vijayhomesuperadmin.in/api/master/getcity"
  //     );
  //     if (res.status === 200) {
  //       setCity(res.data.mastercity);
  //     }
  //   } catch (er) {
  //     console.log(er, "err while fetching data");
  //   }
  // };

  const getCity = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );
      if (res.status === 200) {
        // Sort the cities alphabetically
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
  useEffect(() => {
    setSelectedOption((prevSelectedCity) => ({
      ...prevSelectedCity,
      text: citys || "Select City", // Use the city from the Redux store or fallback to "Select City"
    }));
  }, [citys]);
  const handleSubcategorySelect = (e, ele) => {
    e.preventDefault();
    setSearchSubCategory(ele);
    setIsDropdownEnabled(true);
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

  const handleremove = () => {
    // Show the alert before redirecting
    alert("Account deleted");
    // Remove the item from localStorage
    localStorage.removeItem("user");
    // Redirect to the home page
    window.location.assign("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "lightgrey", padding: "0px" }}
      >
        <Container>
          <Navbar.Brand className="fnt rounded-lg brd p-1" href="/">
            <img src="./images/vhs.png" alt="" width={40} height={40} />
            <span className="clrrdd boldt mx-2 poppins-medium">
              Vijay Home Services
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end menu">
            <Nav
              className="me-3"
              style={{
                backgroundColor: "orange",
                padding: "2px 10px",
                borderRadius: "5px",
              }}
            >
              <div className="">
                <img
                  src="./assests/new.gif"
                  alt="loading...."
                  style={{ width: "25px", height: "25px" }}
                />
                <span
                  className="poppins-regular"
                  style={{ fontSize: "13px", color: "white" }}
                >
                  Pest Control
                </span>
              </div>
            </Nav>
            <Nav
              className="me-3"
              style={{
                backgroundColor: "orange",
                padding: "2px 10px",
                borderRadius: "5px",
              }}
            >
              <div className="">
                <img
                  src="./assests/new.gif"
                  alt="loading...."
                  style={{ width: "25px", height: "25px" }}
                />
                <span
                  className="poppins-regular"
                  style={{ fontSize: "13px", color: "white" }}
                >
                  AC Repairing
                </span>
              </div>
            </Nav>
            <Nav
              className="me-3"
              style={{
                backgroundColor: "orange",
                padding: "2px 10px",
                borderRadius: "5px",
              }}
            >
              <div className="">
                <img
                  src="./assests/new.gif"
                  alt="loading...."
                  style={{ width: "25px", height: "25px" }}
                />
                <span
                  className="poppins-regular"
                  style={{ fontSize: "13px", color: "white" }}
                >
                  Exclusive Offer
                </span>
              </div>
            </Nav>
            {/* <Nav className=" fnt clrrd mt-3">
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "lightgrey",
                }}
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{
                    color: "darkred",
                    fontSize: "15px",
                    position: "absolute",
                    left: "8px",
                    top: "7px",
                  }}
                ></i>
                <input
                  className="poppins-regular"
                  readOnly
                  value={selectedCity || "Select City"}
                  style={{
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "lightgrey",
                    flexGrow: 1,
                    padding: "6px 25px",

                    paddingLeft: "25px",
                  }}
                />
                <i
                  onClick={handleResetModal}
                  className="fa-solid fa-caret-down"
                  style={{
                    color: "darkred",
                    fontSize: "23px",
                    position: "absolute",
                    right: "8px",
                    top: "2px",
                  }}
                ></i>
              </div>
            </Nav> */}
            {userData !== null && userData !== undefined ? (
              <Nav className=" fnt p-0 px-2">
                <div className="btn-group">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="true"
                    aria-expanded="false"
                    style={{
                      backgroundColor: "darkred",
                      borderRadius: "50px",
                      border: "white",
                    }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ fontSize: "15px" }}
                    ></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item poppins-regular"
                        style={{ fontSize: "12px" }}
                        href="/mybooking"
                      >
                        My Bookings
                      </a>
                    </li>
                    <li onClick={handleremove}>
                      <a
                        className="poppins-regular dropdown-item"
                        style={{ fontSize: "12px" }}
                        href="#"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <span
                  className="mx-2 poppins-medium"
                  style={{ fontSize: "14px", marginTop: "7px" }}
                >
                  {userData?.customerName}
                </span>
              </Nav>
            ) : (
              <>
                <Link
                  className="mx-2"
                  to="/login"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="poppins-black mx-1"
                    style={{ color: "darkred", fontSize: "15px" }}
                  >
                    Login / Signup
                  </div>
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Modal show={openResetModal} centered onHide={handleResetModal}>
        <div className="modal_wrapper select-city-modal">
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
                <div className="col-md-6" key={city._id}>
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
                style={{ color: "grey", fontWeight: "bold", fontSize: "16px" }}
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
                style={{ color: "grey", fontWeight: "bold", fontSize: "16px" }}
              >
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
}
