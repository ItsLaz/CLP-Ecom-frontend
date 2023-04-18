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
  const { product, quantity } = cartItem;

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem.id));
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-contain mb-4 rounded"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <h2 className="text-2xl font-bold mb-2">${product.price}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-semibold">Quantity: {quantity}</span>
        <div className="space-x-2">
          <button
            onClick={() => dispatch(removeOneFromCart(cartItem.id))}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
          >
            Remove 1
          </button>
          <button
            onClick={() => dispatch(removeFromCart(cartItem.id))}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
          >
            Remove All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
