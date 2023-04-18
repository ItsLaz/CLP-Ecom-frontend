import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { fetchProducts } from "../reducers/productSlice";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const error = useAppSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="container mx-auto px-4 mt-8">
      <h1 className="text-4xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
