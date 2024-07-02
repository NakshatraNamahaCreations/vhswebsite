import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Component/layout.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavbarCompo() {
  //   const location = useLocation();
  //   const MyCartItems = useSelector((state) => state.cart);
  //   const pathName = location.pathname;
  //   const cartShow = !(
  //     pathName === "/servicedetails" || pathName === "/ViewCart"
  //   );

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const handleRemove = () => {
    alert("Account deleted");
    localStorage.removeItem("user");
    window.location.assign("/");
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
    <Navbar
      expand="lg"
      style={{ backgroundColor: "lightgrey", padding: "5px" }}
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
  );
}
