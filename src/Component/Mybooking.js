// import React, { useState, useEffect } from "react";
// import Header2 from "./Header2";
// import axios from "axios";
// import Footer from "./Footer";

// function MyBooking() {
//   const [bookingsData, setBookingsData] = useState([]);
//   const userDataString = localStorage.getItem("user");
//   const userData = JSON.parse(userDataString);

//   useEffect(() => {
//     if (userData) {
//       getBookingsData();
//     }
//   }, [userData]);

//   const getBookingsData = async () => {
//     try {
//       const res = await axios.get(
//         `https://api.vijayhomeservicebengaluru.in/api/mybookusingID/${userData?._id}`
//       );
//       if (res.status === 200) {
//         setBookingsData(res.data.bookings);
//       }
//     } catch (err) {
//       console.error("Error fetching bookings data:", err);
//     }
//   };

//   console.log("bookingsData", bookingsData);

//   return (
//     <div className="">
//       <Header2 />
//       <div className="container">
//         <div className="row justify-content-center mb-5">
//           {bookingsData.map((data, index) => (
//             <div className="row justify-content-center ">
//               <div
//                 className="col-md-6 mt-3"
//                 style={{
//                   border: "1px solid grey",
//                   padding: "10px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <div
//                   className="mb-2"
//                   style={{
//                     color: "darkred",
//                     fontSize: "16px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {data.service}
//                 </div>
//                 <div
//                   className=""
//                   style={{
//                     fontSize: "13px",
//                     color: "black",
//                   }}
//                 >
//                   {data.desc}
//                 </div>
//                 <div
//                   className="mt-1"
//                   style={{ fontSize: "11px", color: "grey" }}
//                 >
//                   {data.startDate} <span>{data.time}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default MyBooking;

// upcoming

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Allorder() {
//   const [allorder, setAllorder] = useState([]);
//   const [value, setValue] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = localStorage.getItem("user");
//         if (userData) {
//           setValue(JSON.parse(userData));
//           console.log(userData);
//         }
//       } catch (error) {
//         console.error("Error fetching user data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [value]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.vijayhomeservicebengaluru.in/api/mybookingdata/${value?._id}`
//       );

//       if (response.status === 200) {
//         setAllorder(response.data?.runningdata);
//         setLoading(false);
//       } else {
//         alert("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const refreshInterval = setInterval(() => {
//       fetchData();
//     }, 1000);

//     return () => {
//       clearInterval(refreshInterval);
//     };
//   }, [value]);

//   const cdata = allorder.filter((i) => i.dsrdata[0]?.endJobTime === undefined);

//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {

//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 5000);

//     // Clear the timer when the component unmounts
//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   return (
//     <div className="container">
//       {isLoading ? (
//         <div className="loader"></div>
//       ) : (
//         <div className="content">
//           {cdata?.length > 0 ? (
//             <div className="order-list">
//               {cdata.map((item) => (
//                 <div
//                   key={item.id}
//                   className="order-item"
//                   onClick={() => {
//                     navigate("/upcomingdetail", { state: { allorder: item } });
//                   }}
//                 >
//                   <h3 className="service-name">{item.service}</h3>
//                   <div className="category">
//                     <i className="fa fa-category"></i>
//                     <span>{item.category}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="no-data">
//               <p>No data! Please book a service</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Allorder;

// completed

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";

// function Completed() {
//   const [allorder, setAllorder] = useState([]);
//   const [value, setValue] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [refresh, setRefresh] = useState(true);

//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const userData = localStorage.getItem("user");
//         if (userData) {
//           setValue(JSON.parse(userData));
//         }
//       } catch (error) {
//         console.error("Error fetching user data: ", error);
//       }
//     };

//     fetchData1();

//     const interval = setInterval(() => {
//       fetchData1();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.vijayhomeservicebengaluru.in/api/mybookingdata/${value?._id}`
//       );

//       if (response.status === 200) {
//         setAllorder(response.data?.runningdata);
//         setLoading(false);
//       } else {
//         alert("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setLoading(false);
//     }
//   };

//   const cdata = allorder.filter((item) => item?.dsrdata[0]?.endJobTime);

//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     fetchData();
//   }, [value]);

//   useEffect(() => {
//     // Simulate loading for 3 seconds
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     // Clear the timer when the component unmounts
//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   return (
//     <div className="container">
//       {isLoading ? (
//         <div className="">Completed Page</div>
//       ) : (
//         <div className="content">
//           {!cdata.length > 0 ? (
//             <div className="no-data">
//               {/* <video
//                 src={require("../assets/nodata.mp4")}
//                 className="no-data-video"
//                 muted={false}
//                 loop
//                 autoPlay
//               /> */}
//               <p className="no-data-text">
//                 Please Book Any Services and Come Back Later!
//               </p>
//             </div>
//           ) : (
//             <div className="order-list">
//               {cdata.map((item) => (
//                 <div
//                   key={item.id}
//                   className="order-item"
//                   onClick={() => {
//                     navigate("/completedetail", { state: { allorder: item } });
//                   }}
//                 >
//                   <div className="order-item-content">
//                     <div className="order-info">
//                       <h3 className="service-name">{item.service}</h3>
//                       <div className="price-date">
//                         <span className="price">₹ {item.serviceCharge}</span>
//                         <span className="date">{item.startDate}</span>
//                       </div>
//                       <div className="completed-status">Completed</div>
//                       <div className="category">
//                         <i className="fa fa-category"></i>
//                         <span>{item.category}</span>
//                       </div>
//                     </div>
//                     <div className="order-status">
//                       <i className="fa fa-check-circle"></i>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Completed;

// Cancell Enquiry

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

function Completed() {
  const [enquiry, setEnquiry] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userValue = localStorage.getItem("user");
        if (userValue) {
          setValue(JSON.parse(userValue));
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (value) {
      getEnquiry();
    }
  }, [value]);

  const getEnquiry = async () => {
    try {
      const res = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/findwithuseridinenquiryfollowup/${value?._id}`
      );
      if (res.status === 200) {
        setEnquiry(res.data?.enquiryfollowup);
      }
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        // <Loader />
        <div className="">My Bookings Page</div>
      ) : (
        <div className="content">
          {enquiry.length === 0 ? (
            <div className="no-data">
              {/* <video
                src={require("../assets/nodata.mp4")}
                className="no-data-video"
                muted={false}
                loop
                autoPlay
              /> */}
              <p className="no-data-text">No data found!</p>
            </div>
          ) : (
            <div className="enquiry-list">
              {enquiry.map((item) => (
                <div
                  key={item.id}
                  className="enquiry-item"
                  onClick={() =>
                    navigate("/Enquirydetails", {
                      state: { enquirydata: item },
                    })
                  }
                >
                  <p className="category">{item.category}</p>
                  {item.appoDate && (
                    <div className="date-time">
                      <span className="time">{item.appoTime}</span>
                      <span className="date">{item.appoDate}</span>
                    </div>
                  )}
                  <p className="description">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Completed;
