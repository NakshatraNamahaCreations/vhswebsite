import axios from "axios";
import React from "react";

const PaymentComponent = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/payment/ccavenueintiate",
        {
          transactionId: "12345",
          amount: "1.00",
        }
      );

      console.log("Backend Response:", response.data);

      const { encRequest } = response.data;

      const baseUrl =
        "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";
      const accessCode = "AVHX01LG55AF47XHFA"; // Your Access Code

      const redirectUrl = `${baseUrl}&encRequest=${encRequest}&access_code=${accessCode}`;

      console.log("Redirect URL:", redirectUrl);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = redirectUrl;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Initiate Payment</button>
    </div>
  );
};

export default PaymentComponent;
