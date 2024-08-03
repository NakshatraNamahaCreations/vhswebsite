import React from "react";
import { Link } from "react-router-dom";
import "../Component/layout.css";

function Homenavbar() {
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
          Vijay Home Services
        </span>
      </div>
      <div
        className="col-md-2 d-flex"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {userData !== null && userData !== undefined ? (
          <div className="">
            <div
              className="dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
              style={{
                // backgroundColor: "white",
                borderRadius: "50px",
                border: "white",
                display: "flex",
              }}
            >
              <i
                className="fa-solid fa-user-large"
                style={{
                  fontSize: "16px",
                  //   backgroundColor: "darkred",
                  //   padding: "9px",
                  color: "black",
                  //   borderRadius: "100%",
                }}
              ></i>
              <span
                className="mx-1 poppins-medium"
                style={{ fontSize: "12px" }}
              >
                {userData?.customerName}
              </span>
            </div>
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
      </div>
    </div>
  );
}
export default Homenavbar;
