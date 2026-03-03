import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { SERVER_API_URL } from '../../server/server';
import { GlobleInfo } from '../../App';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import dceyewrLogo from '../../Assets/images/dceyewr-logo-no-text.png';
import men_pic from '../../Assets/images/men_pic.webp'
import women_pic from '../../Assets/images/women_pic.webp'
import kid_pic from '../../Assets/images/kid_pic.webp'
import wishlist from '../../Assets/images/wishlist.svg'
import { FaRegHeart } from "react-icons/fa";
import './index.css';


const Clothings = {
  PowerGlasses: {
    category: {
      Men: ['Classic Spectacles - Starting from ₹2000'],
      Women: ['Premium Spectacles - Starting from ₹3500', 'Fashion Spectacles - Starting from ₹2500'],

    },
    brands: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
    ],
    picks: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
      { name: 'Purse', link: '/purse-nd-bags' },
    ],
    frameShapes: [
      { name: 'Footwear', link: '/footwear' },
      { name: 'Footwear', link: '/footwear' },
    ],
  },
};

const Footwear = {
  PowerGlasses: {
    category: {
      Men: ['Classic Spectacles - Starting from ₹2000'],
      Women: ['Premium Spectacles - Starting from ₹3500', 'Fashion Spectacles - Starting from ₹2500'],

    },
    brands: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
    ],
    picks: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
      { name: 'Purse', link: '/purse-nd-bags' },
    ],
    frameShapes: [
      { name: 'Footwear', link: '/footwear' },
      { name: 'Footwear', link: '/footwear' },
    ],
  },
};

const Purse = {
  PowerGlasses: {
    category: {
      Men: ['Classic Spectacles - Starting from ₹2000'],
      Women: ['Premium Spectacles - Starting from ₹3500', 'Fashion Spectacles - Starting from ₹2500'],

    },
    brands: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
    ],
    picks: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
      { name: 'Purse', link: '/purse-nd-bags' },
    ],
    frameShapes: [
      { name: 'Footwear', link: '/footwear' },
      { name: 'Footwear', link: '/footwear' },
    ],
  },
};

const screenSaver = {
  PowerGlasses: {
    category: {
      Men: ['Classic Spectacles - Starting from ₹2000'],
      Women: ['Premium Spectacles - Starting from ₹3500', 'Fashion Spectacles - Starting from ₹2500'],

    },
    brands: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
    ],
    picks: [
      { name: 'Jewelery', link: '/product-display/all' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
      { name: 'Purse', link: '/purse-nd-bags' },
    ],
    frameShapes: [
      { name: 'Footwear', link: '/footwear' },
      { name: 'Footwear', link: '/footwear' },
    ],
  },
};

