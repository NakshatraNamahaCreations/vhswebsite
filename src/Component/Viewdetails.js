import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Viewdetails() {
  const [svideodata, setsvideodata] = useState([]);
  const [ReviewVideodata, setReviewVideodata] = useState([]);
  const [feqdata, setfeqdata] = useState([]);
  const location = useLocation();
  const { subcategory } = location.state || {};
  const localstoragecitys = localStorage.getItem("city");
  console.log("localstoragecitys======", localstoragecitys);

  const citys = useSelector((state) => state.city);
  console.log(citys, "citys====");

  useEffect(() => {
    getsvideo();
  }, []);

  const getsvideo = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getservicevideo"
    );
    if (res.status === 200) {
      setsvideodata(
        res.data?.serviceName.filter(
          (i) => i.serviceName === subcategory?.serviceName
        )
      );
    }
  };

  useEffect(() => {
    getwhyneed();
  }, []);

  const getwhyneed = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallfeq"
    );
    if (res.status === 200) {
      setfeqdata(
        res.data?.feq.filter((i) => i.category === subcategory.category)
      );

      // Filter images based on some condition (e.g., only images for a specific category)
    }
  };

  useEffect(() => {
    getReviewsVideos();
  }, []);

  const getReviewsVideos = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallReviewVideos"
    );
    if ((res.status = 200)) {
      setReviewVideodata(
        res.data?.ReviewVideos.filter(
          (i) => i.Subcategory === subcategory.Subcategory
        )
      );
    }
  };

  console.log("feqdata=====", feqdata);
  console.log("ReviewVideodata=======", ReviewVideodata);
  console.log("svideodata======", svideodata);

  console.log("subcategory======suman", subcategory);
  return (
    <div className="row">
      <div className="col-md-12">
        <img
          style={{ width: "100%", height: "350px" }}
          alt=""
          src={`https://api.vijayhomesuperadmin.in/service/${subcategory?.serviceImg}`}
        />
        <div className="container">
          <div className="mt-5">
            <div
              className=""
              style={{
                color: "green",
                fontSize: "14px",
              }}
            >
              {subcategory.servicetitle}
            </div>
            <div
              className=""
              style={{
                color: "black",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {subcategory.serviceName}
            </div>
            <div
              className=""
              style={{
                color: "grey",
                fontSize: "12px",
              }}
            >
              {subcategory.servicebelow}
            </div>

            <div
              className="mt-4"
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              Service Description
            </div>
            <div className="row">
              {subcategory.serviceDesc.map((data) => (
                <>
                  <div className="col-md-1">
                    <img
                      style={{ width: "16px", height: "16px" }}
                      alt=""
                      src={`https://api.vijayhomesuperadmin.in/service/${subcategory?.Eximg}`}
                    />
                  </div>
                  <div className="col-md-11">
                    <div
                      className="mt-1"
                      style={{
                        color: "black",
                        fontSize: "14px",
                        marginLeft: "-66px",
                      }}
                    >
                      {data.text}
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className="row mt-2">
              {(() => {
                const filteredPrices = subcategory?.morepriceData?.filter(
                  (ele) => ele.pricecity === localstoragecitys
                );

                return (
                  <>
                    {filteredPrices.map((price, index) => (
                      <div key={index} className="col-md-2 mt-3">
                        <div
                          className="shadow-lg"
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            className=""
                            style={{
                              textAlign: "center",
                              color: "green",
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            {price.pName && <p>{price.pName}</p>}
                          </div>

                          <div
                            className="d-flex"
                            style={{ justifyContent: "center" }}
                          >
                            <div
                              className=""
                              style={{
                                color: "black",
                                fontSize: "14px",
                                textDecoration: "line-through",
                                textAlign: "center",
                              }}
                            >
                              {price.pPrice && <p>₹{price.pPrice}</p>}
                            </div>
                            <div
                              className="mx-2"
                              style={{
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {price.pofferprice && <p>₹{price.pofferprice}</p>}
                            </div>
                          </div>
                          <div
                            className=""
                            style={{
                              color: "orange",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                          >
                            {(
                              ((price.pPrice - price.pofferprice) /
                                price.pPrice) *
                              100
                            ).toFixed(0)}
                            % discount
                          </div>
                          <div
                            className=""
                            style={{
                              backgroundColor: "darkred",
                              padding: "5px",
                              borderRadius: "5px",
                              color: "white",
                              fontSize: "15px",
                              textAlign: "center",
                              fontWeight: "bold",
                              marginTop: "50px",
                            }}
                          >
                            Book
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredPrices.length === 0 && (
                      <div className="col-md-12">
                        <p>No prices available for this city</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            <div
              className="mt-4"
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              Service Includes
            </div>
            <div className="row">
              {subcategory.serviceIncludes.map((data) => (
                <>
                  <div className="col-md-1">
                    <img
                      style={{ width: "16px", height: "16px" }}
                      alt=""
                      src={`https://api.vijayhomesuperadmin.in/service/${subcategory?.Desimg}`}
                    />
                  </div>
                  <div className="col-md-11">
                    <div
                      className="mt-1"
                      style={{
                        color: "black",
                        fontSize: "14px",
                        marginLeft: "-66px",
                      }}
                    >
                      {data.text}
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div
              className="mt-4"
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              Service Excludes
            </div>
            <div className="row">
              {subcategory.serviceExcludes.map((data) => (
                <>
                  <div className="col-md-1">
                    <img
                      style={{ width: "16px", height: "16px" }}
                      alt=""
                      src={`https://api.vijayhomesuperadmin.in/service/${subcategory?.Inimg}`}
                    />
                  </div>
                  <div className="col-md-11">
                    <div
                      className="mt-1"
                      style={{
                        color: "black",
                        fontSize: "14px",
                        marginLeft: "-66px",
                      }}
                    >
                      {data.text}
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div
              className="mt-4"
              style={{ color: "darkred", fontSize: "16px", fontWeight: "bold" }}
            >
              Thoughtful curations
            </div>

            <div
              className=""
              style={{
                fontSize: "13px",
                color: "black",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              Of our finest experiences
            </div>

            <div className="row">
              <div className="col-md-6">
                <video
                  className="p-0"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  height={400}
                  autoPlay
                  loop
                  src={`https://api.vijayhomesuperadmin.in/sVideo/${svideodata[0]?.serviceVideo}`}
                ></video>
              </div>
              <div className="col-md-6">
                <video
                  className="p-0"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  height={400}
                  autoPlay
                  loop
                  src={`https://api.vijayhomesuperadmin.in/sVideo/${svideodata[1]?.serviceVideo}`}
                ></video>
              </div>
            </div>

            <div
              className="mt-4"
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              Testimonial Videos
            </div>

            <div className="row mb-3 mt-3">
              {ReviewVideodata.map((video, index) => {
                const videoId = video.Links.split("v=")[1];
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                return (
                  <div className="col-md-12" key={index}>
                    <iframe
                      width="100%"
                      height="400px"
                      src={embedUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>

            {feqdata.map((i) => (
              <div>
                <h3
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginTop: 15,
                    fontSize: 16,
                  }}
                >
                  {i.title}
                </h3>
                <div>
                  {i.img.map((item) => (
                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={`https://api.vijayhomesuperadmin.in/feq/${item.data}`}
                        style={{
                          width: 300,
                          height: 300,
                          objectFit: "contain",
                        }}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewdetails;
