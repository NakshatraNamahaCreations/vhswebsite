const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [time, setTime] = useState(false);
  const [ModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item
  const [discountperc, setdiscountperc] = useState("");
  const [city, setcity] = useState("");
  const [savecity, setsavecity] = useState("");
  const openDatePickerSingle = () => setShowDatePickerSingle(true);
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [checked, setChecked] = useState("");
  const [address, setaddress] = useState("");
  const [ServiceAddons, setServiceAddons] = useState([]);
  const [voucherdata, setvoucherdata] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotText, setSelectedSlotText] = useState("");
  const [addondata, setaddondata] = useState([]);
  const bottomSheet = useRef();
  const route = useRoute();
  const { plan, sdata } = route.params;
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [user, setuser] = useState("");
  const [value, setuser1] = useState("");
  const MyCartItmes = useSelector((state) => state.cart);
  const [whatsappdata, setwhatsappdata] = useState([]);
  const today = moment();
  const tomorrow = moment().add(1, "days");
  const nextTwoDays = moment().add(2, "days");
  const nextthreeDays = moment().add(3, "days");
  const [servicedata, setservicedata] = useState([]);
  const [date, setDate] = useState(false);
  const [Coupancode, setCoupancode] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [Fulladd, setFulladd] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [Transaction, setTransaction] = useState("");
  const [Data, setData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calenderModel, setcalenderModel] = useState(false);
  const [FullAddress, setFullAddress] = useState();
  const [customerName, setcustomerName] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const getwhatsapptemplate = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/getwhatsapptemplate"
      );
      if (res.status === 200) {
        let getTemplateDatails = res.data?.whatsapptemplate?.filter(
          (item) => item.templatename === "Service Added"
        );
        setwhatsappdata(getTemplateDatails);
      }
    } catch (error) {
      console.error("err", error);
    }
  };

  const addcustomeraddresss = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/addcustomeraddress",
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {
          userId: value?._id,
          address: address,
          saveAs: saveAs,
          landmark: landmark,
          otherData: otherData,
          platNo: platNo,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          closeModal();
          setmapModalVisible(false);
          setModalVisible(true);
        }
      });
    } catch (error) {
      console.error(error);
      alert(
        "Address not added, Please delete one address to update another address "
      );
    }
  };

  const [customeraddress, setcustomerAddressdata] = useState([]);
  useEffect(() => {
    getaddress();
  }, [modalVisible]);

  const getaddress = async () => {
    let res = await axios.get(
      `https://api.vijayhomesuperadmin.in/api/getcustomeraddresswithuserid/${value?._id}`
    );
    if ((res.status = 200)) {
      setcustomerAddressdata(res.data?.customerAddress);
    }
  };

  const handleSelectedAddress = (i) => {
    setFulladd(i);
  };

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Update the initialRegion when selectedLocation changes
      mapRef.current.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.015, // Adjust this value for your desired zoom level
        longitudeDelta: 0.0121, // Adjust this value for your desired zoom level
      });
    }
  }, [selectedLocation]);

  // Calculate the max date as the 10th day of the current month
  const toda = new Date();
  const minDate = new Date(toda.getFullYear(), toda.getMonth());

  const [mLag, setmLag] = useState();
  const [mLong, setmLong] = useState();

  const handleBackButton = () => {
    if (showWebView) {
      // If the modal is open, close it
      setShowWebView(false);
      return true; // Prevent default behavior (exit the app)
    } else {
      // If the modal is not open, navigate to another screen
      navigation.navigate("summary", { plan: plan, sdata: sdata });
      return true;
    }
  };

  useEffect(() => {
    // Subscribe to the hardware back button press event
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => {
      backHandler.remove();
    };
  }, [navigation, showWebView]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("summary", { plan: plan, sdata: sdata });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Address validation
  const [isAddressSelected, setAddressSelected] = useState(false);
  const [isAddressConfirmed, setAddressConfirmed] = useState(false);

  const updateAddress = (test) => {
    setAddressSelected(test);
  };
  const handleAddressSelection = (selectedAddress) => {
    Fulladd.address = selectedAddress;
    updateAddress(true);
  };

  const handleBookNowClick = () => {
    // if (isAddressSelected) {
    bottomSheet.current.show();
    // } else {
    // alert('Please select an address before booking.');
    // }
  };

  const handleConfirmAddress = () => {
    setAddressConfirmed(true);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    closeCalendar();
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
    setcalenderModel(true);
    setDate(true);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
    setcalenderModel(false);
  };

  const handleTabClick = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };

  const isTabActive = (tab) => {
    return selectedDate === tab;
  };

  const dispatch = useDispatch();
  const deleteAllCartItems = () => {
    MyCartItmes.forEach((item) => {
      dispatch(deleteMyCartItem({ id: item.id }));
    });
  };

  const handle = (item) => {
    dispatch(addToCart1(item));
  };
  const handle1 = (item) => {
    dispatch(addToCart1(item));
  };

  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setuser(JSON.parse(userData));
          setuser1(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, []);

  const [suman, setSuman] = useState("");
  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData1 = async () => {
      try {
        const userData = await AsyncStorage.getItem("usedVoucherCodes");
        if (userData) {
          setSuman(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData1();
  }, []);

  const total = MyCartItmes.reduce((accumulator, item) => {
    const subtotal = parseFloat(item.oferprice) * item.qty;
    return accumulator + subtotal;
  }, 0);

  const FreqensaveAmt = MyCartItmes.reduce((accumulator, item) => {
    const subtotal =
      (parseFloat(item.planPrice) - parseFloat(item.oferprice)) * item.qty;

    return accumulator + subtotal;
  }, 0);

  const discAmt =
    (parseFloat(plan.pofferprice) * parseFloat(discountperc)) / 100;

  const savedAmt = parseFloat(plan.pPrice) - parseFloat(plan.pofferprice);

  const GrandTotal = total
    ? discountperc
      ? parseFloat(plan.pofferprice) + parseFloat(total) - discAmt
      : parseFloat(plan.pofferprice) + parseFloat(total)
    : discAmt
    ? plan.pofferprice - discAmt
    : plan.pofferprice;

  // Extract the planName values
  const ka = plan?.pName;

  const planNames = MyCartItmes.map((item) => item.planName);
  // Join them into a single string with commas
  const abc = planNames.join(", ");
  const joinedPlanNames = ka ? `${ka}, ${abc}` : abc;

  useEffect(() => {
    getvoucher();
    getaddon();
    // getservice();
  }, []);

  useEffect(() => {
    // Calculate the discounted total when the component is mounted
    calculateDiscount();
  }, []); // Empty dependency array to run this effect only once

  const calculateDiscount = () => {
    const total = parseFloat(plan.pofferprice); // Convert the price to a number
    const percentage = parseFloat(discountperc) / 100; // Convert the percentage to a decimal

    // Calculate the discount amount
    const discountAmount = total * percentage;

    // Calculate the discounted total
    const finalTotal = total - discountAmount;

    // Update the state with the discounted total
    setDiscountedTotal(finalTotal.toFixed(2)); // Assuming you want to round to 2 decimal places
  };

  const getvoucher = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getvoucher"
    );
    if (res.status === 200) {
      // Extract all unique categories from MyCartItems
      const uniqueCategories = Array.from(
        new Set(MyCartItmes.map((item) => item.service?.category))
      );

      // Filter voucherdata to include only items that match any category from MyCartItems
      const filteredVoucherData = res.data?.voucher.filter(
        (i) => i.category === sdata?.category
      );

      setvoucherdata(filteredVoucherData);
    }
  };

  const [couponDiscount, setCouponDiscount] = useState(GrandTotal);
  const [validationMessage, setValidationMessage] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const applyCouponCode = async () => {
    // Fetch the user's data from AsyncStorage
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);

      if (user.voucherCode === voucherCode) {
        alert("Coupon code already applied");
        return GrandTotal;
      }

      const appliedCoupon = voucherdata.find(
        (item) => item.voucherCode === voucherCode
      );

      if (appliedCoupon) {
        const discountPercentageValue = parseInt(
          appliedCoupon.discountPercentage,
          10
        );
        const discountAmount = (discountPercentageValue / 100) * GrandTotal;
        const getResults = GrandTotal - discountAmount;

        setCouponDiscount(getResults);
        setValidationMessage("");
        setAppliedCoupon(appliedCoupon);

        // Update the user's voucherCode in AsyncStorage to prevent further use
        user.voucherCode = voucherCode;
        await AsyncStorage.setItem("user", JSON.stringify(user));

        return getResults;
      } else {
        setValidationMessage("Invalid coupon");
        setAppliedCoupon(null);
        setCouponDiscount(GrandTotal);
        return GrandTotal;
      }
    } else {
      console.error("User data not found in AsyncStorage");
      alert("User data not found. Please log in or create a user account.");
      return GrandTotal;
    }
  };

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

  const handleSlotClick1 = (index, startTime) => {
    setSelectedSlotIndex(index);
    setSelectedSlotText(`${startTime}`);
  };

  const filteredData = sdata?.store_slots?.filter(
    (item) => item.slotCity === savecity
  );

  const now = new Date();
  const filteredData1 = filteredData.filter((item) => {
    try {
      // Get the current date in ISO format (e.g., "2023-09-28")
      const currentDateISO = now.toISOString().split("T")[0];

      const startTimeString = item.startTime.split("-")[0].trim();
      // Combine the current date with the time from item.startTime
      const dateTimeString = `${currentDateISO}T${item.startTime
        .split("-")[0]
        .trim()}`;

      // Parse the dateTimeString using moment
      const startTime = moment(dateTimeString, "YYYY-MM-DDThh:mmA");

      if (!startTime.isValid()) {
        return false;
      }

      const startTimeDate = startTime.toDate();

      // Calculate the time difference in hours
      const timeDifferenceInHours = (startTimeDate - now) / (1000 * 60 * 60);

      // Check if the start time is at least 3 hours ahead of the current time
      return timeDifferenceInHours >= 3;
    } catch (error) {
      console.error("Error parsing date:", error);
      return false;
    }
  });

  const renderSlots = () => {
    const currentDate = new Date();
    const dateToCompare = new Date(selectedDate);

    let slots; // Declare the variable outside of the conditionals

    if (currentDate == dateToCompare) {
      slots = filteredData || [];
    } else if (currentDate > dateToCompare) {
      slots = filteredData1 || [];
    } else {
      slots = filteredData || [];
    }
    // Sort the slots based on their start times
    slots.sort((a, b) => {
      const startTimeA = moment(a.startTime, "hA");
      const startTimeB = moment(b.startTime, "hA");
      return startTimeA.diff(startTimeB);
    });

    const groupedSlots = [];

    // Group slots into arrays of three
    for (let i = 0; i < slots.length; i += 3) {
      groupedSlots.push(slots.slice(i, i + 3));
    }

    return groupedSlots.map((slotGroup, groupIndex) => (
      <View key={groupIndex} style={{ flexDirection: "row", marginBottom: 10 }}>
        {slotGroup.map((slot, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setModalVisible(true);
              handleSlotClick1(
                groupIndex * 3 + index,
                slot.startTime,
                slot.endTime
              );
            }}
            style={[
              styles.slotBox,
              {
                backgroundColor:
                  selectedSlotIndex === groupIndex * 3 + index
                    ? "darkred"
                    : "lightpink",
                color:
                  selectedSlotIndex === groupIndex * 3 + index
                    ? "white"
                    : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.boxText,
                {
                  color:
                    selectedSlotIndex === groupIndex * 3 + index
                      ? "white"
                      : "black",
                  fontWeight: "bold",
                },
              ]}
            >
              {slot.startTime}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  const handleItemClick = (index, i) => {
    if (selectedItem === index) {
      // If the clicked item is already selected, deselect it
      setSelectedItem(null); // Assuming null or another appropriate value represents deselection
      setdiscountperc(null); // Clear the discount percentage as well if needed
    } else {
      // Otherwise, select the clicked item
      setSelectedItem(index);
      setCoupancode(i?.voucherCode);
      console.log("itemasndasjd", i);
      setdiscountperc(i?.discountPercentage);
    }
  };
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

  const servicePeriod = plan?.servicePeriod;
  const serviceFrequency = plan?.pservices;
  const expiryDate = calculateExpiryDate(selectedDate, servicePeriod);
  const sDate = moment(selectedDate, "YYYY-MM-DD");
  const eDate = moment(expiryDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / serviceFrequency);

  const dividedDates = [];

  const sf = serviceFrequency ? serviceFrequency : "1";
  for (let i = 0; i < sf; i++) {
    const date = sDate.clone().add(interval * i, "days");
    dividedDates.push(date);
  }

  const dividedamtCharges = [GrandTotal];

  const sAmtDate = moment(selectedDate, "YYYY-MM-DD");
  const eamtDate = moment(selectedDate, "YYYY-MM-DD");
  const amtFrequency = 1;
  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, "days"));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);
  // const dividedamtCharge = Math.ceil(remainingAmt / amtFrequency);

  const dividedamtDates = [];
  // const dividedamtCharges = [];

  for (let i = 0; i < amtFrequency; i++) {
    const date = sDate.clone().add(intervalamt * i, "days");
    dividedamtDates.push(date);
  }

  const [paymentMode, setpaymentMode] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const booking = (a) => {
    setpaymentMode(a);
    console.log("a", a);
    addtreatmentdetails(a);
  };

  useEffect(() => {
    getpaymentstatus();
  }, [value]);

  const getpaymentstatus = async () => {
    let res = await axios.get(
      `https://api.vijayhomesuperadmin.in/api/payment/paymentstatus/${value._id}`
    );
    if ((res.status = 200)) {
      setData(
        res.data?.getPaymentStatus.filter((i) => i.code === "PAYMENT_SUCCESS")
      );
      console.log(
        "payment status",
        res.data?.getPaymentStatus.filter((i) => i.code === "PAYMENT_SUCCESS")
      );
      //   navigation.navigate("product");
    }
  };

  const submit = async (e) => {
    if (!Fulladd) {
      alert("Please select the address");
    } else {
      e.preventDefault();
      const requestData = {
        amount: parseFloat(GrandTotal) * 100,
        serviceId: sdata?._id,
      };

      try {
        const config = {
          url: "/payment/addpayment",
          method: "post",
          baseURL: "https://api.vijayhomesuperadmin.in/api",
          headers: { "content-type": "application/json" },
          data: requestData,
        };
        const res = await axios(config);

        if (res.status === 200) {
          const base64ResponseData = res.data.base64;
          const sha256ResponseData = res.data.sha256encode;

          setTransaction(res.data.merchantTransactionId);

          initiatePayment(base64ResponseData, sha256ResponseData);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
          console.log(error.response.data.error);
        }
      }
    }
  };

  const initiatePayment = async (base64Data, sha256Data) => {
    try {
      const data = JSON.stringify({
        request: base64Data,
      });

      const config = {
        method: "post",
        url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": sha256Data,
        },
        data: data,
      };

      const response = await axios.request(config);

      const { redirectInfo } = response.data.data.instrumentResponse;
      setPaymentUrl(redirectInfo.url);
      setShowWebView(true);
      setIsCheckingStatus(true);
    } catch (error) {
      console.error("Error initiating payment:", error);
      setIsCheckingStatus(false);
      // Handle the error accordingly
    }
  };
  useEffect(() => {
    if (isCheckingStatus) {
      const intervalId = setInterval(() => {
        checkTransactionStatus();
      }, 3000); // Set an interval (e.g., every 5 seconds) to repeatedly call checkTransactionStatus

      return () => clearInterval(intervalId);
    }
  }, [isCheckingStatus]);

  const checkTransactionStatus = async () => {
    const merchantId = "M1PX7BZG1R4G";
    try {
      const config = {
        url: `/payment/status/${merchantId}/${Transaction}/${value._id}/${sdata._id}`,
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {},
      };
      const res = await axios(config);

      if (res.status === 200) {
        const responseData = res.data.responseData;
        const code = responseData.code;

        if (code === "PAYMENT_SUCCESS") {
          setIsCheckingStatus(false);
          addtreatmentdetails("online");
          setShowWebView(false);
          // navigation.navigate('success');
        } else {
          // Redirect to home store
          // navigation.navigate('tab');
        }
      }
    } catch (error) {
      console.error("Error checking transaction status:", error);
      // Handle the error accordingly
    }
  };
  const userData = AsyncStorage.getItem("user");


  const addtreatmentdetails = async (a) => {
    try {
      const userData = await AsyncStorage.getItem("user");//  user address
      if (userData) {
        const user = JSON.parse(userData);

        if (user.customerName && user.email) {
          if (!Fulladd) {
            alert("Please select the address  ");
          }
          if (GrandTotal < 700) {
            alert("Grand total should be at least 700");
          } else {
            setModalVisible1(true);
            user.voucherCode = voucherCode;
            const config = {
              url: "https://api.vijayhomesuperadmin.in/api/addservicedetails",
              method: "post",

              headers: { "content-type": "application/json" },
              data: {
                customerData: user,
                customerName: customerName,
                email: email,
                dividedDates: dividedDates ? dividedDates : selectedDate,
                dividedamtCharges: dividedamtCharges,
                dividedamtDates: dividedamtDates,
                cardNo: user?.cardNo,
                category: sdata?.category,
                contractType: !plan?.pservices ? "One Time" : "AMC",
                service: sdata?.serviceName,
                serviceID: sdata?._id,
                serviceCharge: GrandTotal,
                dateofService: selectedDate,
                selectedSlotText: selectedSlotText,
                serviceFrequency: plan?.pservices,
                startDate: selectedDate,
                planName: plan?.pName,
                expiryDate: expiryDate,
                firstserviceDate: selectedDate,
                date: moment().format("YYYY-MM-DD"),
                time: moment().format("LT"),
                type: "userapp",
                desc: joinedPlanNames,
                city: savecity,
                userId: user?._id,
                deliveryAddress: Fulladd,
                serviceImg: sdata?.serviceImg,
                AddOns: MyCartItmes,
                discAmt: discAmt,
                // GrandTotal: GrandTotal,
                GrandTotal: couponDiscount,
                paymentMode: a,
                TotalAmt: total
                  ? parseFloat(plan.pPrice) + parseFloat(total)
                  : plan.pPrice,
                couponCode: Coupancode,
                totalSaved: discAmt
                  ? savedAmt + FreqensaveAmt + discAmt
                  : savedAmt + FreqensaveAmt,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                const selectedResponse = whatsappdata[0];
                deleteAllCartItems();
                dispatch(clearCart());
                setModalVisible1(false);
                advp(response.data.data);
                makeApiCall(selectedResponse, user.mainContact);
                AsyncStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
              }
            });
          }
        } else if (customerName && email) {
          if (!Fulladd) {
            alert("Please select the address  ");
          }
          if (GrandTotal < 1500) {
            alert("Grand total should be at least 700");
          }
          else {
            setModalVisible1(true);
            const config = {
              url: "https://api.vijayhomesuperadmin.in/api/addservicedetails",
              method: "post",

              headers: { "content-type": "application/json" },
              data: {
                customerData: {
                  _id: user._id,
                  cardNo: user?.cardNo,
                  customerName: customerName,
                  email: email,
                  mainContact: user?.mainContact,
                  type: user?.type,
                  city: savecity,
                },
                customerName: customerName,
                email: email,
                dividedDates: dividedDates ? dividedDates : selectedDate,
                dividedamtCharges: dividedamtCharges,
                dividedamtDates: dividedamtDates,
                cardNo: user?.cardNo,
                category: sdata?.category,
                contractType: !plan?.pservices ? "One Time" : "AMC",
                service: sdata?.serviceName,
                serviceID: sdata?._id,
                serviceCharge: GrandTotal,
                dateofService: selectedDate,
                selectedSlotText: selectedSlotText,
                serviceFrequency: plan?.pservices,
                startDate: selectedDate,
                planName: plan?.pName,
                expiryDate: expiryDate,
                firstserviceDate: selectedDate,
                date: moment().format("YYYY-MM-DD"),
                time: moment().format("LT"),
                type: "userapp",
                desc: joinedPlanNames,
                city: savecity,
                userId: user?._id,
                deliveryAddress: Fulladd,
                serviceImg: sdata?.serviceImg,
                AddOns: MyCartItmes,
                discAmt: discAmt,
                // GrandTotal: GrandTotal,
                GrandTotal: couponDiscount,
                paymentMode: a,
                TotalAmt: total
                  ? parseFloat(plan.pPrice) + parseFloat(total)
                  : plan.pPrice,
                couponCode: Coupancode,
                totalSaved: discAmt
                  ? savedAmt + FreqensaveAmt + discAmt
                  : savedAmt + FreqensaveAmt,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                const selectedResponse = whatsappdata[0];
                deleteAllCartItems();
                dispatch(clearCart());
                setModalVisible1(false);
                advp(response.data.data);
                makeApiCall(selectedResponse, user.mainContact);
                AsyncStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
              }
            });
          }
        } else {
          alert("Please provide customer name and email  ");
          setModalVisible1(false);
        }
      } else {
        alert("User data not found. Please log in or create a user account.");
        setModalVisible1(false);
      }
    } catch (error) {
      console.error(error);
      setModalVisible1(false);
      alert(" Not Added");
    }
  };

  const advp = (a) => {
    if (a.paymentMode === "Online") {
      addPayment(a);
    } else {
      setModalVisible1(false);
      navigation.navigate("success", { data: a });
    }
  };

  const addPayment = async (a) => {
    try {
      const config = {
        url: "/addPayment",
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {
          paymentDate: selectedDate,
          paymentType: "Customer",
          paymentMode: "online",
          amount: GrandTotal,
          Comment: "user appp",
          serviceDate: selectedDate,
          serviceId: a?._id,
          customerId: user._id,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // alert("Payment Added");
          // // window.location.reload("");
          setModalVisible1(false);
          navigation.navigate("success", { data: a });
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  ///map setup
  const [mapModalVisible, setmapModalVisible] = useState(false);

  const mapModal = () => {
    setmapModalVisible(true);
    setModalVisible(false);
  };

  const [storagedata, setStoragedata] = useState([]);
  const [platNo, setPlatNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [otherData, setotherData] = useState("");

  const [saveAs, setsaveAs] = useState("");

  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isOthersClicked, setIsOthersClicked] = useState(false);

  const handleHomePress = () => {
    setIsHomeClicked(true);
    setIsOthersClicked(false); // Reset other button's state
    setsaveAs("Home");
  };

  const handleOthersPress = () => {
    setIsHomeClicked(false); // Reset home button's state
    setIsOthersClicked(true);
    setsaveAs("other");
  };

  const homeButtonStyle = {
    borderColor: isHomeClicked ? "orange" : "black",
    borderWidth: 1,
    padding: 6,
    marginRight: 10,
    borderRadius: 5,
    width: 70,
    textAlign: "center",
    backgroundColor: "white",
  };

  const othersButtonStyle = {
    borderColor: isOthersClicked ? "orange" : "black",
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    width: 70,
  };

  useEffect(() => {
    AsyncStorage.getItem("locationData").then((value) => {
      setStoragedata(value);
    });
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the LOCATION");
      } else {
        console.log("LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const searchLocation = async (query) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk`
      );

      if (response.data && response.data.results.length > 0) {
        const result = response.data.results[0];
        const { geometry, formatted_address } = result;

        const lat = geometry.location.lat;
        const lng = geometry.location.lng;

        setSelectedLocation({ latitude: lat, longitude: lng });
        setMarkerCoordinate({ latitude: lat, longitude: lng });

        setaddress(formatted_address);

        // Open the modal after searching for a location
        setIsModalVisible(true);
      } else {
        setaddress("Location not found.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const saveData = async () => {
    try {
      if (!platNo) {
        alert("House/Flat/Block No is required");
        return;
      }

      if (!landmark) {
        alert("Landmark/Society name is required");
        return;
      }

      const data = {
        platNo,
        landmark,
        address,
        otherData,
        saveAs,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("locationData", jsonData);
      closeModal();
      setmapModalVisible(false);

      console.log("Data saved successfully:", jsonData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("savecity").then((value) => {
      setsavecity(value);
    });

    AsyncStorage.getItem("locationData").then((value) => {
      if (value !== null) {
        try {
          const saveAddressData = JSON.parse(value);
          setFulladd(saveAddressData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    });
  }, [mapModalVisible]);

  const getLocation = () => {
    setModalVisible1(true);
    Geolocation.getCurrentPosition(
      (position) => {
        setmLag(position.coords.latitude);
        setmLong(position.coords.longitude);

        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(lat, long);
        setSelectedLocation({ latitude: lat, longitude: long });
        getGeocodeFromCoordinates(lat, long);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        (error) => {
          console.log("Error getting location:", error.message);
        };
        setModalVisible1(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getGeocodeFromCoordinates = async (lat, long) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk`
      );

      if (response.data && response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;

        const formattedAddress = response.data.results[0].formatted_address;
        setaddress(formattedAddress);
        setModalVisible1(false);
      } else {
        setModalVisible1(false);
        setaddress("No address found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
      setModalVisible1(false);
      throw error;
    }
  };
  const handleMarkerMove = async (latitude, longitude) => {
    // Reverse geocode the new coordinates to get the address
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk`
      );

      if (response.data && response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        setaddress(formattedAddress);
      } else {
        setaddress("Location not found.");
      }
    } catch (error) {
      console.error("Error reverse geocoding location:", error);
    }
  };

  const handleemail = (text) => {
    setemail(text);
  };
  const handlecustomer = (text) => {
    setcustomerName(text);
  };

  const makeApiCall = async (selectedResponse, contactNumber) => {
    console.log("hello");
    const apiURL =
      "https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message";
    const accessToken = "c7475f11-97cb-4d52-9500-f458c1a377f4";

    const contentTemplate = selectedResponse?.template || "";

    if (!contentTemplate) {
      console.error("Content template is empty. Cannot proceed.");
      return;
    }

    const content = contentTemplate.replace(
      /\{Customer_name\}/g,
      customerName ? customerName : user.customerName
    );
    const serviceName = content.replace(
      /\{Service_name\}/g,
      sdata?.serviceName
    );
    const slotTiming = serviceName.replace(
      /\{Slot_timing\}/g,
      selectedSlotText
    );
    const serivePrice = slotTiming.replace(
      /\{Service_amount\}/g,
      couponDiscount
    );
    const serviceDate = serivePrice.replace(/\{Service_date\}/g, selectedDate);
    // const serviceVideoLink = serviceDate.replace(
    //   /\{Video_link\}/g,
    //   selectedVideoLink
    // );

    // // Replace <p> with line breaks and remove HTML tags
    const convertedText = serviceDate
      .replace(/<p>/g, "\n")
      .replace(/<\/p>/g, "")
      .replace(/<br>/g, "\n")
      .replace(/&nbsp;/g, "")
      .replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>")
      .replace(/<[^>]*>/g, "");

    const requestData = [
      {
        dst: "91" + contactNumber,
        messageType: "0",
        textMessage: {
          content: convertedText,
        },
      },
    ];
    try {
      const response = await axios.post(apiURL, requestData, {
        headers: {
          "access-token": accessToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setWhatsappTemplate(response.data);
        alert("Sent");
      } else {
        console.error("API call unsuccessful. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showWebView ? (
        <WebView source={{ uri: paymentUrl }} style={{ flex: 1 }} />
      ) : (
        <View style={{ flex: 1 }}>
          {time == true ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "white",
              }}
            >
              <Bubbles size={6} color="blue" style={{ textAlign: "center" }} />
            </View>
          ) : (
            <View style={styles.container}>
              <ScrollView style={{ marginBottom: 30 }}>
                <View style={{ margin: 15 }}>
                  <Text
                    style={{
                      color: "black",
                      // backgroundColor: '#41f4ee',
                      // width: 150,
                      // borderTopRightRadius: 80,
                      // padding: 3,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Service Details
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.3, marginTop: 20 }}>
                      <Image
                        source={{
                          uri: `https://api.vijayhomesuperadmin.in/service/${sdata?.serviceImg}`,
                        }}
                        style={{ width: 80, height: 80 }}
                      />

                      <View style={styles.hrtag} />
                    </View>
                    <View
                      style={{
                        flex: 0.7,
                        // margin: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "black",
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        {sdata.serviceName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "black",
                          marginTop: 5,
                        }}
                      >
                        {sdata?.serviceDesc[0]?.text}
                      </Text>

                      <View style={{ flexDirection: "row", marginTop: 1 }}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>
                          {" "}
                        </Text>
                        <Text style={styles.originalPrice}>₹{plan.pPrice}</Text>
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            color: "#e41b17",
                            fontSize: 16,
                            marginLeft: 5,
                          }}
                        >
                          {" "}
                          ₹{plan.pofferprice}
                        </Text>
                      </View>
                      {plan?.pservices ? (
                        <Text style={{ marginLeft: 10, color: "black" }}>
                          {plan?.pservices} Services
                        </Text>
                      ) : (