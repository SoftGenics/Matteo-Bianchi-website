import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/home";
import ProductDisplay from "./screens/ProductDisplay";
import ProductDetails from "./screens/ProductDetails";
import Login from "./screens/Login";
import Otpvarify from "./screens/Otpvarify";
import LensPricing from './screens/LensPricing';
import Testing from './screens/Testing';
import ChekOutPage from './screens/ChekOutPage';
import FaqPage from './screens/FaqPage'
import ContactUs from "./screens/ContactUs";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import RefundPolicy from "./screens/RefundPolicy";
import ShippingPolicy from "./screens/ShippingPolicy";
import TermsAndConditions from "./screens/TermsAndConditions";
import AboutUs from "./screens/AboutUs";
import OrdersPage from "./screens/OrdersPage";
import TrackingStatus from "./screens/TrackingStatus"
import Jewellery from "./screens/Jewellery"
import PurseAndBags from "./screens/PurseAndBags"
import Eyewear from "./screens/Eyewear"
import Clothings from "./screens/Clothings"
import Footwears from "./screens/Footwears"
import ProductDetailsNew from "./screens/ProductDetailsNew"

import "./App.css";

export const GlobleInfo = createContext();

function App() {
  const [productCount, setProductCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [checkoutData, setCheckoutData] = useState({}); // Store checkout data

  // Update cart & wishlist count
  const updateCounts = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

      setProductCount(cartItems.length);
      setWishlistCount(wishlistItems.length);
    } catch (error) {
      console.error("Error updating counts:", error);
    }
  };

  useEffect(() => {
    // Initial count update
    updateCounts();

    // Listen for storage changes to sync across tabs/windows
    const handleStorageChange = (event) => {
      if (event.key === "cart" || event.key === "wishlist") {
        updateCounts();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Save checkout data
  const saveCheckoutData = (data) => {
    setCheckoutData(data);
    console.log("Checkout Data Saved:", data); // Debugging purposes
  };

  return (
    <GlobleInfo.Provider value={{ updateCounts, productCount, wishlistCount, checkoutData, saveCheckoutData }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/lense/power/:product_id" element={<LensPricing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/otp-varify" element={<Otpvarify />} />
          <Route exact path="/testing" element={<Testing />} />
          <Route exact path="/product-display/:category" element={<ProductDisplay />} />
          <Route exact path="/product-item/:product_id" element={<ProductDetails />} />
          <Route exact path="/product-item/:cetegory/:product_id" element={<ProductDetailsNew />} />
          
          <Route exact path="/ChekOutPage" element={<ChekOutPage />} />
          <Route exact path="/Faq-page" element={<FaqPage />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route exact path="/RefundPolicy" element={<RefundPolicy />} />
          <Route exact path="/ShippingPolicy" element={<ShippingPolicy />} />
          <Route exact path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />
          <Route exact path="/track-order" element={<OrdersPage />} />
          <Route exact path="/tracking-status/:id" element={<TrackingStatus />} />
          <Route exact path="/jewellery" element={<Jewellery />} />
          <Route exact path="/purse-nd-bags" element={<PurseAndBags />} />
          <Route exact path="/eyewear" element={<Eyewear />} />
          <Route exact path="/clothings" element={<Clothings />} />
          <Route exact path="/footwear" element={<Footwears />} />
        </Routes>
      </BrowserRouter>
    </GlobleInfo.Provider>
  );
}

export default App;
