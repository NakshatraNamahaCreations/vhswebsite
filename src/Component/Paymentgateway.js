import React, { useState } from "react";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Pay = () => {
  const [formData, setFormData] = useState({
    name: "DemoTest",
    mobile: "999999999",
    amount: "10",
    muid: "nuid-909090",
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const makePayment = async (e) => {
    e.preventDefault();

    const transactionId = "Tr-" + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: process.env.REACT_APP_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: "MUID-" + uuidv4().toString(36).slice(-6),
      amount: 10000,
      redirectUrl: `http://localhost:3000/api/status/${transactionId}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/api/status/${transactionId}`,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = btoa(dataPayload);

    const fullURL = dataBase64 + "/pg/v1/pay" + process.env.REACT_APP_SALT_KEY;
    const dataSha256 = sha256(fullURL);
    const checksum = dataSha256 + "###" + process.env.REACT_APP_SALT_INDEX;

    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    try {
      const response = await axios.post(
        UAT_PAY_API_URL,
        { request: dataBase64 },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
          },
        }
      );

      const redirectURL =
        response.data.data.instrumentResponse.redirectInfo.url;
      window.location.href = redirectURL;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => makePayment(e)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleFormData(e)}
                type="name"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Mobile"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mobile
            </label>
            <div className="mt-2">
              <input
                id="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={(e) => handleFormData(e)}
                autoComplete="Mobile"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2">
              <input
                id="Amount"
                name="amount"
                value={formData.amount}
                onChange={(e) => handleFormData(e)}
                autoComplete="Amount"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="MUID"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              MUID
            </label>
            <div className="mt-2">
              <input
                id="MUID"
                name="muid"
                value={formData.muid}
                onChange={(e) => handleFormData(e)}
                autoComplete="MUID"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pay;
