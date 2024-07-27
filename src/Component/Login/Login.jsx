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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [name, setname] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const sendOTP = async () => {
    const isValidMobile = /^\d{10}$/.test(mainContact);

    if (!isValidMobile) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/sendotp/sendByCartBook",
        { mainContact: mainContact, customerName: name }
      );
      if (response.status === 200) {
        alert("Successful login");
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/cartbook");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
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
                  className="mt-3 poppins-semibold"
                  style={{
                    color: "black",
                    fontSize: "17px",
                    textAlign: "center",
                    // fontWeight: "bold",
                  }}
                >
                  Login With Mobile Number
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter Name"
                  style={{
                    border: "1px solid grey",
                    height: "45px",
                    width: "60%",
                    marginTop: "15px",
                  }}
                />

                <input
                  type="text"
                  value={mainContact}
                  onChange={(e) => setMainContact(e.target.value)}
                  placeholder="Enter Mobile Number"
                  style={{
                    border: "1px solid grey",
                    height: "45px",
                    width: "60%",
                  }}
                />

                <div
                  onClick={sendOTP}
                  className="mb-2 poppins-black"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: "14px",
                    backgroundColor: "darkred",
                    padding: "5px",
                    width: "60%",
                    borderRadius: "5px",
                  }}
                >
                  Next
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
