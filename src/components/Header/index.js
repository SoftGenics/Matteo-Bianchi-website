import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { SERVER_API_URL } from '../../server/server';
import { GlobleInfo } from '../../App';
import axios from "axios";
import { BsBagHeart, BsBagHeartFill } from "react-icons/bs";
// import { CiHeart } from "react-icons/ci";
import { FaHeart, FaShoppingCart, FaPhone } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
// import { IoBagOutline } from "react-icons/io5";
import { ImFire } from "react-icons/im";
import dceyewrLogo from '../../Assets/images/dceyewr-logo-no-text.png';
import men_pic from '../../Assets/images/men_pic.webp'
import women_pic from '../../Assets/images/women_pic.webp'
import kid_pic from '../../Assets/images/kid_pic.webp'
import wishlist from '../../Assets/images/wishlist.svg'
import { FaRegHeart } from "react-icons/fa";

import './index.css';

const Sunglasses = {
  PowerGlasses: {
    category: {
      Men: [
        'Daily Wear Lenses - Starting from ₹900',
        'Monthly Disposable Lenses - Starting from ₹1100',
      ],
      Women: [
        'Premium Color Lenses - Starting from ₹1500',
        'Moisture-Rich Lenses - Starting from ₹1300',
      ],
      Kids: [
        'Vibrant Blue - Starting from ₹950',
        'Soft Daily Lenses - Starting from ₹700',
      ],
    },

    brands: [
      'FreshLook',
      'Air Optix',
      'Dailies',
      'Biofinity',
    ],

    picks: [
      'Best for Sensitive Eyes',
      'Extended Wear Lenses',
      'Blue Light Blocking Lenses',
    ],

    frameShapes: [
      'Toric Lenses',
      'Multifocal Lenses',
      'Scleral Contact Lenses',
    ],

    collections: [
      'Comfort Max Series',
      'Vision Ultra Pro',
      'Fashion Color Lenses',
      'Hydration Plus Essentials',
    ],
  },
};


const contactLenses = {
  PowerGlasses: {
    category: {
      Men: [
        'Soft Contact Lenses - Starting from ₹800',
        'Disposable Daily Lenses - Starting from ₹1000',
      ],
      Women: [
        'Hydrogel Lenses - Starting from ₹1200',
      ],
      Kids: [
        'Natural Brown - Starting from ₹900',
      ],
    },

    brands: [
      'Acuvue',
      'Bausch + Lomb',
      'Alcon',
      'CooperVision',
    ],

    picks: [
      'Best for Dry Eyes',
      'Long-Lasting Comfort',
      'UV Protection Lenses',
    ],

    frameShapes: [
      'Soft Lenses',
      'Rigid Gas Permeable (RGP) Lenses',
      'Hybrid Contact Lenses',
    ],

    collections: [
      'BioComfort Series',
      'Vision Clarity Pro',
      'Style Enhancer Lenses',
      'All-Day Wear Essentials',
    ],
  },
};

const kidsGlasses = {
  PowerGlasses: {
    category: {
      Men: [
        'Sporty Frames - Starting from ₹1800',
      ],
      Women: [
        'Rose Gold Frames - Starting from ₹3000',
      ],
      Kids: [
        'Cartoon-Themed Glasses - Starting from ₹800',
        'Lightweight Flexible Frames - Starting from ₹1200',
      ],
    },

    brands: [
      'Prada Eyewear',
      'Versace Frames',
      'Coach Vision',
      'Lenskart Air',
    ],

    picks: [
      'Limited Edition Styles',
      'Ultra-Light Frames',
      'Anti-Glare Eyeglasses',
    ],

    frameShapes: [
      'Geometric Frames',
      'Retro Oval Frames',
      'Angular Sharp Frames',
      'Wraparound Frames',
      'Wide Rim Frames',
    ],

    collections: [
      'Artisan Craft',
      'Bold and Beautiful',
      'Retro Revival',
      'Urban Streetwear',
      'Elegant Edge',
    ],
  },
};

const screenSaver = {
  PowerGlasses: {
    category: {
      Men: ['Classic Spectacles - Starting from ₹2000'],
      Women: ['Premium Spectacles - Starting from ₹3500', 'Fashion Spectacles - Starting from ₹2500'],

    },
    brands: ['Ray-Ban', 'Tom Ford', 'Oakley', 'Burberry'],
    picks: ['Trending Styles', 'Top Picks', 'Multifocal Spectacles'],
    frameShapes: [
      'Rectangular Frames',
      'Rounded Frames',
      'Squared Frames',
      'Aviator-Style Frames',
      'Cat-Eye Frames',
    ],
    collections: [
      'Luxury Edition',
      'Bohemian',
      'Elegance',
      'Modern Metals',
      'Crystal Charm',
    ],
  },
};

