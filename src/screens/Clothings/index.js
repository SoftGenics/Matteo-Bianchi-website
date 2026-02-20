import React, { useEffect, useState, useContext } from 'react';
import { GlobleInfo } from '../../App';
import { Link } from 'react-router-dom';
import { SERVER_API_URL } from '../../server/server';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import { LuArrowDownUp } from "react-icons/lu";
import wishlist from '../../Assets/images/wishlist.svg'
import wishlist1 from '../../Assets/images/wishlist1.svg'

// import Aviator from '../../Assets/images/Aviator.png'
// import CatsEye from '../../Assets/images/CatsEye.png'
// import Rectangle from '../../Assets/images/Rectangle.png'
// import Round from '../../Assets/images/Round.png'
// import Square from '../../Assets/images/Square.png'
// import Sports from '../../Assets/images/Sports.png'
// import Hexagonal from '../../Assets/images/Hexagonal.png'
// import Oval from '../../Assets/images/Oval.png'

// import Fullrim from '../../Assets/images/Fullrim.svg'
// import Halfrim from '../../Assets/images/Halfrim.svg'
// import Rimless from '../../Assets/images/Rimless.svg'
import "./index.css";

// const frameType = ['Fullrim', 'Halfrim', 'Rimless',];
// const frameShapes = [
//   'Aviator', 'CatsEye', 'Rectangle', 'Round', 'Square', 'Oval'];

// const frameImages = {
//   Aviator,
//   CatsEye,
//   Rectangle,
//   Round,
//   Square,
//   Sports,
//   Hexagonal,
//   Oval,
//   Fullrim,
//   Halfrim,
//   Rimless,
// };

// const genders = ['Men', 'Women', 'Unisex', 'Kids'];
// const frameColors = [
//   { name: "Black" },
//   { name: "Gold" },
//   { name: "Brown" },
//   { name: "Blue" },
//   { name: "Silver" },
//   { name: "Transparent" },
//   { name: "Green" },
//   { name: "Grey" },
//   { name: "Pink" },
//   { name: "Red" },
//   { name: "White" },
//   { name: "Purple" },
//   { name: "Orange" },
// ];
// const lensColors = [
//   { name: "Blue", count: 0 },
//   { name: "Green", count: 0 },
//   { name: "Yellow", count: 0 },
//   { name: "Transparent", count: 0 },
//   { name: "Pink", count: 0 },
//   { name: "Brown", count: 0 },
//   { name: "Grey", count: 0 },
//   { name: "Black", count: 0 },
//   { name: "Red", count: 0 },
//   { name: "Violet", count: 0 },
//   { name: "White", count: 0 },
// ];

