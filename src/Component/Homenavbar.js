import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Component/layout.css";

function Homenavbar() {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const navigate = useNavigate();

  const handleremove = () => {
    alert("Account deleted");
    localStorage.removeItem("user");
    navigate("/");
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
      <div className="col-md-10">
        <img
          src="https://vijayahomeservices.b-cdn.net/vhs-lgo.png"
          alt=""
          width={25}
          height={25}
        />
        <span
          className="poppins-black mx-2"
          style={{
            color: "black",
            fontSize: "12px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          VHS
        </span>
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
          <Link className="mx-2" to="/login" style={{ textDecoration: "none" }}>
            <div
              className="poppins-black mx-1"
              style={{ color: "darkred", fontSize: "12px" }}
            >
              Login / Signup
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Homenavbar;
