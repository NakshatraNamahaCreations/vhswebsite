import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="./images/eg.png"
              alt="loading...."
              style={{
                height: "60px",
                // mixBlendMode: "darken",
                // width: "100%",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            style={{ flex: "none" }}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="toolsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tools
                </a>
                <ul className="dropdown-menu" aria-labelledby="toolsDropdown">
                  <li>
                    <Link className="dropdown-item" to="/asin-code">
                      ASIN Code
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product-search">
                      Product Search
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/courses" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/courses">
                  Courses
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/blogs" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/blogs">
                  Blog
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
