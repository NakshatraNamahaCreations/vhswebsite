import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  addToCart,
  addToCart1,
  removeMyCartItem,
  clearCart,
} from "../Redux1/MyCartSlice";
import { deleteMyCartItem } from "../Redux1/MyCartSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation"; // Import navigation CSS

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

function Viewdetails() {
  const [svideodata, setsvideodata] = useState([]);
  const [ReviewVideodata, setReviewVideodata] = useState([]);
  const [feqdata, setfeqdata] = useState([]);
  const [whychooseus, setwhychooseus] = useState([]);
  const location = useLocation();
  const { subcategory } = location.state || {};
  const localstoragecitys = localStorage.getItem("city");
  console.log("localstoragecitys======", localstoragecitys);
  const MyCartItmes = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [Item, setItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false, // Set infinite to false
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    Loop: false,
  };

  const citys = useSelector((state) => state.city);
  console.log(citys, "citys====");

  useEffect(() => {
    getsvideo();
  }, []);

  const isItemInCart = (itemId) => {
    return MyCartItmes.some((cartItem) => cartItem.id === itemId);
  };

  const getItemQuantityById = (itemId) => {
    const cartItem = MyCartItmes.find((item) => item.id === itemId);
    return cartItem ? cartItem.qty : 0;
  };

  const handleviewselect = (selectedItem) => {
    setItem(selectedItem);
  };

  useEffect(() => {
    getallwhychooseus();
  }, []);

  const getallwhychooseus = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/whychoose/getallwhychoose"
    );
    if (res.status === 200) {
      setwhychooseus(res.data?.data);
    }
  };

  console.log("whychooseus", whychooseus);

  const CartSavedtotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const planPrice = parseFloat(item?.planPrice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = planPrice * quantity - offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const Carttotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

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

  console.log("subcategory====kanmani", subcategory);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [pricesdata, setpricesdata] = useState([]);
  const [selectedPlan, setselectedPlan] = useState(pricesdata[0]);

  const handleCategoryClick = (clickedItem) => {
    setpricesdata(
      clickedItem?.morepriceData.filter(
        (i) => i.pricecity === localstoragecitys
      )
    );

    setItem(clickedItem);
  };

  const handleItemClick1 = (item, index) => {
    setSelectedItemIndex(index);
    setselectedPlan(item);
    const itemToAdd = {
      _id: item._id,
      category: subcategory,
      service: selectedItem,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === subcategory.category
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigate("/summary", { state: { plan: item, sdata: selectedItem } });
    }
  };

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    setselectedPlan(item);
    setItem(selectedItem);
    const itemToAdd = {
      _id: item._id,
      category: subcategory.category,
      service: Item,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === subcategory.category
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")

      navigate("/summary", { state: { plan: item, sdata: Item } });
    }
  };

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
              className="poppins-regular"
              style={{
                color: "green",
                fontSize: "14px",
              }}
            >
              {subcategory.servicetitle}
            </div>
            <div
              className="poppins-semibold"
              style={
                {
                  // color: "black",
                  // fontSize: "18px",
                  // fontWeight: "bold",
                }
              }
            >
              {subcategory.serviceName}
            </div>
            <div
              className="poppins-regular"
              style={{
                color: "grey",
                fontSize: "12px",
              }}
            >
              {subcategory.servicebelow}
            </div>

            <div
              className="poppins-semibold mt-4"
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
                      className="poppins-regular  mt-1"
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
                            // className="poppins-medium"
                            style={{
                              textAlign: "center",
                              color: "green",
                              fontSize: "16px",
                              fontWeight: "bold",
                              fontFamily: "sans-serif",
                            }}
                          >
                            {price.pName && <p>{price.pName}</p>}
                          </div>

                          <div
                            className="d-flex"
                            style={{ justifyContent: "center" }}
                          >
                            <div
                              className="poppins-regular"
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
                              className="poppins-regular mx-2"
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
                            className="poppins-regular"
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
                          {/* <div
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
                          </div> */}
                          {isItemInCart(price._id) ? (
                            <span> </span>
                          ) : (
                            <button
                              className="poppins-regular"
                              onClick={() => {
                                handleviewselect(selectedItem);
                                handleItemClick1(price);
                              }}
                              style={{
                                bottom: 10,
                                width: "100%",
                                padding: 5,
                                color: "white",
                                textAlign: "center",
                                borderRadius: 3,
                                marginTop: 15,
                              }}
                            >
                              Book
                            </button>
                          )}

                          {isItemInCart(price._id) && (
                            <div style={{ marginTop: "5px" }}>
                              <div
                                className="d-flex m-auto"
                                style={{
                                  backgroundColor: "green",
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                  borderRadius: 5,
                                  padding: "0px",
                                }}
                              >
                                <div className="col-md-5">
                                  <button
                                    className="poppins-regular"
                                    onClick={() => {
                                      const cartItem = MyCartItmes.find(
                                        (cartItem) => cartItem.id === price._id
                                      );
                                      if (cartItem && cartItem.qty > 1) {
                                        dispatch(deleteMyCartItem(price._id));
                                      } else {
                                        dispatch(deleteMyCartItem(price._id));
                                      }
                                    }}
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      height: "20px",
                                    }}
                                  >
                                    <i
                                      className="fa-solid fa-circle-minus"
                                      style={{
                                        color: "white",
                                        fontSize: "18px",
                                      }}
                                    ></i>
                                  </button>
                                </div>

                                <div className="col-md-2">
                                  <div
                                    style={{
                                      color: "white",
                                      // marginLeft: 5,
                                      fontSize: "14px",
                                      textAlign: "center",
                                      marginTop: "8px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {getItemQuantityById(price._id)}
                                  </div>
                                </div>

                                <div className="col-md-5">
                                  <button
                                    onClick={() => handleItemClick(price)}
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      height: "20px",
                                    }}
                                  >
                                    <i
                                      className="fa-solid fa-circle-plus"
                                      style={{
                                        color: "white",
                                        fontSize: "18px",
                                      }}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredPrices.length === 0 && (
                      <div className="col-md-12 poppins-regular">
                        <p>No prices available for this city</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div
                  className="poppins-semibold mt-4"
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
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
                          className="poppins-regular  mt-1"
                          style={{
                            color: "black",
                            fontSize: "14px",
                            marginLeft: "-26px",
                          }}
                        >
                          {data.text}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="poppins-semibold mt-4"
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
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
                          className="poppins-regular mt-1"
                          style={{
                            color: "black",
                            fontSize: "14px",
                            marginLeft: "-26px",
                          }}
                        >
                          {data.text}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-6">
                <div
                  className="poppins-semibold mt-4"
                  style={{
                    color: "darkred",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Thoughtful curations
                </div>

                <div
                  className="poppins-regular"
                  style={{
                    fontSize: "13px",
                    color: "black",
                    fontWeight: "bold",
                    marginTop: "5px",

                  }}
                >
                  Of our finest experiences
                </div>

                <div className="row mt-4">
                  <div className="col-md-3">
                    <video
                      className="p-0"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                      height={400}
                      autoPlay
                      loop
                      src={`https://api.vijayhomesuperadmin.in/sVideo/${svideodata[0]?.serviceVideo}`}
                    ></video>
                  </div>
                  <div className="col-md-3">
                    <video
                      className="p-0"
                      style={{
                        objectFit: "contain",
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
              </div>
              <div className="col-md-6">
                <div
                  className="mt-4"
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
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
                          height="200px"
                          src={embedUrl}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-6">
                <div
                  className="poppins-semibold mt-4"
                  style={{
                    color: "darkred",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Thoughtful curations
                </div>

                <div
                  className="poppins-regular"
                  style={{
                    fontSize: "13px",
                    color: "black",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  Of our finest experiences
                </div>

                <div className="row d-flex mt-4">
                  <div className="col-md-6">
                    <video
                      className="p-0"
                      style={{
                        objectFit: "contain",
                        width: "200px",
                        borderRadius: "10px",
                      }}
                      height={300}
                      autoPlay
                      loop
                      src={`https://api.vijayhomesuperadmin.in/sVideo/${svideodata[0]?.serviceVideo}`}
                    ></video>
                  </div>
                  <div className="col-md-6">
                    <video
                      className="p-0"
                      style={{
                        objectFit: "contain",
                        width: "200px",
                        borderRadius: "10px",
                      }}
                      height={300}
                      autoPlay
                      loop
                      src={`https://api.vijayhomesuperadmin.in/sVideo/${svideodata[1]?.serviceVideo}`}
                    ></video>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="poppins-semibold mt-4"
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Testimonial Videos
                </div>

                <div className="row mb-3 mt-5">
                  {ReviewVideodata.map((video, index) => {
                    const videoId = video.Links.split("v=")[1];
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    return (
                      <div className="col-12" key={index}>
                        <iframe
                          width="100%"
                          height="300px"
                          src={embedUrl}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: "5px" }}
                        ></iframe>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <div className="mb-5">
              <Slider {...settings}>
                {feqdata.map((i) => (
                  <div>
                    <h3
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginTop: 15,
                        fontSize: 16,
                        textAlign: "center",
                        marginBottom: "15px",
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
                              width: "100%",
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
              </Slider>
            </div> */}

            <div className="row" style={{ padding: "15px" }}>
              <div
                className="poppins-semibold"
                style={{ textAlign: "center", marginBottom: "25px" }}
              >
                How it Works?
              </div>

              {/* <Swiper
                slidesPerView={3}
                spaceBetween={40}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-appliance",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-appliance",
                  prevEl: ".swiper-button-prev-appliance",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {whychooseus.map((ele) => (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      backgroundColor: "white",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      // textAlign: "center",
                    }}
                  >
                    <div className="col-md-4" style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={ele.image}
                          alt="loading...."
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                      <div className="poppins-medium mt-2">{ele.title}</div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper> */}

              <div className="row mb-3">
                {whychooseus.map((data) => (
                  <div className="col-md-4" key={data._id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={data.image}
                        alt="loading...."
                        style={{
                          width: "80px",
                          height: "80px",
                          // borderRadius: "50px",
                        }}
                      />
                    </div>
                    <div
                      className="poppins-black mt-2"
                      style={{ fontSize: "12px", textAlign: "center" }}
                    >
                      {data.title}
                    </div>
                    <div
                      className="poppins-regular"
                      style={{ textAlign: "center" }}
                    >
                      {data.discription}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {subcategory?.category === "Painting" ? (
              ""
            ) : Carttotal > 0 ? (
              <div className="mb-5">
                <div
                  className="mt-5"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "rgb(224, 206, 85)",
                    padding: 5,
                    marginTop: 5,
                    alignSelf: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <span
                      className="poppins-medium"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Congratulations! ₹{Carttotal}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "black",
                      marginLeft: 10,
                      fontWeight: "bold",
                    }}
                  ></span>
                  <span
                    className="poppins-medium"
                    style={{
                      color: "black",
                      marginLeft: 4,
                      fontWeight: "bold",
                    }}
                  >
                    saved so far!
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "darkred",
                      color: "white",
                      padding: 10,
                      width: "100%",
                      textAlign: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/cart")}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <span
                        className="poppins-extrabold"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        Total
                      </span>
                      <span
                        className="poppins-extrabold mx-2"
                        style={{ color: "white" }}
                      >
                        ₹{Carttotal}
                      </span>
                    </div>
                    <span
                      className="poppins-extrabold"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      View Cart
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Viewdetails;
