import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import NotFound from "./pages/Error";
import Mainpage from "./pages/Mainpage";
import Products from "./pages/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import ScrollToTop from "./utils/scrollToTop";
import { TokenHandler } from "./utils/wrappers/protectedRoute";
import AllPromo from "./pages/Promo";
import Statistic from "./pages/Stats";

// const AllRouter = createBrowserRouter(createRoutesFromElements());

const Routers = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TokenHandler />}>
          <Route path="/stats" element={<Statistic />} />
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
