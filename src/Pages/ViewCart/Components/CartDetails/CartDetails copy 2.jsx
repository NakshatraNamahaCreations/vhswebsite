import React, { useEffect, useState } from "react";
import "./cartdetails.scss";
import Add from "./../../../../Assets/Images/add.svg";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../../ServicesView/Components/AddOn/addon.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "../CartDetails/cartdetails.scss";
import "../PersonalInfo/personalinfo.scss";
import "../CartDetails/cartitem.scss";
import "../ScheduleService/scheduleservice.scss";
import "../Payment/payment.scss";
import "../Summary/summary.scss";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-bootstrap";
import RightArrow from "../../../../Assets/Images/rightarrow.svg";
import "../../../BookingDetail/Components/DetailsHeader/detailsheader.scss";
import { Button } from "react-bootstrap";
import PercentIcon from "@mui/icons-material/Percent";
export default function CartDetails() {
  const location = useLocation();
  const storedUserDataJSON = sessionStorage.getItem("userdata");

  let userData = null;
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  // const { ServiceIDD, NumberOfQunt, NumberOfQunt } = location.state || {};
  const { ServiceIDD, NumberOfQunt, PriceID } = location.state || {};
  console.log(ServiceIDD, "ServiceIDD");
  console.log(NumberOfQunt, "NumberOfQunt");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [Service, setService] = useState([]);
  // const navigate = useNavigate();

  // const [pay, setPay] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [viewOrder, setViewOrder] = useState(false);
  const [viewAddress, setviewAddress] = useState(false);
  const [AddAddress, setAddAddress] = useState(false);
  const [Voucher, setVoucher] = useState([]);
  const [coupancode, setCoupanCode] = useState(null);
  const [Discount, setDiscount] = useState(null);
  const [fourDates, setFourDates] = useState([]);

  const [datepicker, setdatePicker] = useState(false);

  const [addOption, setAddOption] = useState(false);
  const [AddOn, setAddOn] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotsID, setselectedSlotsID] = useState(null);

  const [CustomerAddress, setCustomerAddress] = useState("");
  const [CustomerStreet, setCustomerStreet] = useState("");
  const [CustomerLandMark, setCustomerLandMark] = useState("");
  const [CustomerState, setCustomerState] = useState("");
  const [CustomerCity, setCustomerCity] = useState("");
  const [CustomerZipCode, setCustomerZipCode] = useState("");

  const [Quantity, setQuantity] = useState(NumberOfQunt);

  const [selectedpaymentOption, setselectedpaymentOption] = useState(null);

  const [DelivaryAddress, setDelivaryAddress] = useState(null);
  const [SelectedAddress, setSelectedAddress] = useState(null);
  const [allBookedServices, setallBookedServices] = useState(null);

  useEffect(() => {
    getAllServices();
    getVoucher();
    getAddons();
    getDeliveryAddres();
    getServiceDetails();
  }, []);
  const handleAddAddres = () => {
    setAddAddress(true);
  };

  const handleAddOption = () => {
    setAddOption(!addOption);
  };
  // const gotoBooking = () => {
  //   navigate("/booking");
  // };

  const currentDate1 = new Date(Date.now());

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = currentDate1.toLocaleDateString("en-US", options);

  const result = ` ${formattedDate} `;
  const time = currentDate1.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getservices"
      );
      if (res.status === 200) {
        setService(res.data.service);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  const handleAddon = (addon) => {
    setSelectedAddons((prevAddons) =>
      prevAddons.concat(Array.isArray(addon) ? addon : [addon])
    );
  };

  useEffect(() => {
    const filteredService = Service.filter((service) => {
      return service?._id === ServiceIDD;
    });

    setCartData(filteredService);
  }, [ServiceIDD, Service]);

  const getVoucher = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getvoucher`
      );
      if (res.status === 200) {
        setVoucher(res.data.voucher);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let services = Service?.filter((ele, index) => {
    return ele?._id === ServiceIDD;
  });

  let k = Voucher.filter((ele) =>
    ele?.category
      ?.toLowerCase()
      ?.includes(services?.map((ele) => ele?.category?.toLowerCase()))
  );

  const getColorForNthChild = (index) => {
    const colors = [
      "rgb(51, 165, 127)",
      "rgb(53, 165, 51)",
      "rgb(166, 106, 21)",
    ];

    return colors[index % colors?.length];
  };

  const handlegetcoupan = (e, clickedId, desc) => {
    e.preventDefault();
    setCoupanCode(clickedId);
    setDiscount(desc);
  };
  let AddOnPrice = 0;
  let CountAddon = 0;
  let addOnPrice = selectedAddons?.map((addon) => {
    CountAddon++;
    return Number(addon?.addOnsOfferPrice);
  });

  let getaddonsSum = addOnPrice?.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue,
    AddOnPrice
  );
  let FreqensaveAmt = 0;
  const calculateSubtotal = (cartData, cartItems) => {
    let subtotal = 0;
    let frequentAmount = 0;
    let totalPrice = 0;
    cartData?.forEach((ele) => {
      ele?.morepriceData
        .filter((item) => item?._id === PriceID)
        ?.forEach((filteredElement) => {
          const price = parseFloat(filteredElement?.pofferprice) || 0;
          const RealPrice = parseFloat(filteredElement?.pPrice) || 0;
          FreqensaveAmt =
            parseInt(RealPrice) * Number(Quantity) -
            parseInt(price) * Number(Quantity);
          subtotal += parseInt(price) * Number(Quantity);
          frequentAmount += FreqensaveAmt;
          totalPrice += RealPrice * Number(Quantity);
        });
    });

    return { subtotal, frequentAmount, totalPrice };
  };
  const { subtotal, frequentAmount, totalPrice } = calculateSubtotal(
    cartData,
    ServiceIDD
  );

  const discountAmount = (Number(subtotal) * Number(Discount)) / 100;
  const grandTotal =
    Number(subtotal) - Number(discountAmount) + Number(getaddonsSum);

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

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const tileDisabled = ({ date }) => {
    const isPastDate = date <= yesterday;
    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isPastDate || isNextFourDate;
  };
  const tileClassName = ({ date }) => {
    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isNextFourDate ? "selecteddate" : "";
  };

  const DatePicker = (e) => {
    e.preventDefault();
    setdatePicker(true);
  };

  // const cityname = selectecity?.toLowerCase();

  // const filteredServices = services?.filter((ele) =>
  //   ele?.store_slots?.some((slot) =>
  //     slot?.slotCity?.toLowerCase()?.includes(cityname)
  //   )
  // );
  const getAddons = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getServiceAddOns`
      );
      if (res.status === 200) {
        setAddOn(res?.data?.AddOns);
        // .filter((i) => i.addOnsCategory === selectedCategory)
      }
    } catch (err) {
      console.log(err);
    }
  };

  let cate = services?.map((ele) => ele?.serviceName?.toLowerCase());
  const filteredAddons = AddOn?.filter((addon) => {
    const addonCategory = addon?.addOnsCategory?.toLowerCase();
    return addonCategory?.includes(cate);
  });

  const handleCheckboxSelect = (day) => {
    const formattedDate = `${day.year}-${day.month}-${day.day}`;
    const selectedDate = moment(formattedDate, "YYYY-MM-DD");

    setSelectedDate(selectedDate.format("LL"));
  };

  const handleCalendarSelect = (date) => {
    const selectedDate = moment.isMoment(date) ? date.toDate() : date;
    setSelectedDate(selectedDate);
    setdatePicker(false);
  };

  const handleSlotSelect = (starttime, endtime) => {
    setselectedSlotsID([{ startTime: starttime, endTime: endtime }]);
  };

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
    if (!selectedDate) return false; // If selectedDate is null or undefined, return false

    const { day: dayNumber, month, year } = day;
    const monthName = monthsMap[month];

    if (!monthName) {
      console.error("Invalid month number:", month);
      return false;
    }

    const formattedDay = moment(
      `${monthName} ${dayNumber}, ${year}`,
      "MMMM D, YYYY"
    ).format("LL");

    return formattedDay === selectedDate;
  };

  const serviceidd = services?.flatMap((ele) => ele);

  const selectedSlotTextget = selectedSlotsID
    ?.map((slot) => `${slot?.startTime} - ${slot?.endTime}`)
    ?.join(", ");

  const handleOptionClick = (selectedId) => {
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");

    if (selectedId === "option1") {
      option1.checked = true;
      option2.checked = false;

      setselectedpaymentOption("Pay Online");
    } else if (selectedId === "option2") {
      option1.checked = false;
      option2.checked = true;

      setselectedpaymentOption("Cash on Delivery");
    }
  };

  const isSurvey = services?.some((ele) =>
    ele?.serviceDirection?.includes("Survey")
  );
  let isEnquiry = services?.some((ele) =>
    ele?.serviceDirection?.includes("Enquiry")
  );

  let ServicePans = cartData?.map((item) =>
    item.morepriceData
      .filter((item) => item?._id === PriceID)
      ?.map((ele) => ele)
  );
  const firstFilteredElement = ServicePans?.[0]?.[0];

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

  const servicePeriod = firstFilteredElement?.servicePeriod;

  const dividedamtCharges = [firstFilteredElement?.pofferprice];
  const pofferprice = firstFilteredElement?.pofferprice;

  const expiryDate = calculateExpiryDate(selectedDate, servicePeriod);
  const sDate = moment(selectedDate, "YYYY-MM-DD");
  const eDate = moment(expiryDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / dividedamtCharges);

  const dividedDates = [];
  const dividedamtDates = [new Date(selectedDate)];

  const sf = dividedamtCharges ? dividedamtCharges : "1";
  for (let i = 0; i < sf; i++) {
    const date = sDate.clone().add(interval * i, "days");
    dividedDates.push(date);
  }

  let addOnsCategory = selectedAddons.map((Ele) => Ele.addOnsCategory);

  const joinedPlanNames = addOnsCategory
    .concat(serviceidd?.[0]?.serviceName)
    .join(",");
  const generateBookingId = (length) => {
    let bookingId = "";
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      bookingId += randomDigit;
    }
    return bookingId;
  };
  const getServiceDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/getservicedetails`
      );
      if (response.status === 200) {
        let filtredServices = response.data.servicedetails.filter(
          (itme) => itme.serviceID !== ServiceIDD
        );
        console.log(filtredServices, "filtredServices");
        setallBookedServices(filtredServices);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeliveryAddress = async (eleId) => {
    const selectedAddress = DelivaryAddress.find((item) => item._id === eleId);
    setSelectedAddress(selectedAddress);
  };

  const handleBookservices1 = () => {
    setviewAddress(false);
    handleBookservices();
  };

  const handleBookservices = async () => {
    // e.preventDefault();

    try {
      if (userData === null || userData === undefined) {
        alert("Please Login ");
      } else if (SelectedAddress === null || SelectedAddress === undefined) {
        alert("Please Select Address");
        setviewAddress(true);
      } else {
        const generatedBookingId = generateBookingId(8);

        const config = {
          url: `/addservicedetails`,
          baseURL: "https://api.vijayhomesuperadmin.in/api",
          headers: { "content-type": "application/json" },
          method: "post",
          data: {
            customer: userData,
            customerData: userData,
            dividedDates: dividedDates ? dividedDates : selectedDate,
            dividedamtCharges: dividedamtCharges,
            dividedamtDates: dividedamtDates,
            cardNo: userData?.cardNo,
            category: serviceidd?.[0]?.category,
            contractType: !pofferprice ? "One Time" : "AMC",
            service: serviceidd?.[0].serviceName,
            serviceCharge: firstFilteredElement?.pofferprice,
            dateofService: selectedDate,
            selectedSlotText: selectedSlotTextget,
            serviceFrequency: firstFilteredElement?.pservices,
            startDate: selectedDate,
            expiryDate: expiryDate,
            firstserviceDate: selectedDate,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("LT"),
            type: "Website",
            desc: joinedPlanNames,
            // city: selectecity,
            userId: userData?._id,
            deliveryAddress: JSON.stringify(SelectedAddress),
            serviceImg: serviceidd?.serviceImg,
            AddOns: selectedAddons,
            discAmt: discountAmount,
            GrandTotal: grandTotal,
            paymentMode: selectedpaymentOption,
            TotalAmt: grandTotal
              ? parseFloat(firstFilteredElement?.pPrice) +
                parseFloat(grandTotal)
              : firstFilteredElement?.pPrice,
            couponCode: coupancode,
            totalSaved: discountAmount
              ? frequentAmount + discountAmount
              : frequentAmount,
            bookingId: generatedBookingId,
            serviceID: ServiceIDD,
            planid: PriceID,
            qunty: Number(CountAddon) + Number(Quantity),
            subtotal: subtotal,
            ServiceStatus: "Pending",
          },
        };

        await axios(config).then(function (response) {
          if (response.status === 200) {
            setSelectedAddress(null);
            setViewOrder(true);
          }
        });
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const DeliveryAddres = async (e) => {
    e.preventDefault();

    try {
      let deliveryAddress = {
        address: CustomerAddress,
        streetName: CustomerStreet,
        landmark: CustomerLandMark,
        state: CustomerState,
        city: CustomerCity,
        zipcode: CustomerZipCode,
        userId: userData._id,
      };
      const config = {
        url: `/addcustomerAddress`,
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        method: "post",
        data: deliveryAddress,
      };

      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Address Added Succesfully");
          setAddAddress(false);
          setCustomerAddress("");
          setCustomerStreet("");
          setCustomerLandMark("");
          setCustomerState("");
          setCustomerCity("");
          setCustomerZipCode("");
        }
      });
    } catch (error) {
      console.error("error", error);
      alert(error);
    }
  };

  const getDeliveryAddres = async () => {
    try {
      const response = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/getalladress"
      );
      if (response.status === 200) {
        let Address = response?.data?.data
          ?.filter((ele) => ele?.userId === userData?._id)
          .map((ele) => ele);

        setDelivaryAddress(Address);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="cart_details">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {cartData?.map((ele) => (
                <div className="cart_item_box">
                  <div className="item_title fnt">{ele?.serviceName}</div>
                  <div className="item_content">
                    <div className="left">
                      <div className="left_img">
                        <img
                          src={`https://api.vijayhomesuperadmin.in/service/${ele?.serviceImg}`}
                          alt=""
                        />
                      </div>

                      <div className="texts fnt">
                        {ele.morepriceData
                          .filter((item) => item?._id === PriceID)
                          .map((filteredElement) => (
                            <div key={filteredElement?._id}>
                              {filteredElement?.pName}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-3">
                      {ele.morepriceData
                        .filter((item) => item?._id === PriceID)

                        .map((filteredElement) => (
                          <div className="row   ">
                            <span className="col-md-6 m-auto fnt clrstr">
                              Rs.
                              {filteredElement?.pofferprice}
                            </span>
                          </div>
                        ))}
                    </div>

                    <Button variant="secondary" className="col-md-3  p-0">
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
                  </div>
                  <div className=" row mt-3">
                    <p className="col-md-2"></p>
                    <p className="col-md-1">
                      <input type="radio" />
                    </p>{" "}
                    <p className="col-md-8 ">
                      avoid calling before reach the location
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 ">
              <div className="promo mt-5 border">
                <div className="row">
                  <div className="col-md-2 m-auto">
                    <span className="pec p-2">
                      <PercentIcon />
                    </span>
                  </div>
                  <div className="col-md-10 m-auto">
                    {" "}
                    Coupons and login Login/Sign up to view offers
                  </div>
                </div>
              </div>
              <div className="summary border">
                <div className="title">Payment Summary</div>
                <div className="summary_points">
                  <div className="key">Number Of Service</div>
                  <div className="value">{Quantity}</div>
                </div>
                <div className="summary_points">
                  <div className="key">Sub total</div>
                  <div className="value">Rs. {subtotal}</div>
                </div>
                <div className="summary_points">
                  <div className="key">Taxes and free </div>
                  <div className="value">Rs. 50</div>
                </div>
                <div className="summary_points total">
                  <div className="key">Total Amount</div>
                  <div className="value">Rs. 4574</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
