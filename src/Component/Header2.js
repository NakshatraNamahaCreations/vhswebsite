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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="fnt rounded-lg brd p-1" href="/">
          <img src="./images/vhs.png" alt="" width={40} height={40} />
          <span className="clrrdd boldt mx-2">Vijay Home Services</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end menu">
          <Nav className="fnt clrrd me-3 boldt">
            <Link
              className="fnt clrrd me-3 boldt"
              to="/"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </Nav>
          <Nav className="fnt clrrd me-3 boldt">
            <Link
              className="fnt clrrd me-3 boldt"
              to="/about"
              style={{ textDecoration: "none" }}
            >
              About Us
            </Link>
          </Nav>
          <Nav className="fnt clrrd me-3 boldt">Blog</Nav>
          <Nav className="fnt clrrd me-3 boldt">
            <Link
              className="fnt clrrd me-3 boldt"
              to="/career"
              style={{ textDecoration: "none" }}
            >
              Career
            </Link>
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
          {/* {cartShow && (
            <Nav className="ms-5">
              <ShoppingCartIcon style={{ fontSize: "30px" }} />
              <p
                className="clr2 text-center"
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
                  {MyCartItems.length}
                </span>
              </p>
            </Nav>
          )} */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
