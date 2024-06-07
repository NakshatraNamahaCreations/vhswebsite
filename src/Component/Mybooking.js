import React, { useState, useEffect } from "react";
import Header2 from "./Header2";
import axios from "axios";

function MyBooking() {
  const [bookingsData, setBookingsData] = useState([]);
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  useEffect(() => {
    if (userData) {
      getBookingsData();
    }
  }, [userData]);

  const getBookingsData = async () => {
    try {
      const res = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/mybookusingID/${userData?._id}`
      );
      if (res.status === 200) {
        setBookingsData(res.data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings data:", err);
    }
  };

  console.log("bookingsData", bookingsData);

  return (
    <div className="">
      <Header2 />
      <div className="container">
        <div className="row justify-content-center">
          {bookingsData.map((data, index) => (
            <div className="row justify-content-center">
              <div
                className="col-md-6 mt-3"
                style={{
                  border: "1px solid grey",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="mb-2"
                  style={{
                    color: "darkred",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {data.service}
                </div>
                <div
                  className=""
                  style={{
                    fontSize: "13px",
                    color: "black",
                  }}
                >
                  {data.desc}
                </div>
                <div
                  className="mt-1"
                  style={{ fontSize: "11px", color: "grey" }}
                >
                  {data.startDate} <span>{data.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBooking;
