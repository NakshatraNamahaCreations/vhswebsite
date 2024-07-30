import React, { useState } from "react";
import Homenavbar from "./Homenavbar";
import NavbarCompo from "./navbar";
import Footer from "./Footer";
import joinus from "../../src/assests/joinus.png";
import joinus1 from "../../src/assests/joinus1.png";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Checkbox, TextField, Grid, Box } from "@mui/material";

function Registerus() {
  const services = [
    "Refrigerator Repair",
    "Washing Machine Repair",
    "Air Conditioning Repair / Service",
    "TV Installation / Repair",
    "Microwave Oven Repair",
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service !== value)
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="">
          <img src={joinus} alt="vhs" style={{ width: "100%" }} />

          <div className="poppins-black mt-3">
            All <span style={{ color: "red" }}> * </span> fields are mandatory
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <div className="poppins-black">
                Choose Your Services <span style={{ color: "red" }}> *</span>
              </div>
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="j-input"
                style={{ width: "100%" }}
              />
              {searchQuery && (
                <ul className="service-items">
                  {filteredServices.map((service) => (
                    <li key={service} className="service-item">
                      <label>
                        <input
                          type="checkbox"
                          value={service}
                          checked={selectedServices.includes(service)}
                          onChange={handleCheckboxChange}
                        />
                        {service}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              {searchQuery && selectedServices.length > 0 && (
                <div className="selected-services">
                  <h3>Selected Services</h3>
                  <ul>
                    {selectedServices.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div className="poppins-black">
                Select Your City <span style={{ color: "red" }}> *</span>
              </div>
              <Form.Select className="mt-2" aria-label="Default select example">
                <option>Select City</option>
                <option value="1">Bengaluru</option>
                <option value="2">Karnataka</option>
                <option value="3">Chennai</option>
                <option value="4">Karnataka</option>
              </Form.Select>
            </div>
          </div>

          <div className="">
            <div
              className="border mt-3"
              style={{ borderRadius: "5px", padding: "5px 20px" }}
            >
              <div className="poppins-black mt-3">
                Vendor Information <span style={{ color: "red" }}>* </span>
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Company Name <span style={{ color: "red" }}>* </span>
                  </div>
                  <input type="text" className="j-input col-md-12" />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Aadhaar No <span style={{ color: "red" }}>* </span>
                  </div>
                  <input type="text" className="j-input col-md-12" />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    GST <span style={{ color: "red" }}>* </span>
                  </div>
                  <input type="text" className="j-input col-md-12" />
                </div>
              </div>
            </div>

            <div className="">
              <div className="poppins-black mt-3">
                Contacts <span style={{ color: "red" }}>* </span>
              </div>
              <div
                className="border mt-2"
                style={{ borderRadius: "5px", padding: "5px 20px" }}
              >
                <div className="row mt-2">
                  <div className="poppins-black mb-2">
                    Contact 1 <span style={{ color: "red" }}>* </span>
                  </div>
                  <div className="col-md-4">
                    <div className="poppins-regular">
                      Name <span style={{ color: "red" }}>* </span>
                    </div>
                    <input type="text" className="j-input col-md-12" />
                  </div>
                  <div className="col-md-4">
                    <div className="poppins-regular">
                      Mobile No <span style={{ color: "red" }}>* </span>
                    </div>
                    <input type="text" className="j-input col-md-12" />
                  </div>
                  <div className="col-md-4">
                    <div className="poppins-regular">
                      Email (optional) <span style={{ color: "red" }}>* </span>
                    </div>
                    <input type="text" className="j-input col-md-12" />
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="poppins-black mt-3">
                Address <span style={{ color: "red" }}>* </span>
              </div>
              <div
                className="border mt-2"
                style={{ borderRadius: "5px", padding: "5px 20px" }}
              >
                <div className="row mt-2">
                  <div className="d-flex" style={{}}>
                    <div className="col-md-11">
                      <div className="poppins-black mb-2">
                        Address 1 <span style={{ color: "red" }}>* </span>
                      </div>
                    </div>
                    <div
                      className="col-md-1"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", fontSize: "18px" }}
                      ></i>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{ borderRight: "1px solid grey" }}
                    >
                      <div className="row">
                        <div className="col-md-5">
                          <div className="poppins-regular">
                            Pincode <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                        <div className="col-md-7">
                          <div className="poppins-regular">
                            Street/Location/Village{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="poppins-regular">
                            House#/Flat#/Plot#{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                        <div className="col-md-4">
                          <div className="poppins-regular">
                            Apartment/Building{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                        <div className="col-md-4">
                          <div className="poppins-regular">
                            Landmark <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Block/Town/City{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            District <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            State <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Country <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="poppins-black mt-3">
                Pin Codes you serve <span style={{ color: "red" }}>* </span>
              </div>
              <div
                className="border mt-2"
                style={{ borderRadius: "5px", padding: "5px 20px" }}
              >
                <div className="row mt-2">
                  <div className="d-flex" style={{}}>
                    <div className="col-md-11">
                      <div className="poppins-black mb-2">
                        Pincode 1 <span style={{ color: "red" }}>* </span>
                      </div>
                    </div>
                    <div
                      className="col-md-1"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", fontSize: "18px" }}
                      ></i>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{ borderRight: "1px solid grey" }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Pincode <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Block/Town/City{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            District <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            State <span style={{ color: "red" }}>* </span>
                          </div>
                          <input type="text" className="j-input col-md-12" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="poppins-regular">
                        Areas you serve <span style={{ color: "red" }}>*</span>
                      </div>
                      <div class="input-group mb-3 mt-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Text input with checkbox"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="border mt-3"
              style={{ borderRadius: "5px", padding: "5px 20px" }}
            >
              <div className="poppins-black mt-3">
                Upload <span style={{ color: "red" }}>* </span>
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Photo <span style={{ color: "red" }}>* </span>
                  </div>
                  <input type="file" className="border mt-2 col-md-12" />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Aadhaar Card Front Side{" "}
                    <span style={{ color: "red" }}>* </span>
                  </div>
                  <input type="file" className="border mt-2 col-md-12" />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Aadhaar Card Back Side{" "}
                    <span style={{ color: "red" }}>* </span>
                  </div>
                  <input type="file" className="border mt-2 col-md-12" />
                </div>
              </div>
            </div>

            <div
              className="d-flex mb-3 mt-3"
              style={{ justifyContent: "center" }}
            >
              <div
                className="poppins-black text-center"
                style={{
                  backgroundColor: "red",
                  padding: "8px",
                  borderRadius: "20px",
                  width: "20%",
                  color: "white",
                }}
              >
                Submit
              </div>
            </div>

            <div className="d-flex">
              <div className="col-md-10">
                <img
                  src={joinus1}
                  alt="VHS"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-md-2 mt-5">
                <div
                  className=""
                  style={{
                    backgroundColor: "red",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href="tel:+918453748478"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="poppins-black text-center"
                      style={{ color: "white" }}
                    >
                      Call Us Now
                    </div>
                    <div
                      className="poppins-black text-center"
                      style={{ color: "white" }}
                    >
                      +91-8453748478
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Registerus;
