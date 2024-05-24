import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart1, removeMyCartItem, clearCart } from "../Redux1/MyCartSlice";
import { deleteMyCartItem } from "../Redux1/MyCartSlice"; // Adjust the path as needed
import NabarCompo from "./navbar";

import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = localStorage.getItem("user");
  console.log("user=====", user);

  const handle = (item) => {
    dispatch(addToCart1(item));
  };

  const handleChange = () => {
    if (user) {
      navigate("/cartbook");
    } else {
      navigate("/login");
    }
  };

  const MyCartItmes = useSelector((state) => state.cart);
  console.log(MyCartItmes);

  const Carttotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const clear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <NabarCompo />
      <div className="col-md-8 mt-5 ">
        {MyCartItmes.map((item) => (
          <div
            className="row shadow-lg"
            style={{
              backgroundColor: "white",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <div className="col-md-10">
              <div className="">{item.planName}</div>
              <div className="">{item.category}</div>
              <div className="d-flex">
                <div className="" style={{ textDecoration: "line-through" }}>
                  ₹{item.planPrice}
                </div>
                <div className="mx-2">₹{item.offerprice}</div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="" style={{ textAlign: "center" }}>
                ₹{item.offerprice}
              </div>
              <div className="d-flex mt-2" style={{ justifyContent: "center" }}>
                <div
                  className=""
                  style={{}}
                  onClick={() => {
                    if (item.qty > 1) {
                      dispatch(removeMyCartItem(item));
                    } else {
                      dispatch(deleteMyCartItem(item.id));
                    }
                  }}
                >
                  <i
                    class="fa-solid fa-minus"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      backgroundColor: "green",
                      padding: "5px",
                      borderRadius: "50px",
                    }}
                  ></i>
                </div>
                <div
                  className="mx-2"
                  style={{ color: "black", fontSize: "14px", marginTop: "3px" }}
                >
                  {item.qty}
                </div>
                <div className="" onClick={() => handle(item)}>
                  <i
                    class="fa-solid fa-plus"
                    style={{
                      color: "white",
                      fontSize: "14px",
                      backgroundColor: "green",
                      padding: "5px",
                      borderRadius: "50px",
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="row mt-5">
          <div className="col-md-6 d-flex">
            <p style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
              Total :
            </p>
            <p
              className="mx-2"
              style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
            >
              {Carttotal}
            </p>
          </div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "end" }}
          >
            {MyCartItmes !== undefined ? (
              // <Link
              //   to="/cartbook"
              //   // state={{ subcategory: data }}
              //   // key={data.subcategory}
              //   style={{ textDecoration: "none" }}
              //   // className="text-decoration-none text-black"
              // >
              <button
                onClick={handleChange}
                style={{
                  backgroundColor: "darkred",
                  padding: 5,
                  borderRadius: 5,
                  width: 130,
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  Continue
                </span>
              </button>
            ) : (
              // </Link>
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
