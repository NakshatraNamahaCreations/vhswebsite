import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Component/layout.css";
import { Dropdown } from "react-bootstrap";

function Cartnavbar() {
  const location = useLocation();
  const MyCartItems = useSelector((state) => state.cart);
  const pathName = location.pathname;
  const cartShow = !(
    pathName === "/servicedetails" || pathName === "/ViewCart"
  );

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const handleremove = () => {
    alert("Account deleted");
    localStorage.removeItem("user");
    window.location.assign("/");
  };
  return (
    <div
      className="d-flex navbar-cart"
      style={{
        backgroundColor: "aliceblue",
        padding: "15px",
        justifyContent: "space-between",
      }}
    >
      <div className="col-md-10 ">
        <a href="/" style={{ textDecoration: "none" }}>
          <img
            src="https://vijayahomeservices.b-cdn.net/vhs-lgo.png"
            alt=""
            width={25}
            height={25}
          />
          <span
            className="poppins-medium mx-2"
            style={{
              color: "black",
              fontSize: "13px",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            VHS
          </span>
        </a>
      </div>
      <div
        className="col-md-2 d-flex"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {userData !== null && userData !== undefined ? (
          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  display: "flex",
                  justifyContent: "end",
                  padding: "0px",
                  border: "none",
                }}
                variant=""
                id="dropdown-basic"
              >
                <i
                  className="fa-solid fa-user mt-1"
                  style={{ fontSize: "15px", color: "black" }}
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
                  href="#/action-3"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span className="poppins-black mx-1" style={{ fontSize: "12px" }}>
              {userData?.customerName}
            </span>
          </div>
        ) : (
          <>
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
          </>
        )}

        {cartShow && (
          <div className="mx-2">
            <Link to="/cartbook" style={{ textDecoration: "none" }}>
              <i
                className="fa-solid fa-cart-shopping"
                style={{ fontSize: "18px", color: "black" }}
              ></i>
            </Link>

            <div
              className="text-center"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "100%",
                backgroundColor: "darkred",
                color: "white",
                fontSize: "8px",
                paddingTop: "1px",
                position: "absolute",
                fontWeight: "bold",
                top: 10,
                right: 13,
              }}
            >
              {MyCartItems.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Cartnavbar;
