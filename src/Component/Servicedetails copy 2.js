import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Header from "./Header";
import NabarCompo from "./navbar";
// import Modal from "@mui/material/Modal";
import { Button, Modal } from "react-bootstrap";
// import CartDetails from "../Pages/ViewCart/Components/CartDetails"
// import  "../Pages/ViewCart/Components/cartdetails.scss"
// import ViewCart from "../Pages/ViewCart/ViewCart";
import "../Component/Servicedetails.css";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";

import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "./Footer";

function Servicedetails() {
  const location = useLocation();
  const { subcategory, SelecteddCity } = location.state || {};
  console.log("subcategory", subcategory);
  const [serviceData, setserviceData] = useState([]);
  const [subModel, setsubModel] = useState(false);
  // const [filtersub, setfiltersub] = useState([]);

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
  const [addService, setAddService] = useState(null);
  useEffect(() => {
    getAllServices();
    getsubcategoryVideo();
    getCity();
  }, []);

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getservices"
      );
      if (res.status === 200) {
        let subcategorys = subcategory?.toLowerCase();

        setserviceData(
          res.data.service?.filter((ele) => {
            let category = ele?.Subcategory?.toLowerCase();
            return subcategorys?.includes(category);
          })
        );
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  const handlebookclick = (clickedItem) => {
    setItem(clickedItem);
    setsubModel(true);
  };

  const getCity = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );
      if (res.status === 200) {
        setCity(res?.data?.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
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
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/getsubcategory"
    );
    if ((res.status = 200)) {
      let subcategorys = subcategory?.toLowerCase();
      let filteredData = res?.data?.subcategory?.filter((Ele) => {
        let videoLink = Ele?.subcategory?.toLowerCase();
        return subcategorys?.includes(videoLink);
      });
      console.log(res.data.subcategory);
      setsubcategoryVideo(filteredData);
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

  const faqs = [
    {
      title: "What cleaning solutions do you use?",
      content:
        "Local Steam Cleaning makes sure that we do not do any impact to nature, environment and those dwelling in their homes and commercial spaces. Our team only uses eco-friendly. We only use cleaning agents and solutions that are environment-friendly to protect mother nature, ensure our client’s safety and protect our cleaners.",
    },
    {
      title: "What is your Pet Policy?",
      content:
        "For the safety and security of your pets please have dogs and cats crated or gated prior to our arrival.",
    },
    {
      title: "Do you perform outside cleaning ?",
      content:
        "Yes. We provide sweeping and cobwebs removal only on balconies, garages, decks. If further cleaning is required, please discuss it during your booking.",
    },
    {
      title: "How long can you Finish the cleaning works? ",
      content:
        "The duration of cleaning will depend on the items that you require to be cleaned. Our team will give you the estimated time frame once we visit your place for live assessment.",
    },
    {
      title: " Can I trust my cleaning professional? ",
      content:
        "Yes. All our in-house cleaners are trustworthy and background checked. We make sure that you get the best, friendly and professional cleaners at all times.",
    },
    {
      title: "Do you clean carpets or rugs that are heavily stained? ",
      content:
        "Yes, it is one of our specialized service and we can efficiently remove them.",
    },

    {
      title:
        " Do you bring your own cleaning supplies, products and equipment? ",
      content:
        "Yes, we will bring our own cleaning supplies and materials to help you get rid of the hassle with the cleaning preparations. Our cleaner will arrive with all the equipment we need to perform and complete our cleaning operations. Should you require specific products to be used, you can let our team know and our cleaner will discuss our cleaning solutions and what you need as long as it works best, safe for your health and the environment.",
    },

    {
      title: "What work can I expect to be done ?",
      content:
        "Vijay Home Services Cleaners offer a systemised approach to our services. We would love the opportunity to show you through the types of services on offer during one of our friendly face-to-face consultations/quotations. Simply complete a booking form and we will be more than happy to show you how we can assist with your house cleaning needs.",
    },
  ];

  const [activeIndex1, setActiveIndex1] = useState(null);

  const toggleAccordion1 = (index) => {
    setActiveIndex1((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleCloseCart = () => {
    setOpenViewCartModal(false);
  };

  let SelectedService = serviceData
    .map((serivice) =>
      serivice.morepriceData.filter((paln) => paln._id === SelectService)
    )
    .flatMap((cart) => cart);

  return (
    <>
      <NabarCompo />
      <div>
        <NabarCompo />
        <div className="col-md-3 m-auto">
          <Form.Select
            value={SelectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {City?.map((ele) => (
              <option value={ele.city} key={ele.city}>
                {ele.city}
              </option>
            ))}
          </Form.Select>
        </div>
        <div style={{ margin: 25 }}>
          <div className="row">
            <div className="col-6">
              <h1>
                {" "}
                {subcategory} in {SelectedCity}
              </h1>
              {serviceData?.map((i, index) => {
                return (
                  <div className="row">
                    <div className="col-8">
                      <h2 style={{ fontWeight: "bold", color: "black" }}>
                        {i.serviceName}
                      </h2>
                      <div className="d-flex mt-3">
                        <p style={{ color: "black", fontWeight: "bold" }}>
                          Start price
                        </p>
                        {Price?.flatMap((ele) => (
                          <div className="row">
                            <p
                              className="col-md-4 mx-2 price"
                              style={{
                                textDecorationLine: "line-through",
                                color: "grey",
                              }}
                            >
                              ₹{ele?.pPrice}
                            </p>
                            <p
                              className="col-md-4"
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              ₹{ele?.pofferprice}
                            </p>
                          </div>
                        ))}
                        <span>{i.serviceHour}</span>
                      </div>{" "}
                      <div className="row">
                        <div className="row">
                          {i?.morepriceData?.map((ele, index) => {
                            return (
                              <div className="col-md-5 area" key={ele._id}>
                                {ele.pName && (
                                  <label htmlFor={ele._id}>
                                    <input
                                      type="radio"
                                      name="bhk"
                                      id={ele._id}
                                      value={ele.pName}
                                      onClick={() => handleHrSelect(ele._id)}
                                      checked={
                                        ele.pName === "1BK" ||
                                        ele.pName === "1BHK"
                                      }
                                    />
                                    <span className="col-md-1">
                                      {ele?.pName}
                                    </span>
                                  </label>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="d-flex">
                        <img
                          width={20}
                          height={20}
                          src={`https://api.vijayhomesuperadmin.in/service/${i?.Eximg}`}
                          alt=""
                        />{" "}
                        <p
                          style={{
                            marginLeft: 10,
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {i.offerPrice}
                        </p>
                        <p
                          style={{ fontSize: 15 }}
                          numberOfLines={4}
                          ellipsizeMode="tail"
                        >
                          {i.serviceDesc[0]?.text}
                        </p>
                      </div>
                      {/* <p style={{ color: "green" }}>View details</p> */}
                    </div>

                    <div className="col-4">
                      <div style={{ width: "150px", float: "inline-end" }}>
                        <img
                          width={150}
                          height={130}
                          src={`https://api.vijayhomesuperadmin.in/service/${i?.serviceImg}`}
                          alt=""
                          style={{ borderRadius: "10px" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            to="/viewcart"
                            state={{
                              passseviceid: i._id,
                              bhk: PriceId,
                              selectecity: SelectedCity,
                            }}
                            key={i.serviceName}
                            style={{ textDecoration: "none" }}
                          >
                            <button
                              style={{
                                width: "100px",
                                padding: "8px",
                                background: "gold",
                                color: "green",
                              }}
                              onClick={() => handleAdd(index)}
                            >
                              {addService !== index ? (
                                <>
                                  <AddIcon /> Add
                                </>
                              ) : (
                                <>
                                  <CheckIcon /> Added
                                </>
                              )}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
            <div className="col-4"></div>
          </div>
        </div>

        {/* <Modal
        open={subModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <div className="modal_wrapper select-city-modal">
            <div className="modal_header ">
              <div className="col-11">
                <span>Select the subcategory</span>
              </div>
              <div onClick={() => setsubModel(false)}>
                <img
                  width={50}
                  height={50}
                  alt=""
                  src="..\assests\cancel1.png"
                  // style={{}}
                />
              </div>
            </div>

            <div className="modal_body">
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {filtersub?.map((item) => (
                  <Link
                    to="/viewcart"
                    state={{ subcategory: item?._id }}
                    key={item.subcategory}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        // border: "1px solid green",
                        width: "150px",
                        height: "160px",
                        boxShadow: "0px 0px 5px 1px green",
                      }}
                    >
                      <img
                      src={`https://api.vijayhomesuperadmin.in/subcat/${item.subcatimg}`}
                        width="100%"
                        height="100px"
                      />

                      <p className="p-1" style={{ color: "black" }}>
                        {item.subcategory}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal> */}

        {/* <ViewCart />  */}
      </div>
      {/* <div className="row align-items-center m-auto">
        <p className="col-md-2"></p>
        <span className="col-md-2 hrline"></span>
        <h4 className="col-md-4 m-auto fnt text-center boldt grndclr text-black">
          {subcategory}
        </h4>{" "}
        <span className="col-md-2 m-auto hrline"></span>
        <p className="col-md-2"></p>
      </div> */}

      {/* <div className="row  mt-3 m-auto">
        <div className="col-md-6 p-5">
          <div className="row mt-3 container_proud crdbor shadow p-3 mb-5 cntbglcr ">
            {serviceData?.map((service, index) => (
              <div className="col-md-4 ">
                <div className="row  ">
                  <div className="col-md-10 ">
                    <Link
                      className="linkt"
                      onClick={(e) => handleShowSelectCategory(e, service._id)}
                    >
                      <div className="  shadow-sm  text-center bg-white  subimg1 p-2">
                        <img
                          className="subimg  p-0 m-auto    bg-white  "
                          height={100}
                          width={100}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/service/${service?.serviceImg}`}
                        />{" "}
                      </div>
                      <p className="row fnt12 text-center m-auto p-2 boldt">
                        {service.serviceName}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-md-6 m-auto p-5 ">
          <div className="row">
            {subcategoryVideo &&
              subcategoryVideo.map((Ele) => {
                <video
                  src={`https://api.vijayhomesuperadmin.in/subcategory/${Ele.videolink}`}
                ></video>;
              })}
          </div>

          <div className="row bgclr p-2">
            <div className="row m-auto">
              <h6
                className=" fnt boldt p-0  "
                style={{
                  borderBottom: "2px solid black",
                  width: "fit-content",
                  marginRight: "1px",
                }}
              >
                Book Our Service
              </h6>
              ,
              <h6
                className=" fnt boldt p-0  "
                style={{
                  borderBottom: "2px solid black",
                  width: "fit-content",
                  marginRight: "1px",
                }}
              >
                Let the
              </h6>{" "}
              ,
              <h6
                className=" fnt boldt p-0  "
                style={{
                  borderBottom: "2px solid black",
                  width: "fit-content",
                  marginRight: "1px",
                }}
              >
                Good times roll.
              </h6>
            </div>
            <div className="row m-auto mb-3 ">
              <span>
                <StarIcon className="clrstr" />
                <StarIcon className="clrstr" />
                <StarIcon className="clrstr" />
                <StarIcon className="clrstr" />
                <StarHalfIcon className="clrstr" />
                <span className="fnt " style={{ fontSize: "14px" }}>
                  {" "}
                  4.9 (7k+ Reviews | 31 Lakh + Happy Customer)
                </span>
              </span>
            </div>
            <div className="row m-auto">
              <img
                className="col-md-1 strclr"
                alt=""
                width={18}
                height={18}
                src="./Newimg/728673.png"
              />

              <p className="col-md-11">
                Lowest Price in Market || ISO Certified Company
              </p>
            </div>
            <div className="row m-auto">
              <img
                className="col-md-1 strclr"
                alt=""
                width={18}
                height={18}
                src="./Newimg/728673.png"
              />

              <p className="col-md-11">
                Lowest Price in Market || ISO Certified Company
              </p>
            </div>
            <div className="row m-auto">
              <img
                className="col-md-1 strclr"
                alt=""
                width={18}
                height={18}
                src="./Newimg/728673.png"
              />

              <p className="col-md-11">100% Satisfaction or FREE Network</p>
            </div>
            <div className="row m-auto">
              <img
                className="col-md-1 strclr"
                alt=""
                width={18}
                height={18}
                src="./Newimg/728673.png"
              />

              <p className="col-md-11">
                Trained Professionals | No Sub Contract
              </p>
            </div>
            <div className="row m-auto">
              <img
                className="col-md-1 strclr"
                alt=""
                width={18}
                height={18}
                src="./Newimg/728673.png"
              />

              <p className="col-md-11">
                Trusted By 31+ Lakh customers | 15+ Years
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <Modal
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
                      <div className="col-md-3 m-2 shadow-lg bg-white p-2 brdrd   mb-2 ">
                        <div className="row  m-auto">
                          <p
                            className="col-md-12 p-4 clrstr2  text-white shadow-sm "
                            style={{ width: "fitContent" }}
                          >
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
                        <div className="row mt-2">
                          <button
                            onClick={(e) => handleAdd(e, plan._id, innerindex)}
                            className="col-md-6  m-auto  fntbold text-center p-1  fnts btn_clr   "
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
              </>
            );
          })}

          <div className="container shadow-lg  acordinss p-3">
            {faqs.map((faq, index) => (
              <div key={index} className="accordion__section m-2">
                <div
                  className={` m-auto accordion ${
                    activeIndex1 === index ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion1(index)}
                >
                  <p
                    className="accordion__title  clrpr"
                    style={{ fontWeight: "bold", padding: "16px 0px 0px 6px" }}
                  >
                    <span className="me-2"> {index + 1} .</span>
                    {faq.title}
                  </p>
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "100px",
                      border: "1px solid black",
                      textAlign: "center",
                      margin: "10px 25px 0px 2px",
                      paddingTop: "3px",
                    }}
                  >
                    {activeIndex1 === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </span>
                </div>
                <div
                  style={{
                    maxHeight: `${activeIndex1 === index ? "1000px" : "0px"}`,
                  }}
                  className="accordion__content"
                >
                  <div className="accordion__text clrpr">{faq.content}</div>
                </div>
              </div>
            ))}
          </div>
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
      </Modal> */}

      {/* <Modal size="lg" show={OpenViewCartModal} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <h1 className=" clrstr fnt">Cart</h1>
        </Modal.Header>
        <Modal.Body>
          {SelectedService.map((price) => {
            return (
              <div className="row">
                <span className="col-md-4 col-md-4 fs-5 m-auto  fntbold  ">
                  {price.pName}
                </span>
               
                <Button variant="secondary" className="col-md-4  p-0">
                  <span
                    className="me-2 fs-5 p-0"
                    onClick={() => setQuantity(Quantity + 1)}
                  >
                    +
                  </span>
                  <span className="me-2 ms-2 fs-5 p-0">{Quantity} </span>
                  <span
                    className="ms-2 fs-5 p-0"
                    onClick={() => {
                      if (Quantity > 1) {
                        setQuantity(Quantity - 1);
                      }
                    }}
                  >
                    -
                  </span>
                </Button>
                
                <span span className="col-md-4 m-auto fs-3 fntbold  clrstr ">
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
                  onClick={(e) => {
                    e.preventDefault();
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
                      <span className="col-md-6 m-auto p-0">
                        Rs.{price.pofferprice}
                      </span>
                      <span className="col-md-6 m-auto p-0">View Cart</span>
                    </p>
                  </Link>
                </Button>
              ))
          )}
        </Modal.Footer>
      </Modal> */}
      <Footer />
    </>
  );
}

export default Servicedetails;
