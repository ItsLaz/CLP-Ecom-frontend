import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../reducers/hooks";
import { fetchUserOrders } from "../reducers/orderSlice";
import OrderCard from "../components/OrderCard";

const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.orders);
  const error = useAppSelector((state) => state.order.error);

  const userId = useAppSelector((state) => state.auth.user.id);

  useEffect(() => {
    if (userId > 0) {
      dispatch(fetchUserOrders(userId));
    }
  }, [dispatch, userId]);

  return (
    <main className="container mx-auto px-4 mt-8">
      <h1 className="text-4xl font-bold mb-4">Your Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} /> // Use OrderCard component
      ))}
    </main>
  );
};

export default OrdersPage;
