import React from "react";
import NavbarCompo from "./navbar";
import Footer from "./Footer";

function Cancellation() {
  return (
    <div>
      <NavbarCompo />
      <div className="container">
        <div className="row mb-4">
          <div
            className="poppins-semibold mt-4"
            style={{ textAlign: "center", color: "darkred" }}
          >
            Cancellation Policy
          </div>

          <div className="poppins-regular mt-2">
            We understand that plans can change. Our cancellation policy is
            designed to be fair and transparent for all our customers.
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            No Cancellation Charges !!
          </div>
          <div className=" mt-2 poppins-regular" style={{}}>
            Cancellation Charges !!
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            Within 4 Hours to 1 Hour Before Scheduled Slot: Full House Cleaning:
            ₹500
          </div>

          <div className=" mt-2 poppins-regular" style={{}}>
            Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹100
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            Home Repair Services : 200
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            Appliances Services : 200
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            Within 1 Hour and After Scheduled Slot: Full House Cleaning: ₹700
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹150
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            We appreciate your understanding and cooperation.
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            Please contact us as soon as possible if you need to cancel or
            reschedule your service to avoid any charges.
          </div>

          <div className="mt-2 poppins-regular" style={{}}>
            Before 4 Hours: If you cancel your service more than 4 hours before
            the scheduled slot, there will be no cancellation charges.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Cancellation;
