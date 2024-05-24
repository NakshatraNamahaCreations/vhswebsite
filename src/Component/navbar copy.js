import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchIcon from "@mui/icons-material/Search";
import img from "./img/Flag-India.webp";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import "../Component/layout.css";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect } from "react";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";

export default function NabarCompo() {
  const storedUserDataJSON = sessionStorage.getItem("userdata");
  const [openResetModal, setOpenResetModal] = useState(false);
  const [SearchSubCategory, setSearchSubCategory] = useState("");
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(true);
  let userData = null;
  const [city, setCity] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [SearchSubCategoryd, setSearchSubCategoryD] = useState([]);
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getCity();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userdata");
    window.location.reload("/");
  };
  const CustomInputBase = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#F5F6F8",
    border: "1px solid #E2E6EA",
    // borderRadius: "100px",
    padding: "3px 3px",
    width: "90%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      borderColor: "#B0B6BE",
    },
    "&.Mui-focused": {
      borderColor: "#006BFF",
      boxShadow: `${alpha("#006BFF", 0.25)} 0 0 0 0.1rem`,
    },
    "& .MuiInputBase-input": {
      padding: "3px 3px",
    },
  }));

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
  const handleResetModal = () => {
    setOpenResetModal(!openResetModal);
  };
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
  const handleChange = (e) => {
    setSelectedOption(e);
    setOpenResetModal(false);
  };
  const handleSubcategorySelect = (ele) => {
    setSearchSubCategory(ele);
    setIsDropdownEnabled(true);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbg mb-3">
        <Container>
          <Navbar.Brand className="fnt   rounded-lg brd p-1" href="/">
            <img src="./images/vhs.png" width={50} height={50} />{" "}
            <span className="clrrdd boldt">Vijay Home Services</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end menu">
            <Nav className=" fnt clrrd ">
              <div className="col-md-10 m-auto">
                <CustomInputBase
                  readOnly
                  value={
                    selectedOption.city === null ||
                    selectedOption.city === undefined
                      ? "Select City"
                      : selectedOption.city
                  }
                  startAdornment={
                    <img
                      src={img}
                      width={20}
                      height={20}
                      className="m-1 imgbr custom-dropdown-toggle"
                      alt="Flag"
                    />
                  }
                  endAdornment={
                    <svg
                      className="m-1 "
                      onClick={handleResetModal}
                      height="25"
                      width="25"
                      viewBox="0 0 18 18"
                      aria-hidden="true"
                      focusable="false"
                      class="clrg"
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  }
                />
              </div>
            </Nav>
            <Nav className=" fnt clrrd ">
              <div className=" m-auto">
                <CustomInputBase
                  placeholder="Search for services"
                  value={SearchSubCategory}
                  defaultValue="Your Default Value Here"
                  onChange={handleSearch}
                  startAdornment={
                    <Link
                      onClick={handleLinkClick}
                      to="/servicedetails"
                      state={{
                        subcategory: SearchSubCategory,
                        SelecteddCity: selectedOption.city,
                      }}
                      key={SearchSubCategory}
                      style={{
                        textDecoration: "none",
                      }}
                      className="text-decoration-none  text-black"
                    >
                      <SearchIcon
                        className="m-1 clrg"
                        style={{ fontSize: "23px" }}
                        onClick={handleLinkClick}
                      />
                    </Link>
                  }
                />
                {!isDropdownEnabled && (
                  <div className="drop_dow shadow-sm p-3 mb-5 bg-white rounded">
                    {SearchSubCategoryd?.map((ele) => (
                      <p
                        key={ele}
                        onClick={() => handleSubcategorySelect(ele)}
                        style={{ cursor: "pointer" }}
                      >
                        {ele}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </Nav>

            <Nav className=" fnt clrrd me-2 bordr boldt">Career</Nav>

            {userData !== null && userData !== undefined ? (
              <Nav className="clrrd fnt me-2 bordr" onClick={handleShow}>
                <AccountCircleIcon /> {userData.customerName}
              </Nav>
            ) : (
              <>
                <Nav className=" fnt clrrd me-2 bordr boldt" href="/login">
                  Login
                </Nav>
                <Nav className=" fnt clrrd me-2 bordr boldt" href="/register">
                  Register{" "}
                </Nav>
              </>
            )}

            <Nav>
              <div className="row">
                <button className="fnt p-1   modal_header fnt14">
                  <span className="me-2">
                    <WifiCalling3Icon style={{ fontSize: "20px" }} />
                  </span>
                  <span>918348745620</span>
                </button>
              </div>
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
          <div>
            <p
              className="ms-2"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </p>
          </div>
        </Offcanvas>
        <Modal open={openResetModal} onClose={handleResetModal}>
          <div className="modal_wrapper select-city-modal">
            <div className="modal_header ">
              <div className="col-12">
                <span>Let's choose</span>
                <p>Your Location</p>
              </div>
            </div>

            <div className="modal_body">
              <div className="title text-center">India</div>
              <div className="row">
                {city.map((city) => {
                  return (
                    <div className="col-lg-2 col-md-3 col-sm-4">
                      <div
                        className="city-name"
                        onClick={() => handleChange(city)}
                      >
                        <img src="" alt="" />

                        <p className="p-1">{city.city}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      </Navbar>
      <div className="container mb-5">
        <div className="row align-items-center m-auto">
          <span className="col-md-2 hrline"></span>
          <h3 className="col-md-8 m-auto fnt boldt text-center text-black">
            Bring Professionals Home Services To Your Door
          </h3>{" "}
          <span className="col-md-2 m-auto hrline"></span>
        </div>
      </div>
    </>
  );
}
