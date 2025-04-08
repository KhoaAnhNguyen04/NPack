import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import Mainpage from "./pages/Mainpage";
import Products from "./pages/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import ScrollToTop from "./utils/scrollToTop";
import { TokenHandler } from "./utils/wrappers/protectedRoute";
import Statistic from "./pages/Stats";
import Summary from "./pages/Summary";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Login/SignUp";

const Routers = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TokenHandler />}>
          <Route path="/stats" element={<Statistic />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route index element={<Mainpage />} />
          <Route path="products/*" element={<Products title="Products" />}>
            <Route path="category/:id" element={""} />
          </Route>
          <Route
            path="products/detail/:productId"
            element={<ProductDetail />}
          />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
