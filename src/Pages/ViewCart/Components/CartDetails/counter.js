// Your component

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveCartData } from "../../../../dataStoreComponent/viewcartSlice";

export default function Counters() {
  const NumberOfQunt = 5; // Replace with your dynamic value
  const quantity = useSelector((state) => state?.viewCart?.CartItemsQnty);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SaveCartData(NumberOfQunt));
  }, [dispatch, NumberOfQunt]);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          // onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{quantity}</span>
        <button
          aria-label="Decrement value"
          // onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
