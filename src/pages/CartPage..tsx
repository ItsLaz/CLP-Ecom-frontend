import { useEffect } from "react";
import CartItemCard from "../components/CartItemCard";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { fetchCartItems } from "../reducers/cartSlice";

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

  return (
    <main className="container mx-auto px-4 mt-8">
      <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </main>
  );
};

export default CartPage;
