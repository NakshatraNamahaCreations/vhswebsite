import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import nodata from "../assests/nodata.mp4";

function Completed() {
  const [allorder, setAllorder] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          setValue(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData1();

    const interval = setInterval(() => {
      fetchData1();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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

  const cdata = allorder.filter((item) => item?.dsrdata[0]?.endJobTime);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div className="text-center">Completed Page</div>
      ) : (
        <div className="">
          {!cdata.length > 0 ? (
            <div className="">
              <div
                className="mt-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <video
                  src={nodata} // The path should be relative to the public folder
                  className="no-data-video"
                  muted={false}
                  loop
                  autoPlay
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <p
                className="poppins-black mt-2"
                style={{ color: "black", textAlign: "center" }}
              >
                Please Book Any Services and Come Back Later!
              </p>
            </div>
          ) : (
            <div className="mb-5">
              {cdata.map((item) => (
                <div className="row" style={{ justifyContent: "center" }}>
                  <div
                    className="col-md-8 mt-3"
                    style={{
                      border: "1px solid grey",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/completeddetails", {
                        state: { allorder: item },
                      });
                    }}
                  >
                    <div className="row">
                      <div className="col-md-10">
                        <h3
                          className="poppins-black"
                          style={{ color: "darkred" }}
                        >
                          {item.service}
                        </h3>
                        <div className="price-date">
                          <span
                            className="poppins-black"
                            style={{ color: "black" }}
                          >
                            ₹ {item.serviceCharge}
                          </span>
                          <span
                            className="poppins-black mx-2"
                            style={{ color: "black" }}
                          >
                            {" "}
                            / {item.startDate}
                          </span>
                        </div>
                        <div className="poppins-bold mt-1">Completed</div>
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
                      <div
                        className="col-md-2"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="order-status">
                          <i
                            class="fa-regular fa-circle-check"
                            style={{ fontSize: "25px", color: "green" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Completed;
