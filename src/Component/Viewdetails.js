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

function Viewdetails() {
  const [svideodata, setsvideodata] = useState([]);
  const [ReviewVideodata, setReviewVideodata] = useState([]);
  const [feqdata, setfeqdata] = useState([]);
  const location = useLocation();
  const { subcategory } = location.state || {};
  const localstoragecitys = localStorage.getItem("city");
  console.log("localstoragecitys======", localstoragecitys);
  const MyCartItmes = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [Item, setItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

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
                              onClick={() => {
                                handleviewselect(selectedItem);
                                handleItemClick1(price);
                              }}
                              style={{
                                // position: "absolute",
                                bottom: 10,
                                width: "100%",
                                // backgroundColor: selectedItemId === i._id ? "green" : "darkred",
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
                            <div
                              style={
                                {
                                  // flex: 0.3,
                                  // position: "absolute",
                                  // bottom: 10,
                                }
                              }
                            >
                              <div
                                className="d-flex m-auto"
                                style={{
                                  backgroundColor: "green",
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",

                                  borderRadius: 5,
                                }}
                              >
                                <div className="col-md-5">
                                  <button
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
                                    }}
                                  >
                                    {/* <AntDesign name="minuscircleo" size={18} color="white" /> */}
                                    <i
                                      className="fa-solid fa-circle-minus"
                                      style={{ color: "white" }}
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
                                      marginTop: "15px",
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
                                    }}
                                  >
                                    <i
                                      className="fa-solid fa-circle-plus"
                                      style={{ color: "white" }}
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
                      <div className="col-md-12">
                        <p>No prices available for this city</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {subcategory?.category === "Painting" ? (
              ""
            ) : Carttotal > 0 ? (
              <div>
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
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Congratulations!
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
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        Total
                      </span>
                      <span className="mx-2" style={{ color: "white" }}>
                        ₹{Carttotal}
                      </span>
                    </div>
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      View Cart
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

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