const categories = {
  PowerGlasses: {
    category: {
      Men: ['Classic Eyeglasses - Starting from ₹2000', 'Premium Eyeglasses - Starting from ₹3500'],
      Women: ['Premium Eyeglasses - Starting from ₹3500', 'Fashionable Eyeglasses - Starting from ₹2500'],
      Kids: ['Screen Eyeglasses - Starting from ₹500', 'Durable Eyeglasses - Starting from ₹1500'],
    },

    brands: [
      { name: 'Jewelery', link: '/jewellery' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
    ],
    picks: [
      { name: 'Jewelery', link: '/jewellery' },
      { name: 'Footwears', link: '/footwear' },
      { name: 'Sunglasses', link: '/product-display/all' },
      { name: 'Purse', link: '/purse-nd-bags' },
    ],
    frameShapes: [
      { name: 'Footwear', link: '/footwear' },
    ],
  },
};

const trendingSearches = [
  "Eyeglasses",
  "Sunglasses",
  "Contact Lenses",
  "Vincent Chase Eyeglasses",
  "Vincent Chase Sunglasses",
  "John Jacobs Eyeglasses",
  "John Jacobs Sunglasses",
  "Mens Sunglasses",
  "Women Sunglasses",
  "Aviator",
  "Eyewear Accessories",
  "Purevision",
  "Acuvue",
  "Eye Checkup",
];


const Header = () => {
  const navigate = useNavigate();
  const { productCount, wishlistCount, saveCheckoutData } = useContext(GlobleInfo)
  const [mobile_num, setMobile_num] = useState("");
  // const { saveCheckoutData } = useContext(GlobleInfo)
  const [selectedColor, setSelectedColor] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState('');   // State for popup content
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [cartListItems, setCartlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);

  // Load wishlist items from localStorage when the popup opens
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, [isWishlistOpen]);

  // Load cart items from localStorage when the popup opens
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartlistItems(storedCart);
  }, [isCartOpen]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/api/categories/all`);
      setCategoriesData(response.data);

    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchCategories()
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with your actual token key
    if (token) {
      // Decode the token to get user information
      const decodedToken = jwtDecode(token);
      const mobile_num = decodedToken.mobile_num;
      setMobile_num(mobile_num)
      // console.log("Decoded Mobile Number:", mobile_num);
    }
  }, []);

  const parseColorData = (colorData) => {
    if (!colorData) return [];
    try {
      // If it starts with [ or { → parse as JSON
      if (/^[\[{]/.test(colorData.trim())) {
        return JSON.parse(colorData);
      }
      // Otherwise, treat as plain string
      return [{ [colorData]: "#000000" }];
    } catch {
      return [];
    }
  };

  const saveColor = (item) => {
    const frameColors = parseColorData(item?.result?.frameColor);
    const lensColors = parseColorData(item?.result?.lenshColor);

    const [frameName, frameHex] = Object.entries(frameColors[0] || { Unknown: "#ffffff" })[0];
    const [lensName, lensHex] = Object.entries(lensColors[0] || { Default: "#000000" })[0];

    setSelectedColor({ frameName, frameHex, lensName, lensHex });
  };

  const handleDirectPayment = (data) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    const { item, product_price, productQuntity, product_id } = data;

    if (item) {
      saveColor(item);
    }

    if (product_price && mobile_num && product_id && productQuntity) {
      const power = {
        selectedLensOrProducrPrice: product_price,
      };

      const product = {
        mobile_number: mobile_num,
        selectedColor: selectedColor,
        product_id: product_id,
        productQuntity: productQuntity,
      };

      saveCheckoutData({ power, product });
      navigate("/ChekOutPage");
    } else {
      console.error("Missing data:", {
        product_price,
        product_id,
        productQuntity,
        mobile_num,
      });
      alert("Please select valid options.");
    }
  };



  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cartListItems.filter((item) => item.product_id !== id);
    setCartlistItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage

    // ✅ Use window.location.reload() to bypass ESLint restriction
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };


  // Function to remove an item from the wishlist
  const removeFromWishlist = (id) => {
    const updatedItems = wishlistItems.filter((item) => item.product_id !== id);
    setWishlistItems(updatedItems);
    localStorage.setItem("wishlist", JSON.stringify(updatedItems)); // Update localStorage
  };

  const togglePopup = (content) => {
    setPopupContent(content);  // Set the content for the popup
    setIsPopupOpen(true);  // Toggle popup
  };

  const onHandleSearch = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100);

    if (query) {
      navigate(`/product-display/${query}`, { replace: true });
    }
  }

  const openFaq = () => {
    navigate("/Faq-page", { replace: true });
  }

  // useEffect(() => {
  //   if (query) {
  //     navigate(`/product-display/${query}`, { replace: true });
  //   }
  // }, [query, navigate]);

  return (
    <>
      <div className='header-bg-container'>
        <nav className="navbar">
          <div className="navbar-top">
            {/* Logo & Contact */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logo-container">
                {/* <img src={dceyewrLogo} alt="Lenskart" className="logo" /> */}
                <div className="contact">
                  {/* <span className='eyezone-text'>Eyezones</span> */}
                  {/* <button className="btn-tryon" style={{ padding: "5px 8px", border: "none", borderRadius: "2px", fontWeight: "900" }}>AANCHAL</button> */}
                  <button className="btn-tryon" style={{ padding: "5px 8px", border: "none", borderRadius: "2px", fontWeight: "900" }}>Matteo Bianchi</button>
                  {/* <FaPhone className="icon" size={20} /> */}
                  {/* <span>99998 99998</span> */}
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="search-container">
              <div className='search-home-main'>
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 2000)}
                />
                <FaSearch className="search-icon" onClick={() => onHandleSearch()} size={28} />
              </div>

              {showDropdown && (
                <div className="search-dropdown">
                  <div className="search-dropdown-header">Trending Search</div>
                  <ul>
                    {trendingSearches.map((item, index) => (
                      <li key={index} onMouseDown={() => setQuery(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Icons */}
            <div className="user-actions">
              <Link className='login-sinup' to="/track-order">Track Order</Link>
              <Link className='login-sinup' to="/login">Sign In & Sign Up</Link>
              {/* <img src={wishlist} alt="wishlist" className='wishlist-image' /> */}
              {/* <BsBagHeart className="icon" size={20} style={{color:"#97bce3"}} onClick={() => setIsWishlistOpen(true)} /> */}
              <div className='wishlist-container'>
                {wishlistItems.length > 0 ? (
                  <img src={wishlist} alt="wishlist" className='wishlist-image' style={{ width: "25px" }} />
                ) : (
                  <FaRegHeart className="icon" size={20} style={{ color: "#97bce3" }} onClick={() => setIsWishlistOpen(true)} />
                )}

                {wishlistItems.length > 0 ? (
                  <div className="wishlist-badge">
                    {wishlistCount}</div>
                ) : (null)}
              </div>
              <span className='cart-button' onClick={() => setIsWishlistOpen(true)}>Wishlist</span>

              <div className="cart-container">
                <FaShoppingCart className="icon" size={20} />
                <div className="cart-badge">{productCount}</div>
              </div>
              <span className='cart-button' onClick={() => setIsCartOpen(true)}>Cart</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='navbar-main-bottom'>
            <div className="navbar-bottom">
              {categoriesData.length > 0 &&
                categoriesData.map((category, index) => (
                  <span
                    key={index}
                    className={`nav-link`}
                    onClick={() => togglePopup(category.categories_name)}
                  >
                    {category.categories_name}
                  </span>
                ))}
            </div>


            {/* <div className="navbar-buttons">
              <button className="btn-blu">BLU</button>
            </div> */}
          </div>
        </nav>

        <header className="header-main-container" style={{ display: "none" }}>
          {/* Left - Menu Icon */}
          <div className="left-section">
            {/* <FaBars className="menu-icon" /> */}
            <span className="nav-link" onClick={() => togglePopup('Power Glasses')}>
              Power Glasses
            </span>
            <span className="nav-link" onClick={() => togglePopup('Sunglasses')}>
              Sunglasses
            </span>
            <span className="nav-link" onClick={() => togglePopup('Screen Saver')}>
              Screen Saver
            </span>
            <span className="nav-link" onClick={() => togglePopup('Contact Lenses')}>
              Contact Lenses
            </span>

            <span className="nav-link nav-link-modifiy" onClick={() => togglePopup('Kids Glasses')}>
              Kids Glasses
            </span>
          </div>

          {/* Center - Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo-section">
              <img src={dceyewrLogo} className="logo-icon" alt="Logo" />
              <span
                style={{ paddingBottom: "8px" }}>Eye zones</span>
            </div>
          </Link>

          <div className="search-container">
            {/* <div className='search-home-main'> */}
            <input
              type="text"
              placeholder="What are you looking for?"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 2000)}
            />
            {/* <FaSearch className="icon" onClick={handleSearch} />
          </div> */}

            {showDropdown && (
              <div className="search-dropdown">
                <div className="search-dropdown-header">Trending Search</div>
                <ul>
                  {trendingSearches.map((item, index) => (
                    <li key={index} onMouseDown={() => setQuery(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right - Search and Cart */}
          <div className="right-section">
            {/* <FaSearch className="icon" onClick={toggleSearchPopup} /> Clickable search icon */}
            <span className="nav-link">Track Order</span>
            <span style={{ paddingTop: "0px" }} onClick={() => setIsWishlistOpen(true)}><ImFire color='#1930dc' size={23} /></span>
            <span className="nav-link" onClick={() => setIsWishlistOpen(true)}>
              Wishlist
            </span>

            <div className="cart-container">
              <FaShoppingCart className="icon" />
              <div className="cart-badge">{productCount}</div>
            </div>
          </div>
        </header>

        {/* Wishlist Popup */}
        {isWishlistOpen && (
          <div className="wishlist-popup">
            <div className="wishlist-header">
              <h3>My Wishlist</h3>
              <button className="close-btn" onClick={() => setIsWishlistOpen(false)}>X</button>
            </div>
            <div className="wishlist-content">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                  <div key={item.product_id} className="wishlist-item">
                    <img src={`${SERVER_API_URL}/${item?.product_thumnail_img}`} alt={item.product_title} />
                    <div className="wishlist-info">
                      <p className="wishlist-product-title">{item.product_title}</p>
                      <p className="wishlist-product-price">
                        ₹{(item.product_price - (item.product_price * item.discount / 100)).toFixed(0)}/-
                      </p>
                    </div>
                    <button className="delete-btn" onClick={() => removeFromWishlist(item.product_id)}>🗑</button>
                  </div>
                ))
              ) : (
                <p className="empty-message">No items in wishlist</p>
              )}
            </div>
          </div>
        )}

        {/* cart popup */}
        <div className={`cart-popup ${isCartOpen ? "open" : ""}`}>
          <div className="cart-popup-content">
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
            <h2>Shopping Cart</h2>

            {cartListItems.length > 0 ? (
              <>
                <div className="cart-items">
                  {cartListItems.map((item, index) => (
                    <div key={index} className="cart-item-card">
                      <img className="cart-item-image" src={`${SERVER_API_URL}/${item?.product_thumnail_img}`} alt={item.product_title} />

                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{item.product_title}</p>
                        <p> ₹{((item.product_price - (item.product_price * item.discount / 100)) * item.quantity).toFixed(0)}/-</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>

                      <div className='button-byenow-container'>
                        <button
                          className="buy-now buy-now-updated"
                          onClick={() =>
                            handleDirectPayment({
                              item: item,
                              productQuntity: item.quantity,
                              product_price: ((item.product_price - (item.product_price * item.discount / 100)) * item.quantity).toFixed(0),
                              product_id: item.product_id,
                            })
                          }
                        >
                          Buy Now
                        </button>
                        <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>

              </>
            ) : (
              <p className="empty-cart">Your cart is empty.</p>
            )}
          </div>
        </div>

        {/* Popup */}
        {isPopupOpen && (
          <div className="item-popup">
            <button className="close-button" onClick={() => setIsPopupOpen(false)}>
              Close
            </button>

            <div className="popup-content">
              <h2 className='popup-containt-heading'>{popupContent}</h2>

              <div className="category-column">
                {/* <h3>Category</h3> */}
                {Object.entries(categories.PowerGlasses.category).map(([heading], index) => (
                  <div key={index} className="category-group">
                    <img
                      src={
                        heading === 'Men'
                          ? men_pic
                          : heading === 'Women'
                            ? women_pic
                            : heading === 'Kids'
                              ? kid_pic
                              : dceyewrLogo
                      }
                      alt={`${heading}`}
                      className="category-image"
                    />
                    <h4 className="category-heading">{heading}</h4>

                  </div>
                ))}
              </div>

              {/* <h1 className='popup-containt-heading'>Premium</h1> */}

              <ul>
                {popupContent === 'Eyewear' && (
                  <div className="power-glasses-container">
                    {/* Select Category Section */}


                    {/* Brands Section */}
                    <div className="brands-column">
                      {/* <h3>Brands</h3> */}
                      {categories.PowerGlasses.brands.map((brand, index) => (
                        <div className="brand-item" key={index}>
                          <Link target="_blank" to={brand.link} style={{ color: "#000" }}>{brand.name} </Link>
                        </div>
                      ))}
                    </div>

                    {/* Our Top Picks Section */}
                    <div className="top-picks-column">
                      {/* <h3>Our Top Picks</h3> */}
                      {categories.PowerGlasses.picks.map((pick, index) => (
                        <div className="pick-item" key={index}>
                          <Link target="_blank" to={pick.link} style={{ color: "#000" }}>{pick.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Frame Shapes Section */}
                    <div className="frame-shapes-column">
                      {/* <h3>Kids Shopings</h3> */}
                      {categories.PowerGlasses.frameShapes.map((shape, index) => (
                        <div className="frame-shape-item" key={index}>
                          <Link target="_blank" to={shape.link} style={{ color: "#000" }}>{shape.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {popupContent === 'Jewellery' && (
                  <div className="power-glasses-container">
                    {/* Select Category Section */}


                    {/* Brands Section */}
                    <div className="brands-column">
                      {/* <h3>Brands</h3> */}
                      {screenSaver.PowerGlasses.brands.map((brand, index) => (
                        <div className="brand-item" key={index}>
                          <Link target="_blank" to={brand.link} style={{ color: "#000" }}>{brand.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Our Top Picks Section */}
                    <div className="top-picks-column">
                      {/* <h3>Our Top Picks</h3> */}
                      {screenSaver.PowerGlasses.picks.map((pick, index) => (
                        <div className="pick-item" key={index}>
                          <Link target="_blank" to={pick.link} style={{ color: "#000" }}>{pick.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Frame Shapes Section */}
                    <div className="frame-shapes-column">
                      {/* <h3>Kids Shopings</h3> */}
                      {screenSaver.PowerGlasses.frameShapes.map((shape, index) => (
                        <div className="frame-shape-item" key={index}>
                          <Link target="_blank" to={shape.link} style={{ color: "#000" }}>{shape.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {popupContent === 'Purse-Nd-Bags' && (
                  <div className="power-glasses-container">
                    {/* Select Category Section */}


                    {/* Brands Section */}
                    <div className="brands-column">
                      {/* <h3>Brands</h3> */}
                      {Purse.PowerGlasses.brands.map((brand, index) => (
                        <div className="brand-item" key={index}>
                          <Link target="_blank" to={brand.link} style={{ color: "#000" }}>{brand.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Our Top Picks Section */}
                    <div className="top-picks-column">
                      {/* <h3>Our Top Picks</h3> */}
                      {Purse.PowerGlasses.picks.map((pick, index) => (
                        <div className="pick-item" key={index}>
                          <Link target="_blank" to={pick.link} style={{ color: "#000" }}>{pick.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Frame Shapes Section */}
                    <div className="frame-shapes-column">
                      {/* <h3>Kids Shopings</h3> */}
                      {Purse.PowerGlasses.frameShapes.map((shape, index) => (
                        <div className="frame-shape-item" key={index}>
                          <Link target="_blank" to={shape.link} style={{ color: "#000" }}>{shape.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {popupContent === 'Footwear' && (
                  <div className="power-glasses-container">
                   
                    {/* Brands Section */}
                    <div className="brands-column">
                      {/* <h3>Brands</h3> */}
                      {Footwear.PowerGlasses.brands.map((brand, index) => (
                        <div className="brand-item" key={index}>
                          <Link target="_blank" to={brand.link} style={{ color: "#000" }}>{brand.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Our Top Picks Section */}
                    <div className="top-picks-column">
                      {/* <h3>Our Top Picks</h3> */}
                      {Footwear.PowerGlasses.picks.map((pick, index) => (
                        <div className="pick-item" key={index}>
                          <Link target="_blank" to={pick.link} style={{ color: "#000" }}>{pick.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Frame Shapes Section */}
                    <div className="frame-shapes-column">
                      {/* <h3>Kids Shopings</h3> */}
                      {Footwear.PowerGlasses.frameShapes.map((shape, index) => (
                        <div className="frame-shape-item" key={index}>
                          <Link target="_blank" to={shape.link} style={{ color: "#000" }}>{shape.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {popupContent === 'Clothings' && (
                    <div className="power-glasses-container">
                   
                    {/* Brands Section */}
                    <div className="brands-column">
                      {/* <h3>Brands</h3> */}
                      {Clothings.PowerGlasses.brands.map((brand, index) => (
                        <div className="brand-item" key={index}>
                          <Link target="_blank" to={brand.link} style={{ color: "#000" }}>{brand.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Our Top Picks Section */}
                    <div className="top-picks-column">
                      {/* <h3>Our Top Picks</h3> */}
                      {Clothings.PowerGlasses.picks.map((pick, index) => (
                        <div className="pick-item" key={index}>
                          <Link target="_blank" to={pick.link} style={{ color: "#000" }}>{pick.name}</Link>
                        </div>
                      ))}
                    </div>

                    {/* Frame Shapes Section */}
                    <div className="frame-shapes-column">
                      {/* <h3>Kids Shopings</h3> */}
                      {Clothings.PowerGlasses.frameShapes.map((shape, index) => (
                        <div className="frame-shape-item" key={index}>
                          <Link target="_blank" to={shape.link} style={{ color: "#000" }}>{shape.name}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ul>

            </div>
          </div>
        )}

      </div>

      {/* mobile view */}
      <div className='header-bg-mobile'>
        <div className='mobile-view-home'>
          <div className='logo-and-three-line'>
            <IoReorderThreeOutline size={35} />
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logo-container">
                <div className="contact">
                  <button className=""
                    style={{ width: "auto", height: "30px", fontSize: "15px", padding: "5px 8px", border: "none", borderRadius: "2px", fontWeight: "800", background: "#00c2cb", color: "#fff" }}>
                    Matteo Bianchi
                  </button>
                </div>
              </div>
            </Link>
          </div>

          <div className="user-actions">
            <Link className='login-sinup' to="/login"><CgProfile size={25} /></Link>
            <div className="cart-container cart-button">
              <FaShoppingCart className="icon" size={20} />
              <div className="cart-badge"
                onClick={() => {
                  // alert("Cart badge clicked!");
                  setIsCartOpen(true); // Optional: only if you're toggling cart popup
                }}
              >{productCount}</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className='search-home-main'>
            <input
              type="search"
              placeholder="What are you looking for?"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 2000)}
            />
            <FaSearch className="search-icon" onClick={() => onHandleSearch()} size={28} />
          </div>

          {showDropdown && (
            <div className="search-dropdown">
              <div className="search-dropdown-header">Trending Search</div>
              <ul>
                {trendingSearches.map((item, index) => (
                  <li key={index} onMouseDown={() => setQuery(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* cart popup */}
        <div className={`cart-popup ${isCartOpen ? "open" : ""}`}>
          <div className="cart-popup-content">
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
            <h2>Shopping Cart</h2>

            {cartListItems.length > 0 ? (
              <>
                <div className="cart-items">
                  {cartListItems.map((item, index) => (
                    <div key={index} className="cart-item-card">
                      <img className="cart-item-image" src={`${SERVER_API_URL}/${item?.product_thumnail_img}`} alt={item.product_title} />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{item.product_title}</p>
                        <p> ₹{(item.product_price - (item.product_price * item.discount / 100)).toFixed(0)}/-</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className='button-byenow-container'>
                        <button
                          className="buy-now"
                          onClick={() =>
                            handleDirectPayment({
                              item: item,
                              productQuntity: item.quantity,
                              product_price: (item.product_price - (item.product_price * item.discount) / 100).toFixed(0),
                              product_id: item.product_id,
                            })
                          }
                        >
                          Buy Now
                        </button>
                        <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>

              </>
            ) : (
              <p className="empty-cart">Your cart is empty.</p>
            )}
          </div>
        </div>

      </div >
    </>
  );
};

export default Header;
