import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [mainContact, setMainContact] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handlenumber = (e) => {
    setMainContact(e.target.value);
  };

  const sendOTP = async () => {
    setTimer(60);
    setError("");
    setSuccess("");
    const isValidMobile = /^\d{10}$/.test(mainContact);

    if (!isValidMobile) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/sendotp",
        { mainContact }
      );

      setStatus(true);
      setSuccess("OTP sent successfully.");
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "An error occurred. Please try again later."
      );
    }
  };

  const OTPVerification = async () => {
    setError("");
    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/verifyotp",
        { otp, mainContact }
      );

      if (response.data.success) {
        setStatus(false);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/cartbook");
      } else {
        setError(response.data.error || "Unknown error occurred");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    // <div className="row">
    //   <div className="col-md-12">
    //     {!status ? (
    //       <div className="row justify-content-center align-items-center">
    //         <div className="col-md-5 mt-4 border p-3 rounded">
    //           <div className="row justify-content-center align-items-center">
    //             <img
    //               src="./images/vhs.png"
    //               className="my-3"
    //               style={{ width: "110px", height: "90px" }}
    //               alt="VHS Logo"
    //             />
    //             <div className="mt-3 text-center text-black font-weight-bold">
    //               Login With Mobile Number
    //             </div>
    //             <input
    //               type="text"
    //               onChange={handlenumber}
    //               maxLength={10}
    //               value={mainContact}
    //               placeholder="Enter Mobile Number"
    //               className="form-control my-3"
    //             />
    //             {error && <div className="text-danger mb-2">{error}</div>}
    //             {success && <div className="text-success mb-2">{success}</div>}
    //             <button
    //               onClick={sendOTP}
    //               className="btn btn-danger w-100 font-weight-bold"
    //             >
    //               SIGN IN WITH OTP
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="row justify-content-center align-items-center">
    //         <div className="col-md-5 mt-4 border p-3 rounded">
    //           <div className="row justify-content-center align-items-center">
    //             <img
    //               src="./images/vhs.png"
    //               className="my-3"
    //               style={{ width: "110px", height: "90px" }}
    //               alt="VHS Logo"
    //             />
    //             <div className="mt-3 text-center text-black font-weight-bold">
    //               Please enter the OTP that has been sent to your registered
    //               mobile number
    //             </div>
    //             <input
    //               type="text"
    //               onChange={(e) => setOtp(e.target.value)}
    //               value={otp}
    //               placeholder="Enter OTP"
    //               className="form-control my-3"
    //             />
    //             {error && <div className="text-danger mb-2">{error}</div>}
    //             {timer > 0 ? (
    //               <div className="text-center text-black">
    //                 Resend in {timer}s
    //               </div>
    //             ) : (
    //               <button
    //                 onClick={sendOTP}
    //                 className="btn btn-link text-danger mb-3"
    //               >
    //                 Resend OTP
    //               </button>
    //             )}
    //             <button
    //               onClick={OTPVerification}
    //               className="btn btn-danger w-100 font-weight-bold"
    //             >
    //               VERIFY OTP
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="row">
      <div className="col-md-12">
        {!status ? (
          <div
            className="row"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              className="col-md-5"
              style={{
                marginTop: "10%",
                border: "1px solid grey",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <div
                className="row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <img
                  src="./images/vhs.png"
                  style={{
                    width: "110px",
                    height: "90px",
                    textAlign: "center",
                  }}
                  alt="VHS Logo"
                />

                <div
                  className="mt-3"
                  style={{
                    color: "black",
                    fontSize: "17px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Login With Mobile Number
                </div>

                <input
                  type="text"
                  onChange={handlenumber}
                  maxLength={10}
                  value={mainContact}
                  placeholder="Enter Mobile Number"
                  style={{
                    border: "1px solid grey",
                    height: "45px",
                    width: "60%",
                    marginTop: "15px",
                  }}
                />

                <div
                  onClick={sendOTP}
                  className="mb-2"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "800",
                    backgroundColor: "darkred",
                    padding: "5px",
                    width: "60%",
                    borderRadius: "5px",
                  }}
                >
                  SIGN IN WITH OTP
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="row"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              className="col-md-5"
              style={{
                marginTop: "10%",
                border: "1px solid grey",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <div
                className="row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <img
                  src="./images/vhs.png"
                  style={{
                    width: "110px",
                    height: "90px",
                    textAlign: "center",
                  }}
                  alt="VHS Logo"
                />

                <div
                  className="mt-3"
                  style={{
                    color: "black",
                    fontSize: "17px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Please enter the OTP that has been sent to your registered
                  mobile number
                </div>

                <input
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  placeholder="Enter OTP"
                  style={{
                    border: "1px solid grey",
                    height: "45px",
                    width: "60%",
                    marginTop: "15px",
                  }}
                />

                {timer > 0 ? (
                  <div style={{ textAlign: "center", color: "black" }}>
                    Resend in {timer}
                  </div>
                ) : (
                  <div onClick={sendOTP}>
                    <div
                      className="mb-3"
                      style={{ textAlign: "center", color: "darkred" }}
                    >
                      Resend OTP
                    </div>
                  </div>
                )}

                <div
                  onClick={OTPVerification}
                  className="mb-2"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "800",
                    backgroundColor: "darkred",
                    padding: "5px",
                    width: "60%",
                    borderRadius: "5px",
                  }}
                >
                  VERIFY OTP
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const [mainContact, setMainContact] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otp1, setOtp1] = useState("");
//   const [timer, setTimer] = useState(60);
//   const [modalVisible1, setModalVisible1] = useState(false);
//   const [status, setStatus] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handlenumber = (e) => {
//     setMainContact(e.target.value);
//   };

//   const sendOTP = async () => {
//     setTimer(60);
//     const isValidMobile = /^\d{10}$/.test(mainContact);

//     if (!isValidMobile) {
//       alert("Error", "Please enter a valid 10-digit mobile number.");
//       return;
//     }

//     try {
//       // setModalVisible1(true);
//       const response = await axios.post(
//         "https://api.vijayhomeservicebengaluru.in/api/sendotp",
//         {
//           mainContact: mainContact,
//         }
//       );

//       setStatus(true);
//       setMainContact("");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         alert("Error", error.response.data.error);

//         setMainContact("");
//       } else {
//         console.error("Error:", error);
//         setModalVisible1(false);
//         alert("Error", "An error occurred. Please try again later.");
//       }
//     }
//   };

//   const OTPVerification = async () => {
//     try {
//       const response = await axios.post(
//         "https://api.vijayhomeservicebengaluru.in/api/verifyotp",
//         {
//           otp: otp1,
//           mainContact: mainContact,
//         }
//       );
//       if (response.data.success) {
//         setStatus(false);
//         console.log("user data for storuing session storinage", response.data);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         navigate("/cartbook");
//       } else {
//         alert(response.data.error || "Unknown error occurred");
//         setMainContact("");
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
// <div className="row">
//   <div className="col-md-12">
//     {!status ? (
//       <div
//         className="row"
//         style={{ justifyContent: "center", alignItems: "center" }}
//       >
//         <div
//           className="col-md-5"
//           style={{
//             marginTop: "10%",
//             border: "1px solid grey",
//             padding: "20px",
//             borderRadius: "5px",
//           }}
//         >
//           <div
//             className="row"
//             style={{ justifyContent: "center", alignItems: "center" }}
//           >
//             <img
//               src="./images/vhs.png"
//               style={{
//                 width: "110px",
//                 height: "90px",
//                 textAlign: "center",
//               }}
//               alt="VHS Logo"
//             />

//             <div
//               className="mt-3"
//               style={{
//                 color: "black",
//                 fontSize: "17px",
//                 textAlign: "center",
//                 fontWeight: "bold",
//               }}
//             >
//               Login With Mobile Number
//             </div>

//             <input
//               type="text"
//               onChange={handlenumber}
//               maxLength={10}
//               value={mainContact}
//               placeholder="Enter Mobile Number"
//               style={{
//                 border: "1px solid grey",
//                 height: "45px",
//                 width: "60%",
//                 marginTop: "15px",
//               }}
//             />

//             <div
//               onClick={sendOTP}
//               className="mb-2"
//               style={{
//                 textAlign: "center",
//                 color: "white",
//                 fontSize: 16,
//                 fontWeight: "800",
//                 backgroundColor: "darkred",
//                 padding: "5px",
//                 width: "60%",
//                 borderRadius: "5px",
//               }}
//             >
//               SIGN IN WITH OTP
//             </div>
//           </div>
//         </div>
//       </div>
//     ) : (
//       <div
//         className="row"
//         style={{ justifyContent: "center", alignItems: "center" }}
//       >
//         <div
//           className="col-md-5"
//           style={{
//             marginTop: "10%",
//             border: "1px solid grey",
//             padding: "20px",
//             borderRadius: "5px",
//           }}
//         >
//           <div
//             className="row"
//             style={{ justifyContent: "center", alignItems: "center" }}
//           >
//             <img
//               src="./images/vhs.png"
//               style={{
//                 width: "110px",
//                 height: "90px",
//                 textAlign: "center",
//               }}
//               alt="VHS Logo"
//             />

//             <div
//               className="mt-3"
//               style={{
//                 color: "black",
//                 fontSize: "17px",
//                 textAlign: "center",
//                 fontWeight: "bold",
//               }}
//             >
//               Please enter the OTP that has been sent to your registered
//               mobile number
//             </div>

//             <input
//               type="text"
//               onChange={(e) => setOtp1(e.target.value)}
//               placeholder="Enter OTP"
//               style={{
//                 border: "1px solid grey",
//                 height: "45px",
//                 width: "60%",
//                 marginTop: "15px",
//               }}
//             />

//             {timer > 0 ? (
//               <div style={{ textAlign: "center", color: "black" }}>
//                 Resend in {timer}
//               </div>
//             ) : (
//               <div onClick={sendOTP}>
//                 <div
//                   className="mb-3"
//                   style={{ textAlign: "center", color: "darkred" }}
//                 >
//                   Resend OTP
//                 </div>
//               </div>
//             )}

//             <div
//               onClick={OTPVerification}
//               className="mb-2"
//               style={{
//                 textAlign: "center",
//                 color: "white",
//                 fontSize: 16,
//                 fontWeight: "800",
//                 backgroundColor: "darkred",
//                 padding: "5px",
//                 width: "60%",
//                 borderRadius: "5px",
//               }}
//             >
//               VERIFY OTP
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// </div>
//   );
// }

// export default Signup;

// import React, { useState, useRef } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   Autocomplete,
// } from "@react-google-maps/api";

// const MapWithSearch = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
//   const autocompleteRef = useRef(null);
//   const mapRef = useRef(null);

//   const handlePlaceSelect = () => {
//     const place = autocompleteRef.current.getPlace();
//     if (!place.geometry) {
//       // console.error("No geometry for selected place");
//       console.log("Line 46:, No geometry for selected place");
//       return;
//     }

//     const lat = place.geometry.location.lat();
//     const lng = place.geometry.location.lng();
//     const location = { lat, lng };
//     setSelectedLocation(location);
//     setSelectedPlaceAddress(place.formatted_address || "");

//     // Adjust map bounds to include both the marker and the searched location
//     if (mapRef.current && mapRef.current.getMap) {
//       const map = mapRef.current.getMap();
//       const bounds = new window.google.maps.LatLngBounds();
//       bounds.extend(location);
//       if (selectedLocation) {
//         bounds.extend(selectedLocation);
//       }
//       map.fitBounds(bounds);
//     }
//   };

//   return (
//     <div>
//       <LoadScript
//         googleMapsApiKey="AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk"
//         libraries={["places"]}
//       >
//         <GoogleMap
//           ref={mapRef}
//           center={{ lat: 12.9716, lng: 77.5946 }}
//           zoom={10}
//           mapContainerStyle={{ height: "400px", width: "100%" }}
//         >
//           {selectedLocation && <Marker position={selectedLocation} />}

//           <Autocomplete
//             onLoad={(autocomplete) => {
//               console.log("Autocomplete loaded:", autocomplete);
//               autocompleteRef.current = autocomplete;
//             }}
//             onPlaceChanged={handlePlaceSelect}
//           >
//             <input
//               type="text"
//               placeholder="Search for a location"
//               style={{
//                 boxSizing: `border-box`,
//                 border: `1px solid transparent`,
//                 width: `240px`,
//                 height: `32px`,
//                 padding: `0 12px`,
//                 borderRadius: `3px`,
//                 boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//                 fontSize: `14px`,
//                 outline: `none`,
//                 textOverflow: `ellipses`,
//                 position: "absolute",
//                 left: "50%",
//                 marginLeft: "-120px",
//               }}
//             />
//           </Autocomplete>
//         </GoogleMap>
//       </LoadScript>
//       <div style={{ textAlign: "center", marginTop: "10px" }}>
//         {selectedPlaceAddress && (
//           <p>Searched Location: {selectedPlaceAddress}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MapWithSearch;
