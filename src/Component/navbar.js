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
  const [openResetModal, setOpenResetModal] = useState(false);
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
  const getCity = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );
      if (res.status === 200) {
        setCity(res.data.mastercity);
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
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="fnt   rounded-lg brd p-1" href="/">
            <img src="./images/vhs.png" alt="" width={40} height={40} />{" "}
            <span className="clrrdd boldt mx-2">Vijay Home Services</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end menu">
            {/* <Nav className=" fnt clrrd me-3  boldt">
              <Link
                className=" fnt clrrd me-3  boldt"
                to="/"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </Nav>
            <Nav className=" fnt clrrd me-3  boldt">
              <Link
                className=" fnt clrrd me-3  boldt"
                to="/about"
                style={{ textDecoration: "none" }}
              >
                About Us
              </Link>
            </Nav>
            <Nav className=" fnt clrrd me-3  boldt">Blog</Nav> */}
            <Nav
              className="   me-3 "
              style={{ backgroundColor: "orange", padding: "5px 5px" }}
            >
              <div className="">
                <img
                  src="./assests/new.gif"
                  alt="loading...."
                  style={{ width: "43px", height: "30px" }}
                />{" "}
                <span style={{ fontSize: "13px", color: "white" }}>
                  Pest Control
                </span>
              </div>
            </Nav>
            <Nav
              className="   me-3 "
              style={{ backgroundColor: "orange", padding: "5px 5px" }}
            >
              <div className="">
                <img
                  src="./assests/new.gif"
                  alt="loading...."
                  style={{ width: "43px", height: "30px" }}
                />{" "}
                <span style={{ fontSize: "13px", color: "white" }}>
                  AC Repairing
                </span>
              </div>
            </Nav>
            <Nav
              className="   me-3  "
              style={{ backgroundColor: "orange", padding: "5px 5px" }}
            >
              <div className="">
                <img
                  src="./assests/new.gif"
                  alt="loading...."
                  style={{ width: "43px", height: "30px" }}
                />{" "}
                <span style={{ fontSize: "13px", color: "white" }}>
                  Exclusive Offer
                </span>
              </div>
            </Nav>
            {/* <Nav className=" fnt clrrd me-3  boldt">
              <Link
                className=" fnt clrrd me-3  boldt"
                to="/career"
                style={{ textDecoration: "none" }}
              >
                Career
              </Link>
            </Nav> */}

            <Nav className=" fnt clrrd ">
              <div
                className="col-md-10 m-auto"
                style={{
                  border: "1px solid darkred",
                  borderRadius: "10px",
                }}
              >
                <InputBase
                  readOnly
                  // value={
                  //   citys?.city === null || citys?.city === undefined
                  //     ? "Select City"
                  //     : citys?.city
                  // }
                  value={selectedCity || "Select City"}
                  style={{ fontSize: "14px", marginTop: "1px" }}
                  startAdornment={
                    <i
                      className="fa-solid fa-location-dot mx-2"
                      style={{
                        color: "darkred",
                        fontSize: "15px",
                      }}
                    ></i>
                  }
                  endAdornment={
                    <svg
                      style={{ cursor: "pointer" }}
                      className="m-1 "
                      onClick={handleResetModal}
                      height="20"
                      width="25"
                      viewBox="0 0 18 18"
                      aria-hidden="true"
                      focusable="false"
                      class="css-tj5bde-Svg"
                      // class="clrg"
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  }
                />
              </div>
            </Nav>

            {userData !== null && userData !== undefined ? (
              <Nav className=" fnt   p-0 ">
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
                        style={{ fontSize: "12px" }}
                        className="dropdown-item"
                        href="/mybooking"
                      >
                        My Bookings
                      </a>
                    </li>
                    <li onClick={handleremove}>
                      <a
                        style={{ fontSize: "12px" }}
                        className="dropdown-item"
                        href="#"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <span
                  className="mx-2 "
                  style={{ fontSize: "14px", marginTop: "7px" }}
                >
                  {userData?.customerName}
                </span>
              </Nav>
            ) : (
              <>
                <Link
                  className=" fnt clrrd me-3  boldt"
                  to="/login"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
                <Link
                  className=" fnt clrrd me-3  boldt"
                  to="/register"
                  style={{ textDecoration: "none" }}
                >
                  Register{" "}
                </Link>
              </>
            )}

            {/* <Nav className=" fnt clrrd ">
              <div className="search-container">
                <div className="search-icon" onClick={toggleSearch}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  type="text"
                  className={`search-input ${isSearchVisible ? "visible" : ""}`}
                  placeholder="Search..."
                  style={{
                    border: "1px solid black",
                    width: "100px",
                    height: "45px",
                  }}
                />
              </div>
            </Nav> */}

            <Nav className="ms-5">
              {!cartShow ? (
                <>
                  <ShoppingCartIcon style={{ fontSize: "30px" }} />
                  <p
                    className=" clr2 text-center"
                    style={{
                      width: "22px",
                      height: "23px",
                      borderRadius: "100%",
                      position: "absolute",
                      top: "15%",
                      right: "5.6%",
                    }}
                  >
                    <span className="m-auto text-white fnt14">
                      {MyCartItmes.length}
                    </span>
                  </p>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Name : {userData?.customerName}</p>
            <p>Contact : {userData?.contactPerson}</p>
          </Offcanvas.Body>
        </Offcanvas>

        <Modal show={openResetModal} centered onHide={handleResetModal}>
          <div className="modal_wrapper select-city-modal">
            <div className="">
              <div className="col-12">
                <img
                  src="./assests/citybanner.jpg"
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
              <div className="title">
                <span>
                  <img
                    src="./assests/indiaflg.png"
                    alt="loading..."
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                </span>
                India
              </div>
              <div className="row">
                {city.map((city) => {
                  return (
                    <div className="col-md-6">
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
                            color: "grey",
                            marginTop: "3px",
                            fontSize: "15px",
                          }}
                        ></i>
                        <p className="mx-2">{city.city}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      </Navbar>
    </>
  );
}
