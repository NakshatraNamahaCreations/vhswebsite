import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import NabarCompo from "./navbar";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import { Button } from "react-bootstrap";
import Header2 from "./Header2";

function Summary() {
  const location = useLocation();
  const { plan, sdata } = location.state || {};

  console.log("sdata=======", plan);

  const [addondata, setaddondata] = useState([]);
  const dispatch = useDispatch();
  const MyCartItmes = useSelector((state) => state.cart);
  const MyCartaddonItmes = useSelector((state) => state.addon);
  const [fourDates, setFourDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datepicker, setdatePicker] = useState(false);
  console.log("MyCartaddonItmes=====", MyCartaddonItmes);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [voucherdata, setvoucherdata] = useState([]);
  const [voucherCodeValue, setVoucherCodeValue] = useState();
  const [Carttotal, setCarttotal] = useState(0);
  const [Fulladd, setFulladd] = useState("");
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Url, setUrl] = useState("");
  const [paymentModel, setpaymentModel] = useState(false);
  const [showbutton, setshowbutton] = useState(false);

  const handleClose3 = () => setpaymentModel(false);

  const handleClose2 = () => setShow2(false);
  const [responseData, setResponseData] = useState(null);
  const [email, setemail] = useState("");
  const [customerName, setcustomerName] = useState("");

  // const user = JSON.parse(localStorage.getItem("user"));

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log("laksi", user._id);

  const [validationMessage, setValidationMessage] = useState("");

  const [discountedTotal, setDiscountedTotal] = useState(0);

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

  console.log(
    voucherCodeValue,
    "voucherCode=++++++++++++++++++++++++++++++++++++++++++++"
  );

  const [SavedAmount, setSavedAmount] = useState(0);

  const [couponPercentage, setCouponPercentage] = useState(0);
  const [DiscountAmount, setDiscountAmount] = useState(0);

  const applyCouponCode = async () => {
    if (voucherCodeValue === voucherdata?.voucherCode) {
      const discountAmount =
        (Carttotal * parseInt(voucherdata?.discountPercentage)) / 100;

      setDiscountAmount(Carttotal - discountAmount);
      setCouponPercentage(parseInt(voucherdata.discountPercentage));
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
  // useEffect(() => {
  //   const getNextDays = () => {
  //     const nextDays = [];
  //     for (let i = 0; i < 4; i++) {
  //       const date = new Date();
  //       date.setDate(currentDate.getDate() + i);

  //       const day = date.getDate();
  //       const month = date.getMonth() + 1;
  //       const year = date.getFullYear();

  //       const dayName = daysOfWeek[date.getDay()];

  //       nextDays.push({ day, month, year, dayName });
  //     }
  //     return nextDays;
  //   };

  //   const nextDays = getNextDays();
  //   setFourDates(nextDays);
  // }, []);
  useEffect(() => {
    const getNextDays = () => {
      const nextDays = [];
      const currentDate = new Date();

      for (let i = 0; i < 12; i++) {
        // Changed to 12 dates
        const date = new Date(currentDate);
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
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  // const isDateSelected = (day) => {
  //   if (!selectedDate) return false;

  //   const { day: dayNumber, month, year } = day;
  //   const monthName = monthsMap[month];

  //   if (!monthName) {
  //     return false;
  //   }

  //   const formattedDay = moment(
  //     `${monthName} ${dayNumber}, ${year}`,
  //     "MMMM D, YYYY"
  //   ).format("LL");

  //   return formattedDay === selectedDate;
  // };
  const isDateSelected = (day) => {
    if (!selectedDate) return false;

    const { day: dayNumber, month, year } = day;
    const monthName = monthsMap[month];

    if (!monthName) {
      console.error("Invalid month:", month);
      return false;
    }

    const formattedDay = moment(
      `${year}-${month}-${dayNumber}`,
      "YYYY-M-D"
    ).format("YYYY-MM-DD");

    return formattedDay === selectedDate;
  };

  // const handleCheckboxSelect = (day) => {
  //   const formattedDate = `${day.year}-${day.month}-${day.day}`;
  //   const selectedDate = moment(formattedDate, "YYYY-MM-DD");

  //   setSelectedDate(selectedDate.format("YYYY-MM-DD"));
  // };

  const handleCheckboxSelect = (day) => {
    const formattedDate = `${day.year}-${day.month}-${day.day}`;
    const selectedDate = moment(formattedDate, "YYYY-MM-DD");

    setSelectedDate(selectedDate.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    getaddon();
  }, []);

  console.log("Fulladd====", Fulladd);

  const getaddon = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getServiceAddOns"
    );
    if ((res.status = 200)) {
      setaddondata(
        res.data?.AddOns.filter((i) => i.addOnsCategory === sdata?.serviceName)
      );
    }
  };

  console.log("addondata=====", addondata);

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
        `https://api.vijayhomeservicebengaluru.in/api/getcustomeraddresswithuserid/${value?._id}`
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
        baseURL: "https://api.vijayhomeservicebengaluru.in/api",
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
    sdata?.store_slots?.filter((item) => item.slotCity === localstoragecitys) ||
    [];

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
  console.log(
    "selectedSlotIndex",
    selectedSlotIndex,
    "selectedSlotText",
    selectedSlotText
  );
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

  const calculateExpiryDate = (selectedDate, servicePeriod) => {
    let monthsToAdd = 0;

    // Determine the number of months to add based on service period
    if (servicePeriod === "monthly") {
      monthsToAdd = 1;
    } else if (servicePeriod === "quart") {
      monthsToAdd = 3;
    } else if (servicePeriod === "half") {
      monthsToAdd = 6;
    } else if (servicePeriod === "year") {
      monthsToAdd = 12;
    }

    // Calculate the expiryDate by adding the months
    const expiryDate = moment(selectedDate)
      .add(monthsToAdd, "months")
      .format("YYYY-MM-DD");

    return expiryDate;
  };
  const servicePeriod = 1;
  const serviceFrequency = 1;
  const expiryDate = calculateExpiryDate(selectedDate, servicePeriod);

  const sDate = moment(selectedDate, "YYYY-MM-DD");
  const eDate = moment(expiryDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / serviceFrequency);
  const sAmtDate = moment(selectedDate, "YYYY-MM-DD");
  const eamtDate = moment(selectedDate, "YYYY-MM-DD");
  const amtFrequency = 1;
  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, "days"));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);
  console.log("selectedDate====", selectedDate);

  console.log("sDate====", sDate);
  console.log("eDate====", eDate);

  const dividedDates = [];
  const dividedamtCharges = [];
  const dividedamtDates = [];

  const sf = serviceFrequency ? serviceFrequency : "1";
  for (let i = 0; i < sf; i++) {
    const date = sDate
      .clone()
      .add(interval * i, "days")
      .format("YYYY-MM-DD");
    dividedDates.push(date);
  }

  console.log("dividedDates====", dividedDates);

  // const dividedamtCharge = Math.ceil(remainingAmt / amtFrequency);

  // const dividedamtCharges = [];

  for (let i = 0; i < 1; i++) {
    const date = sDate
      .clone()
      .add(intervalamt * i, "days")
      .format("YYYY-MM-DD");
    dividedamtDates.push(date);
    const charge = DiscountAmount;
    dividedamtCharges.push(charge);
  }

  console.log("dividedamtDates====", dividedamtDates);
  console.log("sAmtDate====", sAmtDate);
  console.log("eamtDate====", eamtDate);

  const addtreatmentdetails = async (e) => {
    e.preventDefault();
    if (!selectedAddress || !selectedSlotText) {
      alert("Please select address and time slots");
    } else {
      try {
        const config = {
          url: "https://api.vijayhomeservicebengaluru.in/api/addservicedetails",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            customerData: user,
            dividedDates: dividedDates ? dividedDates : selectedDate,
            dividedamtCharges: dividedamtCharges,
            dividedamtDates: dividedamtDates,
            customerName: customerName,
            email: email,
            cardNo: user?.cardNo,
            category: sdata?.category,
            contractType: !plan?.pservices ? "One Time" : "AMC",
            service: sdata?.serviceName,
            serviceID: sdata?._id,
            serviceCharge: a,
            dateofService: selectedDate,
            selectedSlotText: selectedSlotText,
            serviceFrequency: plan?.pservices,
            startDate: selectedDate,
            planName: plan?.pName,
            expiryDate: expiryDate,
            firstserviceDate: selectedDate,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("LT"),
            type: "website",
            city: localstoragecitys,
            userId: user?._id,
            discAmt: 0,
            GrandTotal: a,
            paymentMode: "cash",
            TotalAmt: plan.pPrice,
            couponCode: voucherCodeValue,
            totalSaved: Math.abs(plan.pofferprice - plan.pPrice),
            markerCoordinate: selectedLocation,
            deliveryAddress: selectedAddress,
          },
        };

        const response = await axios(config);

        if (response.status === 200) {
          alert("added");
          setShow2(true);
          setResponseData(response.data);
        }
      } catch (error) {
        console.error(error);
        alert("Not Added");
      }
    }
  };

  console.log("responseData=====", responseData);

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
      const uniqueCategories = sdata.category;
      let filteredVoucherData = res.data?.voucher.find(
        (voch) => voch.category === uniqueCategories
      );
      console.log(filteredVoucherData, "filteredVoucherData");
      setvoucherdata(filteredVoucherData);
    }
  };

  const a = plan.pofferprice - (plan.pofferprice * couponPercentage) / 100;

  console.log("aaaaaaaa", a);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk",
    libraries: ["places"],
  });

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

    if (mapRef.current && mapRef.current.getMap) {
      const map = mapRef.current.getMap();
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(latitude, longitude));
      map.fitBounds(bounds);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          setSelectedLocation(location);

          const geocoder = new window.google.maps.Geocoder();
          const latlng = new window.google.maps.LatLng(latitude, longitude);
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                setSelectedPlaceAddress(results[0].formatted_address);
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });

          if (mapRef.current && mapRef.current.getMap) {
            const map = mapRef.current.getMap();
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(latitude, longitude));
            map.fitBounds(bounds);
          }
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const updateddata = {
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
    customerName: customerName,
    email: email,
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
    amount: DiscountAmount,
    number: "8951592630",
    MUID: "MUID" + Date.now(),
    transactionId: "T" + Date.now(),
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/payment/yogipayment",
        updateddata
      );
      console.log("Response:", res.data.redirectUrl);

      if (res.data.redirectUrl) {
        setpaymentModel(true);
        setUrl(res.data.redirectUrl);
      } else {
        console.log("No redirect URL found in the response.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Header2 />

      <div className="container">
        <div className="row">
          {!show1 && (
            <>
              <div
                className="mb-3 mt-3"
                style={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Service Details
              </div>

              <div className="row">
                <div className="col-md-3">
                  <img
                    src={`https://api.vijayhomesuperadmin.in/service/${sdata?.serviceImg}`}
                    alt="loading...."
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      height: "185px",
                    }}
                  />
                </div>
                <div className="col-md-9 mt-4">
                  <div
                    style={{
                      fontSize: 18,
                      color: "black",
                      fontWeight: "bold",
                      marginTop: 5,
                    }}
                  >
                    {sdata.serviceName}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "black",
                      marginTop: 5,
                    }}
                  >
                    {sdata?.serviceDesc[0]?.text}
                  </div>
                  <div className="d-flex">
                    <div
                      className=""
                      style={{
                        textDecoration: "line-through",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      ₹{plan.pPrice}
                    </div>
                    <div
                      className="mx-2"
                      style={{
                        color: "red",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      ₹{plan.pofferprice}
                    </div>
                  </div>
                  {plan?.pservices ? (
                    <div style={{ color: "black" }}>
                      {plan?.pservices} Services
                    </div>
                  ) : (
                    ""
                  )}
                  <div>{sdata?.serviceHours}</div>
                </div>
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
                            className={`inpt ${
                              isDefaultChecked ? "matching" : ""
                            }`}
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

              <div
                className="mt-3"
                style={{
                  color: "#40A2D8",
                  fontWeight: "900",
                  textAlign: "auto",
                }}
              >
                * Book Over Rs 1500 to use wallet , upto 10% From your wallet
                Account !
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
                style={{
                  color: "darkred",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Payment Summary
              </div>

              <div className="row mt-3">
                <div className="col-md-4">Total Amount</div>
                <div
                  className="col-md-4"
                  style={{ textDecoration: "line-through" }}
                >
                  ₹{plan.pPrice}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">Discount</div>
                <div className="col-md-4">{couponPercentage}%</div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">Saved</div>
                <div className="col-md-4" style={{ color: "#40A2D8" }}>
                  ₹{Math.abs(plan.pofferprice - plan.pPrice)}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">Grand Total</div>
                <div className="col-md-4" style={{ color: "#40A2D8" }}>
                  ₹{a}
                </div>
              </div>

              {!showbutton ? (
                <div className="row mt-5 mb-5">
                  <div
                    onClick={() => setshowbutton(true)}
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
              ) : (
                <div className="row mt-5 mb-5">
                  <div className="col-md-6">
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
                      After Service
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      onClick={handlePayment}
                      className="col-md-8"
                      style={{
                        backgroundColor: "#040458db",
                        padding: "8px",
                        color: "white",
                        fontSize: "14px",
                        textAlign: "center",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Pay Now
                    </div>
                  </div>
                </div>
              )}

              {/* <div className="row mt-5 mb-5">
                <div
              onClick={handlePayment}
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
                  onClick={handlePayment}
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
              </div> */}
            </>
          )}

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
          {show1 && isLoaded && (
            <div
              className="row mt-5 mb-2 p-2"
              style={{ justifyContent: "center" }}
            >
              <i
                onClick={() => {
                  setShow1(false);
                  setShow(true);
                }}
                className="fa-solid fa-x"
                style={{
                  backgroundColor: "darkred",
                  padding: "10px",
                  width: "35px",
                  textAlign: "center",
                  color: "white",
                  fontSize: "15px",
                  borderRadius: "50px",
                  position: "absolute",
                  top: "70px",
                }}
              ></i>
              <div
                className="row col-md-10"
                style={{
                  backgroundColor: "#80808036",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <div className="col-md-8">
                  <div
                    className=""
                    style={{
                      width: "100%",
                      height: "320px",
                      position: "relative",
                    }}
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
                      {selectedLocation && (
                        <Marker
                          position={{
                            lat: selectedLocation.latitude,
                            lng: selectedLocation.longitude,
                          }}
                        />
                      )}
                      <Autocomplete
                        onLoad={(autocomplete) => {
                          autocompleteRef.current = autocomplete;
                        }}
                        options={{
                          fields: ["formatted_address", "geometry", "name"],
                          types: ["geocode"],
                        }}
                        onPlaceChanged={handlePlaceSelect}
                      >
                        <input
                          type="text"
                          placeholder="Search for a location"
                          className="map_input"
                          style={{
                            boxSizing: "border-box",
                            border: "1px solid transparent",
                            width: "240px",
                            height: "32px",
                            padding: "0 12px",
                            borderRadius: "3px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            fontSize: "14px",
                            outline: "none",
                            textOverflow: "ellipsis",
                            position: "absolute",
                            top: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 2,
                            backgroundColor: "orange",
                            width: "350px",
                          }}
                        />
                      </Autocomplete>
                    </GoogleMap>
                  </div>
                  <button
                    onClick={getCurrentLocation}
                    style={{
                      backgroundColor: "orange",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      padding: "8px",
                      fontSize: "14px",
                      width: "50%",
                    }}
                  >
                    Use My Current Location
                  </button>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    {selectedPlaceAddress && (
                      <p>Searched Location: {selectedPlaceAddress}</p>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mt-3">
                    <div
                      className="mb-1"
                      style={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      House/Flat/Block No{" "}
                      <span style={{ color: "red" }}>*</span>
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
                      Landmark / Society name{" "}
                      <span style={{ color: "red" }}>*</span>
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
                    onClick={() => {
                      saveAddress();
                      saveAddress1();
                      setShow1(false);
                      setShow(true);
                    }}
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Success */}

          <Modal show={show2} centered onHide={handleClose2}>
            <Modal.Body>
              <div className="d-flex justify-content-center">
                <video
                  className="p-0"
                  style={{
                    objectFit: "cover",
                    width: "200px",
                    height: "200px",
                  }}
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

          {/* payment getway */}
          <Modal show={paymentModel} centered onHide={handleClose}>
            <Modal.Header>
              <Modal.Title
                style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
              >
                Confirm Payment
                <i
                  onClick={handleClose3}
                  className="fa-solid fa-x"
                  style={{
                    backgroundColor: "darkred",
                    padding: "10px",
                    width: "30px",
                    textAlign: "center",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: "50px",
                    position: "absolute",
                    right: "18px",
                  }}
                ></i>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center", fontSize: "16px" }}>
              <p>
                <i
                  className="fa fa-exclamation-circle"
                  style={{ fontSize: "24px", color: "darkred" }}
                ></i>
              </p>
              <p>Are you sure you want to proceed with the payment?</p>
              <a
                href={Url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                className="mt-3"
              >
                <Button
                  variant="primary"
                  style={{ backgroundColor: "darkred" }}
                >
                  Yes, proceed
                </Button>
              </a>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Summary;
