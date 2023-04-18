import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { addToCart } from "../reducers/cartSlice";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.id);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (userId) {
      dispatch(
        addToCart({ userId, productId: product.id, quantity: quantity })
      );
    } else {
      // Show a message or redirect to the login page
    }
  };
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-contain mb-4 rounded-md"
      />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <h2 className="text-lg font-bold mb-2">${product.price}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="flex items-center space-x-2 mb-2">
        <label
          htmlFor={`quantity-${product.id}`}
          className="text-sm font-semibold"
        >
          Quantity:
        </label>
        <input
          type="number"
          id={`quantity-${product.id}`}
          className="w-16 border rounded-md px-2"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
