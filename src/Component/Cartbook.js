import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart1, removeMyCartItem, clearCart } from "../Redux1/MyCartSlice";
import { deleteMyCartItem } from "../Redux1/MyCartSlice";
import NabarCompo from "./navbar";

import axios from "axios";
import {
  addToCartaddon,
  addToCart1addon,
  removeMyCartItemaddon,
  clearCartaddon,
} from "../Redux/MyCartSlice";
import { deleteMyCartItemaddon } from "../Redux/MyCartSlice";
import moment from "moment";
import Calendar from "react-calendar";
import "../Pages/ViewCart/Components/CartDetails/cartdetails.scss";

import Modal from "react-bootstrap/Modal";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Cartbook() {
  const [addondata, setaddondata] = useState([]);
  const dispatch = useDispatch();
  const MyCartItmes = useSelector((state) => state.cart);
  const MyCartaddonItmes = useSelector((state) => state.addon);
  const [fourDates, setFourDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datepicker, setdatePicker] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [voucherdata, setvoucherdata] = useState([]);
  const [voucherCodeValue, setVoucherCodeValue] = useState();
  const [Carttotal, setCarttotal] = useState(0);
  const [Fulladd, setFulladd] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    let timer;
    if (show2) {
      timer = setTimeout(() => {
        setShow2(false);
        window.location.assign("/");
      }, 3000); // 3 seconds
    }
    return () => {
      clearTimeout(timer);
    };
  }, [show2]);

  // const user = JSON.parse(localStorage.getItem("user"));

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const [validationMessage, setValidationMessage] = useState("");

  const [discountedTotal, setDiscountedTotal] = useState(0);

  const [SavedAmount, setSavedAmount] = useState(0);
  const [customerData, setCustomerData] = useState({
    customerName: "",
    email: "",
  });

  useEffect(() => {
    localStorage.setItem("customerName", customerName);
  }, [customerName]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  const storedCustomerName = localStorage.getItem("customerName");

  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    const newCartTotal = MyCartItmes.reduce(
      (accumulator, item) => {
        if (!item) return accumulator; // Ensure item is not undefined

        const offerPrice = parseFloat(item?.offerprice) || 0;
        const quantity = parseInt(item?.qty) || 0;
        const planPrice = parseFloat(item?.planPrice?.trim()) || 0;

        if (!isNaN(offerPrice) && !isNaN(quantity) && !isNaN(planPrice)) {
          const subtotal = planPrice * quantity;
          const planSubtotal = offerPrice * quantity;
          const saved = Math.abs(planSubtotal - subtotal);

          accumulator.savedAmount += saved;
          accumulator.total += subtotal;
          accumulator.planSubtotal += planSubtotal;
        } else if (!isNaN(offerPrice) && !isNaN(quantity)) {
          const planSubtotal = offerPrice * quantity;
          accumulator.total += planSubtotal;
          accumulator.planSubtotal += planSubtotal;
        }

        return accumulator;
      },
      { total: 0, savedAmount: 0, planSubtotal: 0 }
    );

    // Calculate total price for addon items
    const addonTotal = MyCartaddonItmes.reduce((accumulator, addon) => {
      const addonPlanPrice = parseFloat(addon?.planPrice) || 0;
      const addonQuantity = parseInt(addon?.qty) || 0;
      return accumulator + addonPlanPrice * addonQuantity;
    }, 0);

    const addonTotal1 = MyCartaddonItmes.reduce((accumulator, addon) => {
      const addonPlanPrice = parseFloat(addon?.oferprice) || 0;
      const addonQuantity = parseInt(addon?.qty) || 0;
      return accumulator + addonPlanPrice * addonQuantity;
    }, 0);

    newCartTotal.total += addonTotal;
    newCartTotal.planSubtotal += addonTotal1;

    setCarttotal(newCartTotal.total); // Update the state with the new Cart total
    setSavedAmount(newCartTotal.savedAmount); // Update the state with the total saved amount

    // If a coupon code has been applied, calculate the discount
    if (voucherCodeValue === voucherdata?.voucherCode) {
      const discountAmount =
        (newCartTotal.planSubtotal * (voucherdata?.discountPercentage || 0)) /
        100;
      const grandTotal = newCartTotal.planSubtotal - discountAmount;
      setDiscountAmount(grandTotal);
      setCouponPercentage(voucherdata?.discountPercentage);
    } else {
      setDiscountAmount(newCartTotal.planSubtotal);
    }
  }, [MyCartItmes, MyCartaddonItmes, voucherCodeValue, voucherdata]);

  const [couponPercentage, setCouponPercentage] = useState(0);
  const [DiscountAmount, setDiscountAmount] = useState(0);

  const applyCouponCode = async () => {
    if (voucherCodeValue === voucherdata?.voucherCode) {
      const discountAmount = (Carttotal * voucherdata.discountPercentage) / 100;

      setDiscountAmount(Carttotal - discountAmount);
      setCouponPercentage(voucherdata.discountPercentage);
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) {
      return;
    }

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    const location = { latitude, longitude };
    setSelectedLocation(location);
    setSelectedPlaceAddress(place.formatted_address || "");

    // Adjust map bounds to include both the marker and the searched location
    if (mapRef.current && mapRef.current.getMap) {
      const map = mapRef.current.getMap();
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(location);
      if (selectedLocation) {
        bounds.extend(selectedLocation);
      }
      map.fitBounds(bounds);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const addAddress = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleShow1 = () => {
    setShow1(true);
    setShow(false);
  };

  const DatePicker = (e) => {
    e.preventDefault();
    setdatePicker(true);
  };

  const currentDate = new Date();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    const getNextDays = () => {
      const nextDays = [];
      for (let i = 0; i < 4; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dayName = daysOfWeek[date.getDay()];

        nextDays.push({ day, month, year, dayName });
      }
      return nextDays;
    };

    const nextDays = getNextDays();
    setFourDates(nextDays);
  }, []);

  const monthsMap = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;

    const { day: dayNumber, month, year } = day;
    const monthName = monthsMap[month];

    if (!monthName) {
      return false;
    }

    const formattedDay = moment(
      `${monthName} ${dayNumber}, ${year}`,
      "MMMM D, YYYY"
    ).format("LL");

    return formattedDay === selectedDate;
  };

  const handleCheckboxSelect = (day) => {
    const formattedDate = `${day.year}-${day.month}-${day.day}`;
    const selectedDate = moment(formattedDate, "YYYY-MM-DD");

    setSelectedDate(selectedDate.format("YYYY-MM-DD"));
  };

  const addQuantity = (item) => {
    dispatch(addToCartaddon(item));
  };
  const increaseQuantity = (item) => {
    dispatch(addToCart1addon(item));
  };

  const handleServiceQty = (item) => {
    dispatch(addToCart1(item));
  };

  useEffect(() => {
    getaddon();
  }, []);

  const getaddon = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getServiceAddOns"
    );
    if ((res.status = 200)) {
      setaddondata(
        res.data?.AddOns.filter(
          (i) => i.addOnsCategory === MyCartItmes[0]?.service?.serviceName
        )
      );
    }
  };

  const handleCalendarSelect = (date) => {
    const selectedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(selectedDate);
    setdatePicker(false);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const tileDisabled = ({ date }) => {
    const isPastDate = date < currentDate;

    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isPastDate && !isNextFourDate;
  };

  const tileClassName = ({ date }) => {
    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isNextFourDate ? "selecteddate" : "";
  };

  const localstoragecitys = localStorage.getItem("city");

  const [Service, setService] = useState([]);
  const value = JSON.parse(localStorage.getItem("user"));
  const [customeraddress, setcustomerAddressdata] = useState([]);

  useEffect(() => {
    getAllServices();
    getVoucher();
  }, []);

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getservices"
      );
      if (res.status === 200) {
        setService(res.data.service);
      }
      let addressRes = await axios.get(
        `http://localhost:8080/api/getcustomeraddresswithuserid/${value?._id}`
      );
      if (addressRes) {
        setcustomerAddressdata(addressRes.data?.customerAddress);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const [houseFlat, setHouseFlat] = useState("");
  const [landmark, setLandmark] = useState("");
  const [home, setHome] = useState("");
  const [others, setOthers] = useState("");
  const [othersPlace, setOthersPlace] = useState("");

  const saveAddress = async (e) => {
    // e.preventDefault();
    try {
      const config = {
        url: "/addcustomeraddress",
        method: "post",
        baseURL: "http://localhost:8080/api",
        headers: { "content-type": "application/json" },
        data: {
          userId: value._id,
          address: selectedPlaceAddress,
          saveAs: home ? "Home" : others ? othersPlace : "",
          landmark: landmark,
          platNo: houseFlat,
          markerCoordinate: selectedLocation,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          setShow1(false);
          getAllServices();
        }
      });
    } catch (error) {
      console.error(error);
      alert(
        "Address not added, Please delete one address to update another address "
      );
    }
  };

  const saveAddress1 = () => {
    const fullAddress = `${houseFlat}, ${landmark},${selectedPlaceAddress}, ${
      home ? "Home" : "Others: " + othersPlace
    }`;
    setFulladd(fullAddress);
  };

  const filteredData =
    MyCartItmes[0]?.service?.store_slots?.filter(
      (item) => item.slotCity === localstoragecitys
    ) || [];

  const now = new Date();

  const filteredData1 = filteredData.filter((item) => {
    try {
      const currentDateISO = now.toISOString().split("T")[0];

      const startTimeString = item.startTime.split("-")[0].trim();

      const dateTimeString = `${currentDateISO}T${item.startTime
        .split("-")[0]
        .trim()}`;

      const startTime = moment(dateTimeString, "YYYY-MM-DDThh:mmA");

      if (!startTime.isValid()) {
        return false;
      }

      const startTimeDate = startTime.toDate();

      const timeDifferenceInHours = (startTimeDate - now) / (1000 * 60 * 60);

      return timeDifferenceInHours >= 2;
    } catch (error) {
      console.error("Error parsing date:", error);
      return false;
    }
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [selectedSlotText, setSelectedSlotText] = useState("");

  const handleSlotClick1 = (index, startTime) => {
    setSelectedSlotIndex(index);
    setSelectedSlotText(`${startTime}`);
    addAddress();
  };

  const renderSlots = () => {
    if (!selectedDate) {
      return null;
    }

    const currentDate = new Date();
    const dateToCompare = new Date(selectedDate);

    let slots;

    if (currentDate == dateToCompare) {
      slots = filteredData || [];
    } else if (currentDate > dateToCompare) {
      slots = filteredData1 || [];
    } else {
      slots = filteredData || [];
    }

    slots.sort((a, b) => {
      const startTimeA = moment(a.startTime, "hA");
      const startTimeB = moment(b.startTime, "hA");
      return startTimeA.diff(startTimeB);
    });

    return (
      <div className="row">
        {slots.map((slot, index) => (
          <div key={index} className="col-md-2">
            <div
              className="mt-3"
              style={{
                border: "1px solid grey",
                fontSize: "14px",
                textAlign: "center",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                color: selectedSlotIndex === index ? "white" : "black",
                backgroundColor: selectedSlotIndex === index ? "darkred" : "",
              }}
              onClick={() => handleSlotClick1(index, slot.startTime)}
            >
              {slot.startTime}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // bOOKING dETAILS

  const servicePeriod = 1;
  const serviceFrequency = 1;

  const sDate = moment(selectedDate, "YYYY-MM-DD");
  const eDate = moment(selectedDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / serviceFrequency);

  // console.log("selectedDate====", selectedDate);

  // console.log("sDate====", sDate);
  // console.log("eDate====", eDate);

  const dividedDates = [];

  const sf = serviceFrequency ? serviceFrequency : "1";
  for (let i = 0; i < sf; i++) {
    const date = sDate
      .clone()
      .add(interval * i, "days")
      .format("YYYY-MM-DD");
    dividedDates.push(date);
  }

  const sAmtDate = moment(selectedDate, "YYYY-MM-DD");
  const eamtDate = moment(selectedDate, "YYYY-MM-DD");
  const amtFrequency = 1;
  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, "days"));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);

  const dividedamtDates = [];
  const dividedamtCharges = [];

  for (let i = 0; i < 1; i++) {
    const date = sDate
      .clone()
      .add(intervalamt * i, "days")
      .format("YYYY-MM-DD");
    dividedamtDates.push(date);
    const charge = DiscountAmount;
    dividedamtCharges.push(charge);
  }

  const joinedNames = MyCartItmes.map((item) => {
    const serviceName = item.service?.serviceName || ""; // Get serviceName or an empty string if it's undefined
    return `${serviceName}+${item.planName}(${item.qty})`;
  });
  const joinedaddonNames = MyCartaddonItmes.map((item) => {
    const serviceName = item.planName || "";
    return `${item.planName}(${item.qty})`;
  });

  const joinedPlanNames = joinedNames.join(", ");
  const joinedPlanaddonNames = joinedaddonNames.join(", ");

  const advp = (a) => {
    // navigate("/success", { state: { data: a } });
    setShow2(true);
  };

  const addtreatmentdetails = async (e) => {
    e.preventDefault();
    if (!selectedAddress || !selectedSlotText) {
      alert("Please select address and time slots");
    } else {
      try {
        const config = {
          url: "http://localhost:8080/api/addservicedetails",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            customerData: {
              _id: user?._id,
              EnquiryId: user?.EnquiryId,
              customerName: user?.customerName,
              category: user?.category,
              mainContact: user?.mainContact,
              email: user?.email,
              approach: user?.approach,
            },
            dividedDates: dividedDates.length ? dividedDates : [selectedDate],
            customerName: storedCustomerName,
            email: storedEmail,
            dividedamtCharges: dividedamtCharges,
            dividedamtDates: dividedamtDates,
            cardNo: user?.cardNo,
            category: MyCartItmes[0]?.service?.category,
            contractType: "One Time",
            service: MyCartItmes[0]?.service?.serviceName,
            serviceID: MyCartItmes[0]?.service?._id,
            serviceCharge: DiscountAmount,
            dateofService: selectedDate,
            selectedSlotText: selectedSlotText,
            serviceFrequency: 1,
            startDate: selectedDate,
            expiryDate: selectedDate,
            firstserviceDate: selectedDate,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("LT"),
            type: "website",
            desc: joinedPlanNames + joinedPlanaddonNames,
            city: localstoragecitys,
            userId: user?._id,
            discAmt: 0,
            GrandTotal: DiscountAmount,
            paymentMode: "cash",
            TotalAmt: Carttotal,
            couponCode: voucherCodeValue,
            totalSaved: SavedAmount,
            markerCoordinate: selectedAddress?.markerCoordinate,
            deliveryAddress: selectedAddress,
          },
        };

        const response = await axios(config);

        if (response.status === 200) {
          alert("added");
          console.log("response.data.user", response.data);
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          // advp(response.data.data);
          setShow2(true);
          setResponseData(response.data);
        }
      } catch (error) {
        console.error(error);
        alert("Not Added");
      }
    }
  };

  console.log("sumanesponce", responseData);

  const user12 = localStorage.getItem("user123");
  console.log("user12suman=====", user12);

  const [selectedAddress, setSelectedAddress] = useState({});
  const [checkAddress, setCheckAddress] = useState(false);
  const [Voucher, setVoucher] = useState([]);
  console.log(Voucher, "Voucher============");

  const handleSelectAddress = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
  };

  console.log("selectedAddress====", selectedAddress);

  const ProceedAddress = () => {
    if (Object.keys(selectedAddress).length === 0) {
      alert("Please Select Any Address");
    } else {
      setSelectedAddress(selectedAddress);
      setShow(false);
    }
  };

  const getVoucher = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getvoucher"
    );
    if (res.status === 200) {
      const uniqueCategories = MyCartItmes?.[0]?.service?.category;

      let filteredVoucherData = res.data?.voucher.find(
        (voch) => voch.category === uniqueCategories
      );

      console.log(filteredVoucherData, "filteredVoucherData");
      setvoucherdata(filteredVoucherData);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const requestData = {
      amount: parseFloat(1000) * 100,
    };

    try {
      const config = {
        url: "/payment/addpayment",
        method: "post",
        baseURL: "https://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: requestData,
      };
      const res = await axios(config);

      if (res.status === 200) {
        const base64ResponseData = res.data.base64;
        const sha256ResponseData = res.data.sha256encode;

        // setTransaction(res.data.merchantTransactionId);
        console.log("sha256ResponseData", sha256ResponseData);
        console.log("base64ResponseData", base64ResponseData);

        initiatePayment(base64ResponseData, sha256ResponseData);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
        console.log(error.response.data.error);
      }
    }
  };

  // const initiatePayment = async (base64Data, sha256Data) => {
  //   try {
  //     const data = JSON.stringify({
  //       request: base64Data,
  //     });

  //     console.log("dattta==", data);
  //     const config = {
  //       method: "post",
  //       url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-VERIFY": sha256Data,
  //       },
  //       data: {
  //         request: base64Data,
  //       },
  //     };

  //     const response = await axios.request(config);

  //     console.log("response", response);
  //     const { redirectInfo } = response.data.data.instrumentResponse;
  //     console.log("redirectInfo", redirectInfo);

  //     // Uncomment these lines if you are using them in your application
  //     // setPaymentUrl(redirectInfo.url);
  //     // setShowWebView(true);
  //     // setIsCheckingStatus(true);
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.error("Response data:", error.response.data);
  //       console.error("Response status:", error.response.status);
  //       console.error("Response headers:", error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error("Request data:", error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error("Error message:", error.message);
  //     }
  //     // setIsCheckingStatus(false);
  //     // Handle the error accordingly
  //   }
  // };
  // console.log("selectedAddress", selectedAddress);

  const initiatePayment = (base64Data, sha256Data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-VERIFY", sha256Data);

    const raw = JSON.stringify({
      request: base64Data,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.phonepe.com/apis/hermes/pg/v1/pay", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error initiating payment:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      });
  };
  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <NabarCompo />
      <div className="col-md-10 mt-3">
        <div
          className="mb-3"
          style={{
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Service Details
        </div>
        {MyCartItmes.map((item) => (
          <div
            className="row"
            style={{
              backgroundColor: "white",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            <div className="col-md-10">
              <div
                className=""
                style={{
                  color: "darkred",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {item.planName}
              </div>
              <div className="">{item.category}</div>
              <div className="d-flex">
                <div className="" style={{ textDecoration: "line-through" }}>
                  ₹{item.planPrice}
                </div>
                <div className="mx-2">₹{item.offerprice}</div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="" style={{ textAlign: "center" }}>
                ₹ {item.qty * item.offerprice}
              </div>
              <div className="d-flex mt-2" style={{ justifyContent: "center" }}>
                <div
                  className=""
                  style={{}}
                  onClick={() => {
                    if (item.qty > 1) {
                      dispatch(removeMyCartItem(item));
                    } else {
                      dispatch(deleteMyCartItem(item.id));
                    }
                  }}
                >
                  <i
                    class="fa-solid fa-minus"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      backgroundColor: "green",
                      padding: "5px",
                      borderRadius: "50px",
                    }}
                  ></i>
                </div>
                <div
                  className="mx-2"
                  style={{ color: "black", fontSize: "14px", marginTop: "3px" }}
                >
                  {item.qty}
                </div>
                <div className="" onClick={() => handleServiceQty(item)}>
                  <i
                    class="fa-solid fa-plus"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      backgroundColor: "green",
                      padding: "5px",
                      borderRadius: "50px",
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          className="mb-3"
          style={{
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Frequently Added Together
        </div>

        <div className="row">
          {addondata.map((i) => {
            const cartItem = Array.isArray(MyCartaddonItmes)
              ? MyCartaddonItmes.find((cartItem) => cartItem.id === i._id)
              : null;
            const isItemInCart = !!cartItem;

            return (
              <div className="col-md-4 mb-4">
                <div
                  className="d-flex"
                  style={{ backgroundColor: "#E4D3BE", borderRadius: "10px" }}
                >
                  <div className="col-md-6 p-0">
                    <img
                      src={`https://api.vijayhomesuperadmin.in/addOns/${i.addOnsImage}`}
                      alt="loading...."
                      style={{
                        width: "100%",
                        height: "-webkit-fill-available",
                        borderRadius: "10px",
                        height: "185px",
                      }}
                    />
                  </div>
                  <div className="col-md-6 p-3">
                    <div
                      className=""
                      style={{ color: "black", fontSize: "15px" }}
                    >
                      {i.addOnsName}
                    </div>
                    <div
                      className=""
                      style={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {i.addOnsDescription}
                    </div>

                    <div className="d-flex">
                      <div
                        className=""
                        style={{ textDecoration: "line-through" }}
                      >
                        {" "}
                        {cartItem?.qty
                          ? cartItem?.qty * i.addOnsPrice
                          : i.addOnsPrice}
                      </div>
                      <div className="mx-2">
                        {" "}
                        ₹
                        {cartItem?.qty
                          ? cartItem?.qty * i.addOnsOfferPrice
                          : i.addOnsOfferPrice}
                      </div>
                    </div>
                    {isItemInCart ? (
                      <div className="d-flex mt-2">
                        <div
                          className=""
                          onClick={() => {
                            if (cartItem.qty > 1) {
                              dispatch(removeMyCartItemaddon(cartItem));
                            } else {
                              dispatch(deleteMyCartItemaddon(cartItem.id));
                            }
                          }}
                          style={{}}
                        >
                          <i
                            class="fa-solid fa-minus"
                            style={{
                              color: "white",
                              fontSize: "14px",
                              backgroundColor: "green",
                              padding: "5px",
                              borderRadius: "50px",
                            }}
                          ></i>
                        </div>
                        <div
                          className="mx-2"
                          style={{
                            color: "black",
                            fontSize: "14px",
                            marginTop: "3px",
                          }}
                        >
                          {cartItem.qty}
                        </div>
                        <div
                          className=""
                          onClick={() => increaseQuantity(cartItem)}
                        >
                          <i
                            class="fa-solid fa-plus"
                            style={{
                              color: "white",
                              fontSize: "14px",
                              backgroundColor: "green",
                              padding: "5px",
                              borderRadius: "50px",
                            }}
                          ></i>
                        </div>
                      </div>
                    ) : (
                      <div
                        className=""
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          textAlign: "center",
                          fontSize: "14px",
                          color: "white",
                          width: "83px",
                          borderRadius: "10px",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => addQuantity(i)}
                      >
                        Add
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="scheduleservice mb-5">
          <div className="title">Schedule Service</div>
          <div className="select_date">
            <div className="text">Select the date</div>

            <div className="date_selection">
              {fourDates?.map((day, index) => {
                const isDefaultChecked = isDateSelected(day);

                return (
                  <label htmlFor={index} key={index}>
                    <input type="checkbox" name="" id={day?.day} />

                    <span
                      className={`inpt ${isDefaultChecked ? "matching" : ""}`}
                      onClick={() => handleCheckboxSelect(day)}
                    >
                      {day?.dayName}- {day?.day}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="date">
              <button onClick={DatePicker} style={{ cursor: "pointer" }}>
                Pick Date{" "}
                <span>
                  {selectedDate && (
                    <div
                      className="selected_date mx-2"
                      style={{ color: "darkred" }}
                    >
                      {moment(selectedDate).format("YYYY-MM-DD")}
                    </div>
                  )}
                </span>
              </button>
              <div className="date_picker"></div>
            </div>
            {datepicker && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  zIndex: "100",
                  marginTop: "-250px",
                }}
              >
                <div>
                  <Calendar
                    onChange={(date) => handleCalendarSelect(date)}
                    value={selectedDate}
                    calendarType="US"
                    tileDisabled={tileDisabled}
                    tileClassName={tileClassName}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="select_date">
            <div className="text">Select the Slot</div>

            {renderSlots()}
          </div>
        </div>

        <div
          className=""
          style={{
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Select the address
        </div>

        <div
          className="shadow-sm mt-2 mb-2"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {Object.keys(selectedAddress).length > 0 && (
            <>
              {selectedAddress.platNo},{selectedAddress.address}
              <p>{selectedAddress.landmark}</p>
            </>
          )}
        </div>

        {user?.customerName || user?.email ? (
          <></>
        ) : (
          <>
            <div
              className="mt-3"
              style={{
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Customer details
            </div>
            <div className="mt-3 mb-2">Customer Name</div>

            <div className="">
              <input
                type="text"
                className=""
                onChange={(e) => setcustomerName(e.target.value)}
                value={customerName}
                placeholder="Customer Name"
                style={{ border: "1px solid grey", height: "45px" }}
              />
            </div>

            <div className="mb-2">Email</div>

            <div className="">
              <input
                type="text"
                className=""
                onChange={(e) => setemail(e.target.value)}
                value={email}
                placeholder="Email"
                style={{ border: "1px solid grey", height: "45px" }}
              />
            </div>
          </>
        )}

        {/* {voucherdata && ( */}
        <>
          <div
            className="mt-5"
            style={{
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Coupons & Offers
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <input
                type="text"
                className=""
                style={{
                  border: "1px solid grey",
                  padding: "8px",
                  borderRadius: "10px",
                }}
                value={voucherCodeValue}
                placeholder="Enter Voucher Code"
                onChange={(e) => setVoucherCodeValue(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <div
                onClick={() => {
                  const result = applyCouponCode();
                  setDiscountedTotal(result);
                  // setCouponDiscountShow(true)
                }}
                style={{
                  backgroundColor: "darkred",
                  padding: "8px",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Apply
              </div>
            </div>
          </div>

          <div style={{ color: "red" }}>{validationMessage}</div>
        </>
        {/* )} */}

        <div
          className="mt-3"
          style={{
            color: "#40A2D8",
            fontWeight: "900",
            textAlign: "auto",
          }}
        >
          * Book Over Rs 1500 to use wallet , upto 10% From your wallet Account
          !
        </div>
        <div
          className="mt-1 mb-3"
          style={{
            color: "#40A2D8",
            fontWeight: "900",
            textAlign: "auto",
          }}
        >
          * Book over Rs 1500, get 2% cashback in your wallet !
        </div>

        <div
          className=""
          style={{ color: "darkred", fontSize: "18px", fontWeight: "bold" }}
        >
          Payment Summary
        </div>

        <div className="row mt-3">
          <div className="col-md-4">Total Amount</div>
          <div className="col-md-4" style={{ textDecoration: "line-through" }}>
            ₹{Carttotal}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">Discount</div>
          <div className="col-md-4">{couponPercentage}%</div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">Saved</div>
          <div className="col-md-4" style={{ color: "#40A2D8" }}>
            ₹ {SavedAmount}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">Grand Total</div>
          <div className="col-md-4" style={{ color: "#40A2D8" }}>
            ₹{DiscountAmount}
          </div>
        </div>

        <div className="row mt-5 mb-5">
          <div
            onClick={addtreatmentdetails}
            className="col-md-8"
            style={{
              backgroundColor: "darkred",
              padding: "8px",
              color: "white",
              fontSize: "14px",
              textAlign: "center",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Book
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div
            onClick={submit}
            className="col-md-8"
            style={{
              backgroundColor: "darkred",
              padding: "8px",
              color: "white",
              fontSize: "14px",
              textAlign: "center",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Payment
          </div>
        </div>

        {/* old address select */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "20px", fontWeight: "bold" }}>
              Select your address
            </Modal.Title>
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
            <div className="row mb-2">
              {customeraddress.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    key={index}
                    className="col-md-1"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <input
                      type="radio"
                      value={item._id}
                      id={item._id}
                      checked={selectedAddress._id === item._id}
                      onChange={() => handleSelectAddress(item)}
                    />
                  </div>
                  <div className="col-md-11 mb-3">
                    <div
                      className=""
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.saveAs}
                    </div>
                    <div
                      className=""
                      style={{
                        color: "black",
                        fontSize: "14px",
                      }}
                    >
                      {item.platNo},{item.address}
                    </div>
                    <div
                      className=""
                      style={{
                        color: "black",
                        fontSize: "13px",
                      }}
                    >
                      Landmark : {item.landmark}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <hr />

            <div className="d-flex">
              <i className="fa-solid fa-plus mt-1"></i>
              <div
                onClick={handleShow1}
                className="mx-3"
                style={{
                  color: "darkred",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Add new address
              </div>
            </div>

            <div
              className=""
              style={{
                backgroundColor: "darkred",
                padding: "8px",
                textAlign: "center",
                color: "white",
                fontSize: "14px",
                borderRadius: "5px",
                marginTop: "30px",
                cursor: "pointer",
              }}
              onClick={ProceedAddress}
            >
              Proceed
            </div>
          </Modal.Body>
        </Modal>

        {/* showing google map after add addresss=========================== */}
        {show1 && (
          <div className="row mb-2 p-2">
            <div className="" style={{ width: "100%", height: "200px" }}>
              <LoadScript
                googleMapsApiKey="AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk"
                libraries={["places"]}
              >
                <GoogleMap
                  ref={mapRef}
                  center={{ lat: 12.9716, lng: 77.5946 }}
                  zoom={10}
                  mapContainerStyle={{
                    height: "100%",
                    width: "100%",
                    zIndex: 111,
                  }}
                >
                  {selectedLocation && <Marker position={selectedLocation} />}

                  <Autocomplete
                    onLoad={(autocomplete) => {
                      // console.log("Autocomplete loaded:", autocomplete);
                      autocompleteRef.current = autocomplete;
                    }}
                    options={{
                      fields: ["formatted_address", "geometry", "name"],
                      types: ["geocode"],
                      // componentRestrictions: { country: "us" },
                    }}
                    onPlaceChanged={handlePlaceSelect}
                    style={{ backgroundColor: "red", zIndex: 111 }}
                  >
                    <input
                      type="text"
                      placeholder="Search for a location"
                      style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "relative",
                        left: "50%",
                        marginLeft: "-120px",
                      }}
                    />
                  </Autocomplete>
                </GoogleMap>
              </LoadScript>
            </div>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {selectedPlaceAddress && (
                <p>Searched Location: {selectedPlaceAddress}</p>
              )}
            </div>

            <div className="mt-3">
              <div
                className="mb-1"
                style={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                House/Flat/Block No <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                style={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  height: "40px",
                }}
                onChange={(e) => setHouseFlat(e.target.value)}
              />
            </div>

            <div className="">
              <div
                className="mb-1"
                style={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Landmark / Society name <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                style={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  height: "40px",
                }}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>

            <div className="">
              <div
                className="mb-1"
                style={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Save as <span style={{ color: "red" }}>*</span>
              </div>
              <div className="d-flex">
                <div className="col-md-3">
                  <div
                    className=""
                    style={{
                      border: "1px solid grey",
                      padding: "3px",
                      textAlign: "center",
                      borderRadius: "5px",
                      cursor: "pointer",
                      color: home ? "white" : "black",
                      backgroundColor: home ? "darkred" : "white",
                    }}
                    onClick={() => {
                      setHome(true);
                      setOthers(false);
                    }}
                  >
                    Home
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-3">
                  <div
                    className=""
                    style={{
                      border: "1px solid grey",
                      padding: "3px",
                      textAlign: "center",
                      borderRadius: "5px",
                      cursor: "pointer",
                      color: others ? "white" : "black",
                      backgroundColor: others ? "darkred" : "white",
                    }}
                    onClick={() => {
                      setHome(false);
                      setOthers(true);
                    }}
                  >
                    Others
                  </div>
                </div>
                {others && (
                  <div className="col-md-3 ms-2">
                    <input
                      style={{ border: "1px solid black" }}
                      onChange={(e) => setOthersPlace(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div
              className=""
              style={{
                backgroundColor: "darkred",
                padding: "8px",
                textAlign: "center",
                color: "white",
                fontSize: "14px",
                borderRadius: "5px",
                marginTop: "25px",
                cursor: "pointer",
              }}
              // onClick={saveAddress}
              onClick={() => {
                saveAddress();
                saveAddress1();
              }}
            >
              Save
            </div>
          </div>
        )}

        {/* Success Modal */}

        <Modal show={show2} centered onHide={handleClose2}>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <video
                className="p-0"
                style={{ objectFit: "cover", width: "200px", height: "200px" }}
                autoPlay
                loop
                src={require("../Assets/Images/a.mp4")}
              ></video>
            </div>
            <div className="row">
              <div className="col-md-5 text-center">Category</div>
              <div className="col-md-1 ">:</div>
              <div className="col-md-6 ">{responseData?.data.category}</div>
            </div>

            <div className="row mt-3">
              <div className="col-md-5 text-center">Service</div>
              <div className="col-md-1 ">:</div>
              <div className="col-md-6 ">{responseData?.data.service}</div>
            </div>

            <div className="row mt-3">
              <div className="col-md-5 text-center">Description</div>
              <div className="col-md-1 ">:</div>
              <div className="col-md-6 ">{responseData?.data.desc}</div>
            </div>

            <div className="row mt-3">
              <div className="col-md-5 text-center">Date of Service</div>
              <div className="col-md-1 ">:</div>
              <div className="col-md-6 ">
                {responseData?.data.dateofService}
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-5 text-center">Service Charge</div>
              <div className="col-md-1 ">:</div>
              <div className="col-md-6 ">
                {responseData?.data.serviceCharge}
              </div>
            </div>

            <div className="d-flex justify-content-center mt-3 mb-3">
              <Button
                variant="secondary"
                onClick={handleClose2}
                style={{ width: "200px", backgroundColor: "darkred" }}
              >
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Cartbook;
