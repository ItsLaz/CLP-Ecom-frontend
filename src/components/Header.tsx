import { Link } from "react-router-dom";
import { useAppSelector } from "../reducers/hooks";

const Header: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          Ecommerce App
        </Link>
        {isAuthenticated ? (
          <div>
            <Link to="/products" className="text-white mx-2">
              Products
            </Link>
            <Link to="/cart" className="text-white mx-2">
              Cart
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/signin" className="text-white mx-2">
              Sign In
            </Link>
            <Link to="/signup" className="text-white mx-2">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
