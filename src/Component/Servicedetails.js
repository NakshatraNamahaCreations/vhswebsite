import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NabarCompo from "./navbar";
import { Button, Modal } from "react-bootstrap";
import "../Component/Servicedetails.css";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { SpinnerCircular } from "spinners-react";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { addToCart, clearCart } from "../Redux1/MyCartSlice";
import Header1 from "./Header1";
import call from "../assests/call.gif";
import web from "../assests/web.gif";

function Servicedetails() {
  const location = useLocation();
  const { subcategory, SelecteddCity } = location.state || {};
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [show, setShow] = useState(false);
  const MyCartItmes = useSelector((state) => state.cart);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [serviceData, setserviceData] = useState([]);
  const [subModel, setsubModel] = useState(false);
  // const [filtersub, setfiltersub] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Item, setItem] = useState([]);
  const [City, setCity] = useState(null);
  const [OpenViewCartModal, setOpenViewCartModal] = useState(false);
  const [Price, setPrices] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const [DefaultPrice, setDefaultPrice] = useState(null);
  const [ServiceID, setServiceID] = useState(null);
  const [ServiceIDD, setServiceIDD] = useState(null);
  const [subcategoryVideo, setsubcategoryVideo] = useState([]);
  const [viewmoreCategory, setViewMoreCategory] = useState(false);
  const [ModalSubcategoryView, setModalSubcategoryView] = useState(false);
  const [SelectService, setSelectService] = useState(null);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [Added, setAdded] = useState(true);
  const [SelectedIndex, setSelectedIndex] = useState(null);
  const [Quantity, setQuantity] = useState(1);
  const [offerBannerdata, setofferBannerdata] = useState([]);
  const [postsubdata, setpostsubdata] = useState([]);
  const [Servicedata, setServicedata] = useState([]);
  const [pricesdata, setpricesdata] = useState([]);
  const [ITEM_HEIGHT, setItemHeight] = useState(350);
  const [vshow, setvShow] = useState(false);

  const vhandleClose = () => setvShow(false);
  const vhandleShow = () => setvShow(true);

  const scrollViewRef = useRef(null);

  const localstoragecitys = localStorage.getItem("city");

  const [Bannermidledata, setBannermidledata] = useState([]);

  console.log("localstoragecitys===", localstoragecitys);

  useEffect(() => {
    getbannerdatamiddle();
  }, []);

  const getbannerdatamiddle = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallSpotlightSP"
    );
    if ((res.status = 200)) {
      setBannermidledata(
        res.data?.SpotlightSP.filter((i) => i?.service === subcategory)
      );
    }
  };

  useEffect(() => {
    getAllServices();
    getsubcategoryVideo();
    getCity();
  }, []);

  const getAllServices = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getservices"
      );

      if (res.status === 200) {
        let subcategories = subcategory?.toLowerCase();

        setserviceData(
          res.data.service?.filter((ele) => {
            let category = ele?.Subcategory?.toLowerCase();
            return subcategories?.includes(category);
          })
        );
      }
    } catch (error) {
      console.log(error, "error while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getsubcategory();
  }, []);

  const getsubcategory = async () => {
    let res = await axios.post(
      `https://api.vijayhomesuperadmin.in/api/userapp/postappresubcat/`,
      {
        subcategory: subcategory,
      }
    );

    if ((res.status = 200)) {
      setpostsubdata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    getservicemanagement1();
  }, []);

  const getservicemanagement1 = async () => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice/`,
        {
          Subcategory: subcategory,
        }
      );
      if (res.status === 200) {
        setServicedata(res.data?.subcatdata);
      } else {
        console.error("Error fetching services: Status code not 200");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallofferbanner"
    );
    if ((res.status = 200)) {
      setofferBannerdata(
        res.data?.offerbanner.filter((i) => i.subcategory === subcategory)
      );
    }
  };

  const getCity = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );
      if (res.status === 200) {
        setCity(res?.data?.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHrSelect = (sersid, hr) => {
    const filteredData = serviceData
      .filter((ele) => ele._id === sersid)
      .flatMap((ele) => ele.morepriceData.filter((item) => item?._id === hr));
    setServiceIDD(sersid);
    setPrices(filteredData);
    setPriceId(hr);
  };

  useEffect(() => {
    if (serviceData?.length > 0) {
      const allServiceIDs = serviceData.map((service) => service._id);

      if (allServiceIDs?.length > 0) {
        const defaultPrice = serviceData.map((ele) => ele.morepriceData[0]);
        setDefaultPrice(defaultPrice);
      }

      setServiceID(allServiceIDs);
    }
  }, [serviceData]);

  const handleAdd = (e, data, index) => {
    e.preventDefault();
    setSelectedIndex(index);
    setSelectService(data);
    setAdded(false);
    setModalSubcategoryView(false);
    setOpenViewCartModal(true);
    setAdded(true);
  };

  const getsubcategoryVideo = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat"
      );
      if ((res.status = 200)) {
        let subcategorys = subcategory?.toLowerCase();
        let filteredData = res?.data?.subcategory?.filter((Ele) => {
          let videoLink = Ele?.subcategory?.toLowerCase();

          return subcategorys?.includes(videoLink);
        });
        // console.log(res.data.subcategory);
        setsubcategoryVideo(filteredData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowSelectCategory = (e, selectedsubcategory) => {
    e.preventDefault();
    setViewMoreCategory(false);
    setModalSubcategoryView(true);
    let filteredData = serviceData.filter(
      (servie) => servie._id === selectedsubcategory
    );

    setSelectedCategory(filteredData);
  };
  const handleCloseSubcategoryView = () => {
    setModalSubcategoryView(false);
  };

  const [catType, setcatType] = useState(null);
  const [activeIndex, setActiveIndex] = useState(false);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const toggleAccordion1 = (e, cate, index) => {
    e.preventDefault();
    setcatType(cate);
    setActiveIndex(!activeIndex);
    setActiveIndex2(index);
  };

  const handleCloseCart = () => {
    // e.preventDefault();
    setOpenViewCartModal(false);
  };

  let SelectedService = serviceData
    .map((serivice) =>
      serivice.morepriceData.filter((paln) => paln._id === SelectService)
    )
    .flatMap((cart) => cart);

  const citys = useSelector((state) => state.city);

  const [selectedData, setSelectedData] = useState([]);

  const handleBook = (data) => {
    setSelectedData(data);
    setShow(true);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const TotalPrice = MyCartItmes.reduce(
    (acc, cur) => acc + Number(cur.offerprice) * cur.qty, // Calculate total price considering quantity
    0
  );
  const dispatchService = useDispatch();
  const cartItems = useSelector((state) => state.viewCart);

  const navigate = useNavigate();

  const handleViewCartClick = () => {
    navigate("/cart");
  };

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    setItem(selectedData);
    const Item = selectedData;
    const itemToAdd = {
      _id: item._id,
      category: subcategory,
      service: Item,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === subcategory
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigate("/summary", { state: { plan: item, sdata: selectedData } });
      console.log("amc service", selectedData);
    }

    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  const scrollToService = (index) => {
    const section = document.getElementById(`service-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const scrollToService = (index, sub_subcategory) => {
  //   const yPosition = index * ITEM_HEIGHT;
  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
  //   }
  // };

  console.log("postsubdata", postsubdata, serviceData);

  return (
    <>
      {isLoading ? (
        <div className="row m-auto text-center" style={{ height: "100vh" }}>
          <div className="col-md-4"></div>
          <div className="col-md-4 m-auto ">
            <SpinnerCircular
              size={90}
              thickness={87}
              speed={80}
              color="rgba(27, 22, 22, 1)"
              secondaryColor="rgba(214, 191, 91, 1)"
            />
          </div>

          <div className="col-md-4"></div>
        </div>
      ) : (
        <>
          {" "}
          {/* <NabarCompo /> */}
          <Header1 />
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <h2
                    className="poppins-semibold"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginTop: "25px",
                    }}
                  >
                    {subcategory}
                  </h2>
                </div>
                <div className="row" style={{}}>
                  {postsubdata
                    .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                    .map((data, index) => (
                      <div
                        key={index}
                        className="col-md-4 mt-4 text-center"
                        onClick={() => scrollToService(index + 1)}
                      >
                        <img
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "10px",
                          }}
                          className="mb-2"
                          alt=""
                          src={data.imglink}
                        />
                        <div
                          className="poppins-medium pb-2"
                          style={{
                            color: "black",
                            fontSize: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {data.sub_subcategory}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="col-md-6 mt-5">
                {subcategoryVideo &&
                  subcategoryVideo.map((Ele) => {
                    return (
                      <ReactPlayer
                        url={Ele.videolink}
                        playing={true}
                        loop={true}
                        width={"100%"}
                        className="react-player-rounded"
                        height="auto"
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="row"></div>
          <div className="container">
            <div
              className="poppins-semibold mt-3"
              style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
            >
              {subcategory}
            </div>
            <div className="col-md-6">
              <div className="d-flex mt-2">
                <div className="poppins-regular" style={{ color: "black" }}>
                  4.9
                </div>
                <div className="mx-2" style={{ marginTop: "-5px" }}>
                  <i
                    class="fa-solid fa-star"
                    style={{ color: "gold", fontSize: "14px" }}
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style={{ color: "gold", fontSize: "14px" }}
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style={{ color: "gold", fontSize: "14px" }}
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style={{ color: "gold", fontSize: "14px" }}
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style={{ color: "gold", fontSize: "14px" }}
                  ></i>
                </div>
                <div className="poppins-regular" style={{ color: "black" }}>
                  (9.1T)
                </div>
                <div
                  className="d-flex mx-5 px-5"
                  style={{ marginTop: "-50px" }}
                >
                  <div>
                    <img
                      src={call}
                      alt="loading....."
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div
                      className="poppins-black shadow-lg"
                      style={{
                        backgroundColor: "white",
                        padding: "3px 8px",
                        marginTop: "-11px",
                        borderRadius: "5px",
                      }}
                    >
                      Call Now
                    </div>
                  </div>

                  <div style={{ marginLeft: "40px" }}>
                    <img
                      src={web}
                      alt="loading....."
                      style={{
                        width: "80px",
                        height: "80px",
                        marginLeft: "15px",
                      }}
                    />
                    <div
                      className="poppins-black shadow-lg"
                      style={{
                        backgroundColor: "white",
                        padding: "3px 8px",
                        marginTop: "-11px",
                        borderRadius: "5px",
                      }}
                    >
                      Wtsup us
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              {offerBannerdata.map((data) => (
                <div className="col-md-3 mt-3">
                  <div
                    className="d-flex"
                    style={{ backgroundColor: "darkred", borderRadius: "5px" }}
                  >
                    <div
                      className="col-md-2"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        height={20}
                        width={20}
                        alt=""
                        src={`https://api.vijayhomesuperadmin.in/offerbanner/${data.icon}`}
                      />
                    </div>
                    <div className="col-md-10 mt-3">
                      <div
                        className="poppins-regular"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data.header}
                      </div>
                      <p
                        className="poppins-regular mt-1"
                        style={{
                          color: "white",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row mt-5">
              {Servicedata.sort(
                (a, b) => parseInt(a.order) - parseInt(b.order)
              ).map((data, index) => (
                <>
                  <div
                    key={index}
                    id={`service-${index}`}
                    className="col-md-6 mt-4"
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <div
                      className="poppins-regular"
                      style={{
                        backgroundColor: "#E6B45C",
                        padding: "10px",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "17px",
                        borderTopRightRadius: "50px",
                      }}
                    >
                      {data.servicetitle}
                    </div>
                    <div
                      className="poppins-regular mt-2"
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {data.serviceName}
                    </div>
                    <div
                      className="poppins-regular"
                      style={{
                        color: "green",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {data.servicebelow}
                    </div>

                    <div className="d-flex mt-2">
                      <i class="fa-solid fa-star" style={{ color: "gold" }}></i>
                      <div
                        className="poppins-regular mx-2"
                        style={{ color: "black", fontSize: "14px" }}
                      >
                        4.9
                      </div>
                      <div
                        className="poppins-regular"
                        style={{ color: "black", fontSize: "14px" }}
                      >
                        (328.8k)
                      </div>
                    </div>

                    <div className="d-flex mt-2">
                      {(() => {
                        // Filtered prices
                        const filteredPrices = data?.morepriceData?.filter(
                          (ele) => ele.pricecity === localstoragecitys
                        );

                        console.log("filteredPrices12334===", filteredPrices);

                        // high price
                        let highPrice = null;
                        if (filteredPrices.length > 0) {
                          highPrice = filteredPrices.reduce(
                            (minPrice, ele) =>
                              Math.min(minPrice, parseFloat(ele.pPrice)),
                            parseFloat(filteredPrices[0].pPrice)
                          );
                        }

                        // Lowest price
                        let lowestPrice = null;
                        if (filteredPrices.length > 0) {
                          lowestPrice = filteredPrices.reduce(
                            (minPrice, ele) =>
                              Math.min(minPrice, parseFloat(ele.pofferprice)),
                            parseFloat(filteredPrices[0].pofferprice)
                          );
                        }

                        // Render JSX
                        return (
                          <>
                            <div
                              className="poppins-regular"
                              style={{
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            >
                              Start Price
                            </div>
                            <div
                              className="poppins-regular mx-2"
                              style={{
                                color: "grey",
                                fontWeight: "bold",
                                fontSize: "14px",
                                textDecoration: "line-through",
                              }}
                            >
                              {highPrice !== null && (
                                <p className="poppins-regular">₹{highPrice}</p>
                              )}
                            </div>
                            <div
                              className="poppins-regular"
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {lowestPrice !== null && (
                                <p className="poppins-regular">
                                  ₹{lowestPrice}
                                </p>
                              )}
                              {filteredPrices.length === 0 && (
                                <p className="poppins-regular">
                                  No prices available for this city
                                </p>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    <div className="row">
                      {data.serviceDesc.slice(0, 3).map((desc, index) => (
                        <div className="col-md-12" key={index}>
                          <div className="d-flex mt-2">
                            <div className="col-md-1">
                              <i
                                className="fa-solid fa-star"
                                style={{ color: "green", fontSize: "14px" }}
                              ></i>
                            </div>
                            <div className="col-md-11">
                              <div
                                className="poppins-regular mt-1"
                                style={{
                                  color: "black",
                                  fontSize: "14px",
                                  marginLeft: "-16px",
                                }}
                              >
                                {desc.text}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <Link
                          to="/viewdetails"
                          state={{ subcategory: data }}
                          // key={data.subcategory}
                          style={{ textDecoration: "none" }}
                          // className="text-decoration-none text-black"
                        >
                          <div
                            className="poppins-regular mt-4 mb-3"
                            style={{
                              color: "darkred",
                              fontSize: "17px",
                              fontWeight: "bold",
                            }}
                          >
                            View details{" "}
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-md-3 mt-4 mb-3"
                        style={{ marginLeft: "-50px" }}
                      >
                        <div
                          onClick={vhandleShow}
                          className="poppins-regular mx-2"
                          style={{
                            color: "blue",
                            fontSize: "17px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          Show more
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 mt-4"
                    style={{
                      textAlign: "end",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <div className="">
                      <img
                        style={{
                          width: "250px",
                          height: "250px",
                          borderRadius: "10px",
                        }}
                        className="mb-2"
                        alt=""
                        src={data.imglink}
                      />
                      <div
                        // onClick={handleShow}
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          // marginRight: "30px",
                          // marginTop: "-20px",
                        }}
                      >
                        <div
                          className="poppins-black"
                          style={{
                            color: "white",
                            fontSize: "13px",
                            backgroundColor: "darkred",
                            textAlign: "center",
                            // width: "80px",
                            padding: "4px",
                            borderRadius: "10px",
                            width: "50%",
                            marginTop: "-25px",
                          }}
                          // onClick={() => handleBook(data)}
                          onClick={() => {
                            if (data.morepriceData.length > 0) {
                              handleBook(data);
                            } else {
                              // window.location.assign("/Espage");
                              navigate("/ESpage", { state: { sdata: data } });
                            }
                          }}
                        >
                          Book
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div
              className="row mt-5 mb-5 "
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {Bannermidledata.map((data) => (
                <div
                  key={data._id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "50%",
                      height: "250px",
                    }}
                    className="mb-2"
                    alt=""
                    src={`https://api.vijayhomesuperadmin.in/spotlightSP/${data.img}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}

      {/* POP UP */}

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Select Option</Modal.Title>
          <div onClick={handleClose}>
            <i
              class="fa-solid fa-xmark"
              style={{
                backgroundColor: "darkred",
                padding: "9px",
                color: "white",
                borderRadius: "50px",
                width: "35px",
                textAlign: "center",
              }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-2">
            {(() => {
              // Filtered prices
              const filteredPrices = selectedData?.morepriceData?.filter(
                (ele) => ele.pricecity === localstoragecitys
              );

              return (
                <>
                  {filteredPrices?.map((price, index) => (
                    <div
                      key={index}
                      className="col-md-3 mt-3"
                      onClick={() => handleItemClick(price, index)}
                    >
                      <div
                        className={` mt-3 ${
                          selectedItems[index] ? "active12" : "inactive12"
                        }`}
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
                          {price.pName && (
                            <p
                              className="poppins-bold"
                              style={{ color: "green" }}
                            >
                              {price.pName}
                            </p>
                          )}
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
                            {price.pPrice && (
                              <p className="poppins-regular">₹{price.pPrice}</p>
                            )}
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
                            {price.pofferprice && (
                              <p className="poppins-medium">
                                ₹{price.pofferprice}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              );
            })()}
          </div>

          <div
            className="poppins-medium"
            style={{
              backgroundColor: "rgb(224, 206, 85)",
              padding: "5px",
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            Congratulations! ₹ {TotalPrice}
            Saved so far!
          </div>
          <div
            className="d-flex"
            style={{ backgroundColor: "darkred", padding: "10px" }}
          >
            <div
              className="col-md-3 poppins-extrabold"
              style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}
            >
              Total ₹{TotalPrice}
            </div>
            <div
              className="col-md-9 poppins-extrabold"
              style={{
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                textAlign: "end",
              }}
              onClick={handleViewCartClick}
            >
              View Cart
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        className=""
        show={ModalSubcategoryView}
        onHide={handleCloseSubcategoryView}
      >
        <Modal.Header closeButton>
          {SelectedCategory.map((Ele) => (
            <Modal.Title className="container ">
              {" "}
              {Ele?.serviceName}
            </Modal.Title>
          ))}
        </Modal.Header>
        <Modal.Body className="bgclr">
          {SelectedCategory?.map((servi, index) => {
            return (
              <>
                <Link
                  to="/servicedetails"
                  state={{ subcategory: servi?.subcategory }}
                  key={servi.subcategory}
                  style={{ textDecoration: "none" }}
                  className="text-decoration-none  text-black"
                >
                  {" "}
                  <div className="row  justify-content-center">
                    {servi.morepriceData.map((plan, innerindex) => (
                      <div className="col-md-3 m-3 shadow-lg bg-white p-2 brdrd   mb-2 ">
                        <div className="row  m-auto">
                          <p className="col-md-12 p-4 clrstr2  text-white shadow-sm ">
                            {plan.pName}
                          </p>
                        </div>
                        <p className="row">
                          <span>
                            {" "}
                            <StarIcon className="clrstr" /> 7k + Reviews
                          </span>{" "}
                        </p>
                        <div className="row mt-5 p-1">
                          <span className="col-md-6 m-auto   price fntbold">
                            Rs. {plan?.pPrice}
                          </span>
                          <span className="col-md-6 m-auto  fntbold  clrstr">
                            Rs. {plan?.pofferprice}
                          </span>
                        </div>
                        <div className="row">
                          <button
                            onClick={(e) => handleAdd(e, plan._id, innerindex)}
                            className="col-md-6 m-auto  fntbold text-center p-1  fnts btn_clr   "
                          >
                            {Added || innerindex !== SelectedIndex ? (
                              <>
                                <span>
                                  <AddIcon style={{ fontSize: "14px" }} />{" "}
                                </span>
                                <span>Add </span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {" "}
                                  <CheckIcon
                                    style={{ fontSize: "14px" }}
                                  />{" "}
                                </span>
                                <span>Added </span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
                <div className="container redbrdr  mt-3 shadow-sm acordinss p-3">
                  <div key={index} className="row  m-2">
                    {servi?.serviceIncludes?.length > 0 && (
                      <p
                        className={`m-auto col-md-6 accordion ${
                          catType === "includes" && activeIndex2 === 0
                            ? "active"
                            : ""
                        }`}
                        onClick={(e) => toggleAccordion1(e, "includes", 0)}
                      >
                        <p
                          className="accordion__title clrpr"
                          style={{
                            fontWeight: "bold",
                            padding: "16px 0px 0px 6px",
                          }}
                        >
                          Includes
                        </p>
                      </p>
                    )}
                    {servi?.serviceExcludes?.length > 0 && (
                      <p
                        className={`m-auto col-md-6 accordion ${
                          catType === "excludes" && activeIndex2 === 1
                            ? "active"
                            : ""
                        }`}
                        onClick={(e) => toggleAccordion1(e, "excludes", 1)}
                      >
                        <p
                          className="accordion__title clrpr"
                          style={{
                            fontWeight: "bold",
                            padding: "16px 0px 0px 6px",
                          }}
                        >
                          Excludes
                        </p>
                      </p>
                    )}

                    <div className="row ">
                      {catType === "includes" && activeIndex2 === 0 && (
                        <div
                          style={{
                            maxHeight: `${activeIndex ? "1000px" : "0px"}`,
                          }}
                          className="accordion__content"
                        >
                          {servi.serviceIncludes.map((dos, dosIndex) => (
                            <div
                              key={dosIndex}
                              className="accordion__text clrpr"
                            >
                              <li>{dos.text}</li>
                            </div>
                          ))}
                        </div>
                      )}
                      {catType === "excludes" && activeIndex2 === 1 && (
                        <div
                          style={{
                            maxHeight: `${activeIndex ? "1000px" : "0px"}`,
                          }}
                          className="accordion__content"
                        >
                          {servi?.serviceExcludes?.map((dos, dosIndex) => (
                            <div
                              key={dosIndex}
                              className="accordion__text clrpr"
                            >
                              <li>{dos.text}</li>
                            </div>
                          ))}
                        </div>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="container ">
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleCloseSubcategoryView}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={OpenViewCartModal} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <h1 className=" clrstr fnt">Cart</h1>
        </Modal.Header>
        <Modal.Body>
          {SelectedService.map((price) => {
            return (
              <div className="row p-4">
                <span className="col-md-4 col-md-4 fs-5 m-auto  fntbold  ">
                  {price.pName}
                </span>

                <Button variant="secondary" className="col-md-2 m-auto  p-0">
                  <span
                    onClick={() => {
                      if (Quantity > 1) {
                        setQuantity(Quantity - 1);
                      }
                    }}
                    className="me-2 fs-5 p-0"
                  >
                    -
                  </span>
                  <span className="me-2 ms-2 fs-5 p-0">{Quantity} </span>
                  <span
                    className="ms-2 fs-5 p-0"
                    onClick={() => setQuantity(Quantity + 1)}
                  >
                    +
                  </span>
                </Button>
                <span className="col-md-2"></span>
                <span span className="col-md-2 m-auto  ">
                  <span className="fs-3 fntbold  clrstr">
                    Rs.{price.pofferprice}
                  </span>
                </span>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="container p-3 ">
          {serviceData.flatMap((service) =>
            service.morepriceData
              .filter((plan) => plan._id === SelectService)

              .map((price) => (
                <Button
                  className="col-md-10 m-auto clrstrs"
                  onClick={() => {
                    // e.preventDefault();
                    setOpenViewCartModal(false);
                  }}
                >
                  {" "}
                  <Link
                    to="/ViewCart"
                    state={{
                      ServiceIDD: service._id,
                      PriceID: price._id,
                      NumberOfQunt: Quantity,
                    }}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      border: "none",
                    }}
                  >
                    <p className="row p-1 m-auto">
                      <span className="col-md-6 m-auto p-0">View Cart</span>
                      <span className="col-md-6 m-auto p-0">
                        {" "}
                        Rs.{price.pofferprice}
                      </span>
                    </p>
                  </Link>
                </Button>
              ))
          )}
        </Modal.Footer>
      </Modal>

      {/* V Modal */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={vshow}
        onHide={vhandleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      </Modal>
    </>
  );
}

export default Servicedetails;
