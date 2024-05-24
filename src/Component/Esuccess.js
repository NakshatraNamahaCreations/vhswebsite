import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Esuccess() {
  const location = useLocation();

  const { data, appoTime, appoDate } = location.state || {};
  console.log("data", data, appoTime, appoDate);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/"; // Redirect to home page after 3 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlechange = () => {
    window.location.href = "/"; // Redirect to home page after 3 seconds
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-5 shadow-lg p-3"
          style={{ borderRadius: "5px", marginTop: "100px" }}
        >
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
            <div className="col-md-6 ">{data.category}</div>
          </div>

          <div className="row mt-2">
            <div className="col-md-5 text-center">Subcategory</div>
            <div className="col-md-1 ">:</div>
            <div className="col-md-6 ">{data.Subcategory}</div>
          </div>

          <div className="row mt-2">
            <div className="col-md-5 text-center"> Service Name</div>
            <div className="col-md-1 ">:</div>
            <div className="col-md-6 ">{data.serviceName}</div>
          </div>
          <div className="row mt-2">
            <div className="col-md-5 text-center">appoTime</div>
            <div className="col-md-1 ">:</div>
            <div className="col-md-6 ">{appoTime}</div>
          </div>
          <div className="row mt-2">
            <div className="col-md-5 text-center">appoDate</div>
            <div className="col-md-1 ">:</div>
            <div className="col-md-6 ">{appoDate}</div>
          </div>

          <div className="d-flex justify-content-center mt-3 mb-3">
            <Button
              onClick={handlechange}
              variant="secondary"
              style={{ width: "200px", backgroundColor: "darkred" }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Esuccess;