const categories = {
  PowerGlasses: {
    // category: [
    //   { title: 'Classic Eyeglasses', price: 'Starting from ₹2000' },
    //   { title: 'Premium Eyeglasses', price: 'Starting from ₹3500' },
    // ],
    // category: {
    //   Men: ['Classic Eyeglasses - Starting from ₹2000'],
    //   Women: ['Premium Eyeglasses - Starting from ₹3500'],
    //   Kids: ['Screen Eyeglasses - Starting from ₹500'],
    // },
    category: {
      Men: ['Classic Eyeglasses - Starting from ₹2000', 'Premium Eyeglasses - Starting from ₹3500'],
      Women: ['Premium Eyeglasses - Starting from ₹3500', 'Fashionable Eyeglasses - Starting from ₹2500'],
      Kids: ['Screen Eyeglasses - Starting from ₹500', 'Durable Eyeglasses - Starting from ₹1500'],
    },

    brands: ['John Jacobs', 'New Balance', 'Fossil', 'Le Petit Lunetier'],
    picks: ['New Arrivals', 'Best Seller', 'Progressive Eyeglasses'],
    frameShapes: [
      'Rectangle Frames',
      'Round Frames',
      'Square Frames',
      'Aviator Frames',
      'Cat-Eye Frames',
    ],
    collections: [
      'Masaba',
      'Rhapsody',
      'Sobhita',
      'Pro Titanium',
      'Gilded Jewels',
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
  const { productCount, wishlistCount } = useContext(GlobleInfo)
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


  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cartListItems.filter((item) => item.product_id !== id);
    setCartlistItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
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
    <div className='header-bg-container'>
      <nav className="navbar">
        <div className="navbar-top">
          {/* Logo & Contact */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo-container">
              <img src={dceyewrLogo} alt="Lenskart" className="logo" />
              <div className="contact">
                {/* <span className='eyezone-text'>Eyezones</span> */}
                <button className="btn-tryon" style={{ padding: "5px 8px", border: "none", borderRadius: "2px", fontWeight: "900" }}>EYE ZONES</button>
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
            <span onClick={() => setIsWishlistOpen(true)}>Wishlist</span>

            <div className="cart-container">
              <FaShoppingCart className="icon" size={20} />
              <div className="cart-badge">{productCount}</div>
            </div>
            <span onClick={() => setIsCartOpen(true)}>Cart</span>
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

          {/* Action Buttons */}
          <div className="navbar-buttons">
            <button className="btn-tryon1"> 3D TRY ON</button>
            <button className="btn-blu">BLU</button>
            <button className="btn-gold" onClick={() => openFaq()}>GOLD MAX</button>
          </div>
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
                  <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>🗑</button>
                </div>
              ))}
            </div>
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
            <ul>
              {popupContent === 'Power Glasses' && (
                <div className="power-glasses-container">
                  {/* Select Category Section */}
                  <div className="category-column">
                    <h3>Category</h3>
                    {Object.entries(categories.PowerGlasses.category).map(([heading, items], index) => (
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
                        <div className='cetogory-group-item'>
                          {items.map((item, idx) => (
                            <div className="category-item1" key={idx}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Brands Section */}
                  <div className="brands-column">
                    <h3>Brands</h3>
                    {categories.PowerGlasses.brands.map((brand, index) => (
                      <div className="brand-item" key={index}>
                        {brand}
                      </div>
                    ))}
                  </div>

                  {/* Our Top Picks Section */}
                  <div className="top-picks-column">
                    <h3>Our Top Picks</h3>
                    {categories.PowerGlasses.picks.map((pick, index) => (
                      <div className="pick-item" key={index}>
                        {pick}
                      </div>
                    ))}
                  </div>

                  {/* Frame Shapes Section */}
                  <div className="frame-shapes-column">
                    <h3>Frame Shape</h3>
                    {categories.PowerGlasses.frameShapes.map((shape, index) => (
                      <div className="frame-shape-item" key={index}>
                        {shape}
                      </div>
                    ))}
                  </div>

                  {/* Collection Section */}
                  <div className="collection-column">
                    <h3>Collection</h3>
                    {categories.PowerGlasses.collections.map((collection, index) => (
                      <div className="collection-item" key={index}>
                        {collection}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {popupContent === 'Screen Saver' && (
                <div className="power-glasses-container">
                  {/* Select Category Section */}
                  <div className="category-column">
                    <h3>Category</h3>
                    {Object.entries(screenSaver.PowerGlasses.category).map(([heading, items], index) => (
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
                        <div className='cetogory-group-item'>
                          {items.map((item, idx) => (
                            <div className="category-item1" key={idx}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Brands Section */}
                  <div className="brands-column">
                    <h3>Brands</h3>
                    {screenSaver.PowerGlasses.brands.map((brand, index) => (
                      <div className="brand-item" key={index}>
                        {brand}
                      </div>
                    ))}
                  </div>

                  {/* Our Top Picks Section */}
                  <div className="top-picks-column">
                    <h3>Our Top Picks</h3>
                    {screenSaver.PowerGlasses.picks.map((pick, index) => (
                      <div className="pick-item" key={index}>
                        {pick}
                      </div>
                    ))}
                  </div>

                  {/* Frame Shapes Section */}
                  <div className="frame-shapes-column">
                    <h3>Frame Shape</h3>
                    {screenSaver.PowerGlasses.frameShapes.map((shape, index) => (
                      <div className="frame-shape-item" key={index}>
                        {shape}
                      </div>
                    ))}
                  </div>

                  {/* Collection Section */}
                  <div className="collection-column">
                    <h3>Collection</h3>
                    {screenSaver.PowerGlasses.collections.map((collection, index) => (
                      <div className="collection-item" key={index}>
                        {collection}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {popupContent === 'Kids Glasses' && (
                <div className="power-glasses-container">
                  {/* Select Category Section */}
                  <div className="category-column">
                    <h3> Category</h3>
                    {Object.entries(kidsGlasses.PowerGlasses.category).map(([heading, items], index) => (
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
                        <div className='cetogory-group-item'>
                          {items.map((item, idx) => (
                            <div className="category-item1" key={idx}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Brands Section */}
                  <div className="brands-column">
                    <h3>Brands</h3>
                    {kidsGlasses.PowerGlasses.brands.map((brand, index) => (
                      <div className="brand-item" key={index}>
                        {brand}
                      </div>
                    ))}
                  </div>

                  {/* Our Top Picks Section */}
                  <div className="top-picks-column">
                    <h3>Our Top Picks</h3>
                    {categories.PowerGlasses.picks.map((pick, index) => (
                      <div className="pick-item" key={index}>
                        {pick}
                      </div>
                    ))}
                  </div>

                  {/* Frame Shapes Section */}
                  <div className="frame-shapes-column">
                    <h3>Frame Shape</h3>
                    {kidsGlasses.PowerGlasses.frameShapes.map((shape, index) => (
                      <div className="frame-shape-item" key={index}>
                        {shape}
                      </div>
                    ))}
                  </div>

                  {/* Collection Section */}
                  <div className="collection-column">
                    <h3>Collection</h3>
                    {kidsGlasses.PowerGlasses.collections.map((collection, index) => (
                      <div className="collection-item" key={index}>
                        {collection}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {popupContent === 'Contact Lenses' && (
                <div className="power-glasses-container">
                  {/* Select Category Section */}
                  <div className="category-column">
                    <h3>Category</h3>
                    {Object.entries(contactLenses.PowerGlasses.category).map(([heading, items], index) => (
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
                        <div className='cetogory-group-item'>
                          {items.map((item, idx) => (
                            <div className="category-item1" key={idx}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Brands Section */}
                  <div className="brands-column">
                    <h3>Brands</h3>
                    {contactLenses.PowerGlasses.brands.map((brand, index) => (
                      <div className="brand-item" key={index}>
                        {brand}
                      </div>
                    ))}
                  </div>

                  {/* Our Top Picks Section */}
                  <div className="top-picks-column">
                    <h3>Our Top Picks</h3>
                    {contactLenses.PowerGlasses.picks.map((pick, index) => (
                      <div className="pick-item" key={index}>
                        {pick}
                      </div>
                    ))}
                  </div>

                  {/* Frame Shapes Section */}
                  <div className="frame-shapes-column">
                    <h3>Frame Shape</h3>
                    {contactLenses.PowerGlasses.frameShapes.map((shape, index) => (
                      <div className="frame-shape-item" key={index}>
                        {shape}
                      </div>
                    ))}
                  </div>

                  {/* Collection Section */}
                  <div className="collection-column">
                    <h3>Collection</h3>
                    {contactLenses.PowerGlasses.collections.map((collection, index) => (
                      <div className="collection-item" key={index}>
                        {collection}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {popupContent === 'Sunglasses' && (
                <div className="power-glasses-container">
                  {/* Select Category Section */}
                  <div className="category-column">
                    <h3>Category</h3>
                    {Object.entries(Sunglasses.PowerGlasses.category).map(([heading, items], index) => (
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
                        <div className='cetogory-group-item'>
                          {items.map((item, idx) => (
                            <div className="category-item1" key={idx}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Brands Section */}
                  <div className="brands-column">
                    <h3>Brands</h3>
                    {Sunglasses.PowerGlasses.brands.map((brand, index) => (
                      <div className="brand-item" key={index}>
                        {brand}
                      </div>
                    ))}
                  </div>

                  {/* Our Top Picks Section */}
                  <div className="top-picks-column">
                    <h3>Our Top Picks</h3>
                    {Sunglasses.PowerGlasses.picks.map((pick, index) => (
                      <div className="pick-item" key={index}>
                        {pick}
                      </div>
                    ))}
                  </div>

                  {/* Frame Shapes Section */}
                  <div className="frame-shapes-column">
                    <h3>Frame Shape</h3>
                    {Sunglasses.PowerGlasses.frameShapes.map((shape, index) => (
                      <div className="frame-shape-item" key={index}>
                        {shape}
                      </div>
                    ))}
                  </div>

                  {/* Collection Section */}
                  <div className="collection-column">
                    <h3>Collection</h3>
                    {Sunglasses.PowerGlasses.collections.map((collection, index) => (
                      <div className="collection-item" key={index}>
                        {collection}
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
  );
};

export default Header;
