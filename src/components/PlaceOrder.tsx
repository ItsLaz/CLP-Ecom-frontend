import React from "react";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { placeOrder } from "../reducers/orderSlice";

const PlaceOrder: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.id);

  const handlePlaceOrder = () => {
    if (userId) {
      dispatch(placeOrder(userId));
    }
  };

  return (
    <button
      onClick={handlePlaceOrder}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Place Order
    </button>
  );
};

export default PlaceOrder;
