import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Header2 from "./Header2";
import Completed from "./Completed";
import Enquiry from "./Enquiry";
function NoAnimationExample() {
  const [allorder, setAllorder] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          setValue(JSON.parse(userData));
          console.log(userData);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [value]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/mybookingdata/${value?._id}`
      );

      if (response.status === 200) {
        setAllorder(response.data?.runningdata);
        setLoading(false);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [value]);

  const cdata = allorder.filter((i) => i.dsrdata[0]?.endJobTime === undefined);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="">
      <Header2 />
      <div className="row mt-5 pt-5" style={{ justifyContent: "center" }}>
        <div className="col-md-8">
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            style={{
              backgroundColor: "white",
              border: "none",
              justifyContent: "center",
            }}
          >
            <Tab eventKey="home" title="Upcoming" className="poppins-black">
              <div className="container">
                {" "}
                {isLoading ? (
                  <div className="loader"></div>
                ) : (
                  <div>
                    {cdata?.length > 0 ? (
                      <div className="mb-5">
                        {cdata.map((item) => (
                          <div
                            className="row"
                            style={{ justifyContent: "center" }}
                          >
                            <div
                              key={item.id}
                              className="col-md-8 mt-3"
                              style={{
                                border: "1px solid grey",
                                padding: "10px",
                                borderRadius: "5px",
                              }}
                              onClick={() => {
                                navigate("/upcomingdetail", {
                                  state: { allorder: item },
                                });
                              }}
                            >
                              <h3
                                className="poppins-black"
                                style={{ color: "darkred" }}
                              >
                                {item.service}
                              </h3>
                              <div className="category">
                                <i
                                  className="fa-solid fa-layer-group"
                                  style={{ color: "black", fontSize: "14px" }}
                                ></i>
                                <span
                                  className="poppins-regular"
                                  style={{ color: "black" }}
                                >
                                  {item.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-data">
                        <p>No data! Please book a service</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Tab>
            <Tab eventKey="profile" title="Completed" className="poppins-black">
              <Completed />
            </Tab>
            <Tab
              eventKey="contact"
              title="Enquiry/Quotation"
              className="poppins-black"
            >
              <Enquiry />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default NoAnimationExample;