const Clothings = () => {
  const [allProducts, setAllProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const { updateCounts } = useContext(GlobleInfo);
  const [hoveredImages, setHoveredImages] = useState({});

  const [selectedFrameShape, setSelectedFrameShape] = useState([]);
  const [selectedFrameType, setSelectedFrameType] = useState([]);
  // const [selectedGender, setSelectedGender] = useState([]);
  // const [selectedColors, setSelectedColors] = useState([]);
  // const [selectedLensColor, setSelectedLensColor] = useState([]);
  // const [selectedFrameColor, setSelectedFrameColor] = useState([]);
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(5000);

  // const [sortOption, setSortOption] = useState('Price: High to Low');
  const [sortOption, setSortOption] = useState('Price: All');
  // const [hoveredColor, setHoveredColor] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
 


  const handleMouseEnter = (productId, hoverImage) => {
    setHoveredImages((prev) => ({
      ...prev,
      [productId]: hoverImage,
    }));
  };

  const handleMouseLeave = (productId, defaultImage) => {
    setHoveredImages((prev) => ({
      ...prev,
      [productId]: defaultImage,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/api/clothing`);
        const products = response.data.data;
        setAllProducts(products);
        console.log("response.data", response.data.data)

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const getColorsForProduct = (same_color_type) => {
    // Filter products that match the same title
    const matchingProducts = allProducts.filter(p => p.same_color_type === same_color_type);

    // Extract frame and lens colors
    const colors = matchingProducts.map(p => ({
      productId: p.product_id,  // ✅ Include product ID
      color: p.color || "#FFFFFF", // Default White if null
    }));

    return colors;
  };

  // Run effect whenever wishlistItems updates
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []); // ✅ Add wishlistItems as dependency

  const toggleWishlist = (product) => {
    setWishlistItems((prevWishlist) => {
      let updatedWishlist = [...prevWishlist];
      const index = updatedWishlist.findIndex(item => item.product_id === product.product_id);

      if (index !== -1) {
        updatedWishlist.splice(index, 1); // Remove if exists
      } else {
        updatedWishlist.push(product); // Add if not exists
      }

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      updateCounts(); // Update count globally
      return updatedWishlist;
    });
    // ✅ Use window.location.reload() to bypass ESLint restriction
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // const handleFrameTypeChange = (framtype) => {
  //   setSelectedFrameType((prev) =>
  //     prev.includes(framtype) ? prev.filter((f) => f !== framtype) : [...prev, framtype]
  //   );
  // };

  // const handleFrameShapeChange = (frame) => {
  //   setSelectedFrameShape((prev) =>
  //     prev.includes(frame) ? prev.filter((f) => f !== frame) : [...prev, frame]
  //   );
  // };

  // const handleGenderChange = (gender) => {
  //   setSelectedGender((prev) =>
  //     prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
  //   );
  // };


  // const handleMinChange = (e) => {
  //   const value = Math.min(Number(e.target.value), maxPrice - 1);
  //   setMinPrice(value);
  // };

  // const handleMaxChange = (e) => {
  //   const value = Math.max(Number(e.target.value), minPrice + 1);
  //   setMaxPrice(value);
  // };

  // const handleSliderChange = (e, type) => {
  //   const value = Number(e.target.value);
  //   if (type === "min") {
  //     setMinPrice(Math.min(value, maxPrice - 1));
  //   } else {
  //     setMaxPrice(Math.max(value, minPrice + 1));
  //   }
  // };



  // const resetFilters = () => {
  //   // setSelectedFrameType([]);
  //   // setSelectedFrameShape([]);
  //   // setSelectedGender([]);
  // };

  // const handleFrameColor = (color) => {
  //   setSelectedFrameColor((prev) =>
  //     prev.includes(color)
  //       ? prev.filter((item) => item !== color) 
  //       : [...prev, color] 
  //   );
  // };

  // // Handle color filter selection
  // const handleLensColor = (color) => {
  //   setSelectedLensColor((prev) =>
  //     prev.includes(color)
  //       ? prev.filter((item) => item !== color)
  //       : [...prev, color] 
  //   );
  // };
  console.log("first1", allProducts)

  return (
    <>
      <Header />
      <div className="product-page">
        <div className="banner" />

        <div className='product-header'>
          <div className="filter-bar">
            <span className="active">
              View Frames:- {[...selectedFrameType, ...selectedFrameShape].join(" / ")}
            </span>

            <div className="sort">
              <LuArrowDownUp style={{ color: "#009688", fontSize: "14px" }} />
              <span className='active' style={{ fontSize: "13px" }}>SORT BY:</span>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option>Price: All item</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          {/* Filter Container */}
          {/* <div className="filter-container">
            <h1 className="filters-title">FILTERS</h1>
            <div className="filter-buttons">
              <button className="apply-btn">Apply</button>
              <button className="reset-btn" onClick={resetFilters}>Reset</button>
            </div>

            <div className="filter-group">
              <h3>GENDER</h3>
              {genders.map((gender) => (
                <label key={gender}>
                  <input
                    type="checkbox"
                    value={gender}
                    onChange={() => handleGenderChange(gender)}
                    checked={selectedGender.includes(gender)}
                  />
                  {gender}
                </label>
              ))}
            </div>

            <h3>Frame Type</h3>
            <div className="frame-container">
              {frameType.map((shape) => (
                <label
                  className={`frame-item ${selectedFrameType.includes(shape) ? 'selected' : ''}`}
                  key={shape}
                  onClick={() => handleFrameTypeChange(shape)}
                >
                  <img
                    className="frame-image-icon"
                    src={frameImages[shape]}
                    alt={shape}
                  />
                  <span className="frame-label">{shape}</span>
                </label>
              ))}
            </div>

            <h3 style={{ marginTop: "10px" }}>Frame Shape</h3>
            <div className="frame-container">
              {frameShapes.map((shape) => (
                <label
                  className={`frame-item ${selectedFrameShape.includes(shape) ? 'selected' : ''}`}
                  key={shape}
                  onClick={() => handleFrameShapeChange(shape)}
                >
                  <img
                    className="frame-image-icon"
                    src={frameImages[shape]}
                    alt={shape}
                  />
                  <span className="frame-label">{shape}</span>
                </label>
              ))}
            </div>

            
            <h3 className="frame-color-title">Frame Color</h3>
            <div className="frame-color-container">
              <div className="frame-color-list">
                {frameColors.map((color, index) => (
                  <label
                    className="frame-color-item"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      value={color.name}
                      onChange={() => handleFrameColor(color.name)}
                      checked={selectedColors.includes(color.name)}
                    />
                    <span
                      style={{
                        backgroundColor: color.name.toLowerCase(),
                      }}
                    ></span>
                   
                    {hoveredColor === color.name && (
                      <span className="tooltip">{color.name}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <h3 className="frame-color-title" style={{ marginTop: "0" }}>Lens Color</h3>
            <div className="frame-color-container">
              <div className="frame-color-list">
                {lensColors.map((color, index) => (
                  <label
                    className="frame-color-item"
                    key={index}
                    onMouseEnter={() => setHoveredColor(color.name)} 
                    onMouseLeave={() => setHoveredColor(null)} 
                  >
                    <input
                      type="checkbox"
                      value={color.name}
                      onChange={() => handleLensColor(color.name)}
                      checked={selectedColors.includes(color.name)}
                    />
                    <span
                      style={{
                        backgroundColor: color.name.toLowerCase(),
                      }}
                    ></span>
                    {hoveredColor === color.name && (
                      <span className="tooltip">{color.name}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            
            <div className="price-slider">
              <h3 className="price-slider-title">Price</h3>
              <div className="price-input-container">
                <div className="price-input">
                  <span>₹</span>
                  <input
                    type="number"
                    value={minPrice}
                    placeholder='500'
                    onChange={handleMinChange}
                    min="0"
                    max={maxPrice - 1}
                  />
                </div>
                <div className="price-input">
                  <span>₹</span>
                  <input
                    type="number"
                    value={maxPrice}
                    placeholder='5000'
                    onChange={handleMaxChange}
                    min={minPrice + 1}
                    max="9999"
                  />
                </div>
              </div>

              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="9999"
                  value={minPrice}
                  onChange={(e) => handleSliderChange(e, "min")}
                  className="slider slider-min"
                />
                <input
                  type="range"
                  min="0"
                  max="9999"
                  value={maxPrice}
                  onChange={(e) => handleSliderChange(e, "max")}
                  className="slider slider-max"
                />
              </div>
            </div>

          </div> */}

          {/* Product Grid Section */}
          <div className="product-grid">
            {allProducts?.map((product, index) => {
              const defaultImage = product.thumbnail_url;
              const hoverImage = product.images?.[2] || defaultImage;
              const imageSrc = hoveredImages[product.product_id] || defaultImage;

              return (
                <div key={index} className="product-card">
                  <div className="red-heart-container">
                    {wishlistItems.some(item => item.product_id === product.product_id) ? (
                      // <BsBagHeartFill className='hert-icon red-background' onClick={() => toggleWishlist(product)} />
                      <img src={wishlist} alt="wishlist" className='wishlist-image' onClick={() => toggleWishlist(product)} />
                    ) : (
                      // <BsBagHeart className='hert-icon' onClick={() => toggleWishlist(product)} />
                      <img src={wishlist1} alt="wishlist" className='wishlist-image' onClick={() => toggleWishlist(product)} />
                    )}
                  </div>
                  <Link to={`/product-item/${product.main_category}/${product.product_id}`}>
                    <img
                      className="carousel-image2"
                      src={`${SERVER_API_URL}/${imageSrc}`}
                      alt={`ImageItem ${product.product_id}`}
                      onMouseEnter={() => handleMouseEnter(product.product_id, hoverImage)}
                      onMouseLeave={() => handleMouseLeave(product.product_id, defaultImage)}
                    />
                  </Link>
                  <div className="product-info">
                    {product.count_in_stock === 0 ? (
                      <h4 className='out-of-stock'>Out of stock</h4>
                    ) : (
                      <h4 className='out-of-stock' style={{ color: "green" }}>In stock</h4>
                    )}
                    <h4 className="product-hilight">{product.product_name}</h4>
                    <strong className="product-title font-styleing" >{product.description.slice(0, 50)}..</strong>
                    <div className="product-discount">
                      <p className="discount-title">₹{product.price}</p>
                      <span className="discount-off">({product.discount_percent}% OFF)<span className='out-of-stock' style={{ color: "#e8a617", textTransform: "uppercase", fontSize: "9px" }}>For {product.gender}</span></span>
                    </div>
                    <p className="product-price1">
                      ₹{(product.price - (product.price * product.discount_percent / 100)).toFixed(0)}/-
                    </p>

                    <div className="button-add-to-cart">
                      <div className="product-attributes">
                        <p className="product-attribute">
                          <strong>Colors:</strong>
                          <div className="color-options">
                            {getColorsForProduct(product.same_color_type).length > 0 ? (
                              getColorsForProduct(product.same_color_type).map((colorObj) => (
                                <Link to={`/product-item/${colorObj.productId}`}>
                                  <span
                                    key={colorObj.productId}  // ✅ Using Product ID as key
                                    className="color-box"
                                    title={`Frame: ${colorObj.color}, Lens: ${colorObj.color}`}
                                    style={{
                                      background: `linear-gradient(to top, ${colorObj.color} 50%, ${colorObj.color} 50%)`,
                                      display: 'inline-block',
                                      width: '30px',
                                      height: '30px',
                                      borderRadius: '15px',
                                      margin: '0 5px',
                                      border: '1px solid #ddd',
                                      cursor: 'pointer'
                                    }}
                                  ></span>
                                </Link>
                              ))
                            ) : (
                              <span>No Colors Available</span>
                            )}
                          </div>
                        </p>
                        <p className="product-attribute">
                          <strong>Material_Type:</strong> {product.frame_material}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Pagination Section */}
        <div className='pagination-main-container'>
          <div className="pagination">
            <button className="prev-btn">
              Prev
            </button>
            <button className="next-btn">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Clothings;