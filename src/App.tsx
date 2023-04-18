import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage.";
import OrdersPage from "./pages/OrdersPage";
import { useAppSelector } from "./reducers/hooks";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate replace to={"/products"} />
            ) : (
              <SignInPage />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate replace to={"/products"} />
            ) : (
              <SignUpPage />
            )
          }
        />
        <Route
          path="/products"
          element={
            isAuthenticated ? (
              <ProductsPage />
            ) : (
              <Navigate replace to={"/signin"} />
            )
          }
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? <CartPage /> : <Navigate replace to={"/signin"} />
          }
        />
        <Route
          path="/orders"
          element={
            isAuthenticated ? (
              <OrdersPage />
            ) : (
              <Navigate replace to={"/signin"} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
