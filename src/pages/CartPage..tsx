import { useEffect } from "react";
import CartItemCard from "../components/CartItemCard";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { fetchCartItems } from "../reducers/cartSlice";
import PlaceOrder from "../components/PlaceOrder";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const error = useAppSelector((state) => state.cart.error);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const userId = useAppSelector((state) => state.auth.user.id);

  useEffect(() => {
    if (userId > 0 && isAuthenticated) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="container mx-auto px-4 mt-8">
      <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((cartItem, index) => (
              <CartItemCard
                key={`${cartItem.id}-${index}`}
                cartItem={cartItem}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0 md:ml-8">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="border border-gray-200 rounded p-4">
            <p>
              Subtotal ({totalQuantity} items): {totalPrice.toFixed(2)}
            </p>
            <p>Shipping: TBD</p>
            <p>Tax: TBD</p>
            <hr className="my-4" />
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-8">
            <PlaceOrder />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
