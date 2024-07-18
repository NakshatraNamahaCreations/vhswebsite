import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import Faq from "react-faq-component";

function Subcategory() {
  const [subcategoryData, setSubcategoryData] = useState([]);
  const { subcategory } = useParams();
  const [allSubcat, setAllSubcat] = useState([]);
  const [sub, setSub] = useState("");
  const location = useLocation();
  const { data } = location.state || {};
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
  const [modalbanner, setmodalbanner] = useState([]);
  const [allcategory, setallcategory] = useState([]);
  const [vhspromise, setvhspromise] = useState([]);
  const [whychooseus, setwhychooseus] = useState([]);
  const [allcamparison, setallcamparison] = useState([]);
  const [faq, setfaq] = useState([]);
  const [review, setreview] = useState([]);

  useEffect(() => {
    getSubcategories();
  }, []);

  useEffect(() => {
    if (subcategory && allSubcat.length > 0) {
      const parts = subcategory.split("-");
      const category1 = capitalizeFirstLetter(parts[0]);

      console.log("Searching for:", category1);
      console.log("Available subcategories:", allSubcat);

      const fullServiceName = allSubcat.find((service) =>
        service.subcategory.toLowerCase().includes(category1.toLowerCase())
      );

      console.log("Found fullServiceName:", fullServiceName);

      if (fullServiceName) {
        setSub(fullServiceName.subcategory);
        getSubcategory(fullServiceName.subcategory);
      } else {
        console.error("Service not found");
      }
    }
  }, [subcategory, allSubcat]);

  const getSubcategory = async (category) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice`,
        { Subcategory: category }
      );
      if (res.status === 200) {
        console.log("servuce data ", res.data.subcatdata);
        setSubcategoryData(res.data.subcatdata);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getSubcategories = async () => {
    try {
      const res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );
      if (res.status === 200) {
        setAllSubcat(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("data---", data);

  const transformedFaqData = {
    rows: faq.map((f) => ({
      title: <div className="poppins-black">{f.question}</div>,
      content: <div className="poppins-regular">{f.answer}</div>,
    })),
  };

  const styles = {
    // bgColor: 'white',
    titleTextColor: "darkred",
    rowTitleColor: "darkred",
    // rowContentColor: 'grey',
    // arrowColor: "red",
  };

  console.log("data", data);

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
        res.data?.SpotlightSP.filter((i) => i?.service === sub)
      );
    }
  };

  useEffect(() => {
    getmodalbanner();
  }, []);

  const getmodalbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/pbanner/getallpopupbanner"
    );
    if ((res.status = 200)) {
      setmodalbanner(
        res.data?.data.filter((i) => i?.category === subcategoryData?.category)
      );
    }
  };

  useEffect(() => {
    getreview();
  }, []);

  const getreview = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/review/getallvhsreview"
    );
    if ((res.status = 200)) {
      setreview(
        res.data?.data.filter((i) => i?.category === subcategoryData?.category)
      );
    }
  };

  useEffect(() => {
    getallfaq();
  }, []);

  const getallfaq = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/faq/getallvhsfaq"
    );
    if ((res.status = 200)) {
      setfaq(
        res.data?.data.filter((i) => i?.category === subcategoryData?.category)
      );
    }
  };

  useEffect(() => {
    getallcomparison();
  }, []);

  const getallcomparison = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/comparison/getallvhscomparison"
    );
    if ((res.status = 200)) {
      setallcamparison(
        res.data?.data.filter((i) => i?.category === subcategoryData?.category)
      );
    }
  };

  console.log("comparison", allcamparison);

  useEffect(() => {
    getallcategory();
  }, []);

  const getallcategory = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/getcategory"
    );
    if ((res.status = 200)) {
      setallcategory(res.data?.category);
    }
  };

  useEffect(() => {
    getallvhspromises();
  }, []);

  const getallvhspromises = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/vhspromise/getallvhspromise"
    );
    if ((res.status = 200)) {
      setvhspromise(res.data?.data);
    }
  };

  console.log("modalbanner", modalbanner);

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
        let subcategories = sub?.toLowerCase();

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

  console.log("servicedata", serviceData);

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

  useEffect(() => {
    getsubcategory();
  }, []);

  const getsubcategory = async () => {
    let res = await axios.post(
      `https://api.vijayhomesuperadmin.in/api/userapp/postappresubcat/`,
      {
        subcategory: sub,
      }
    );

    if ((res.status = 200)) {
      setpostsubdata(res.data?.subcategory);
    }
  };

  console.log("post", postsubdata);

  useEffect(() => {
    getservicemanagement1();
  }, []);

  const getservicemanagement1 = async () => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice/`,
        {
          Subcategory: sub,
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
        res.data?.offerbanner.filter((i) => i.subcategory === sub)
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
        let subcategorys = sub?.toLowerCase();
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
      category: sub,
      service: Item,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === sub
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

  console.log("postsubdata", postsubdata, serviceData);

  return (
    <div>
      <Header1 />
      <div className="container">
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
                {sub}
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
                      alt={`${data.subcategory} images`}
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
          {sub}
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
            <div className="d-flex mx-5 px-5" style={{ marginTop: "-50px" }}>
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
                            <p className="poppins-regular">₹{lowestPrice}</p>
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
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="poppins-regular mt-4 mb-3"
                        style={{
                          color: "darkred",
                          fontSize: "17px",
                          fontWeight: "bold",
                        }}
                      >
                        View details
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
                    alt={`${data.category} images`}
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
    </div>
  );
}

export default Subcategory;
