import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "../Component/layout.css";

export default function NabarCompo() {
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

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const [openResetModal, setOpenResetModal] = useState(true);

  const [city, setCity] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);

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

  const handleremove = () => {
    alert("Account deleted");
    localStorage.removeItem("user");
    window.location.assign("/");
  };

  return (
    <>
      <Navbar
        className="navbar-homecity"
        expand="lg"
        style={{ backgroundColor: "aliceblue", padding: 0 }}
      >
        <Container>
          <Navbar.Brand className="fnt rounded-lg brd p-1" href="/">
            <img
              src="https://vijayahomeservices.b-cdn.net/vhs-lgo.png"
              alt=""
              width={40}
              height={40}
            />
            <span className="clrrdd boldt mx-2 poppins-medium">
              Vijay Home Services
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end menu">
            {[
              {
                name: "Pest Control",
                img: "https://vijayahomeservices.b-cdn.net/new.gif",
              },
              {
                name: "AC Repairing",
                img: "https://vijayahomeservices.b-cdn.net/new.gif",
              },
              {
                name: "Exclusive Offer",
                img: "https://vijayahomeservices.b-cdn.net/new.gif",
              },
            ].map((item, index) => (
              <Nav
                key={index}
                className="me-3"
                style={{
                  backgroundColor: "#ffa50082",
                  padding: "2px 10px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.img}
                  alt="new"
                  style={{ width: "25px", height: "25px" }}
                />
                <span
                  className="poppins-regular"
                  style={{
                    fontSize: "13px",
                    color: "black",
                    marginLeft: "5px",
                  }}
                >
                  {item.name}
                </span>
              </Nav>
            ))}
            {userData ? (
              <Nav className="fnt p-0 px-2">
                <div className="btn-group">
                  {/* <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="true"
                    aria-expanded="false"
                    style={{
                      backgroundColor: "darkred",
                      borderRadius: "50px",
                      border: "none",
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
                  </ul> */}

                  <Dropdown>
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: "darkred",
                        borderRadius: "50px",
                        border: "none",
                      }}
                      variant=""
                      id="dropdown-basic"
                    >
                      <i
                        className="fa-solid fa-user"
                        style={{ fontSize: "15px", color: "white" }}
                      ></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="dropdown-item poppins-regular"
                        style={{ fontSize: "12px" }}
                        href="/mybooking"
                      >
                        My Bookings
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleremove}
                        className="poppins-regular dropdown-item"
                        style={{ fontSize: "12px" }}
                        href="/"
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <span
                  className="mx-2 poppins-medium"
                  style={{ fontSize: "14px", marginTop: "7px" }}
                >
                  {userData?.customerName}
                </span>
              </Nav>
            ) : (
              <Link
                className="mx-2"
                to="/homelogin"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="poppins-black mx-1"
                  style={{ color: "darkred", fontSize: "15px" }}
                >
                  Login / Signup
                </div>
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
