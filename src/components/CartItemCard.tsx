import { removeFromCart, removeOneFromCart } from "../reducers/cartSlice";
import { useAppDispatch } from "../reducers/hooks";

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

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <img
        src={cartItem.product.imageUrl}
        alt={cartItem.product.name}
        className="w-full h-48 object-contain mb-4 rounded-md"
      />
      <h2 className="text-lg font-bold mb-2">{cartItem.product.name}</h2>
      <h2 className="text-lg font-bold mb-2">${cartItem.product.price}</h2>
      <p className="text-sm text-gray-600">{cartItem.product.description}</p>
      <div className="flex items-center space-x-2 mb-2">
        <label
          htmlFor={`quantity-${cartItem.id}`}
          className="text-sm font-semibold"
        >
          Quantity:
        </label>
        <input
          type="number"
          id={`quantity-${cartItem.id}`}
          className="w-16 border rounded-md px-2"
          value={cartItem.quantity}
          readOnly
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => dispatch(removeOneFromCart(cartItem.id))}
          className="bg-red-500 text-white text-xs font-bold rounded-md px-2 py-1"
        >
          Remove 1
        </button>
        <button
          onClick={() => dispatch(removeFromCart(cartItem.id))}
          className="bg-red-500 text-white text-xs font-bold rounded-md px-2 py-1"
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
