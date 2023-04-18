import React from "react";

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
  };
  quantity: number;
}

interface CustomerOrder {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
  cartItems: CartItem[];
  orderDate: string;
  status: string;
}

interface OrderCardProps {
  order: CustomerOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { id, orderDate, status, cartItems } = order;

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="border border-gray-200 rounded p-4 mb-6">
      <h2 className="text-xl font-bold mb-2">Order ID: {id}</h2>
      <p>
        Order Date:{" "}
        {new Date(orderDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p>Status: {status}</p>
      <h3 className="text-lg font-bold mb-2 mt-4">Items:</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity} - Price: $
            {parseFloat(item.product.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold mt-4">
        Total Price: ${totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default OrderCard;
