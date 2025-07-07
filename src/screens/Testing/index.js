import React, { useEffect, useState, useContext } from 'react';
import { GlobleInfo } from '../../App';
import { Link } from 'react-router-dom';
import { SERVER_API_URL } from '../../server/server';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import Testing2 from '../../screens/Testing2'
import tdesign from '../../Assets/images/tdesign_cart.png';

import Aviator from '../../Assets/images/Aviator.png'
import CatsEye from '../../Assets/images/CatsEye.png'
import Rectangle from '../../Assets/images/Rectangle.png'
import Round from '../../Assets/images/Round.png'
import Square from '../../Assets/images/Square.png'
import Sports from '../../Assets/images/Sports.png'
import Hexagonal from '../../Assets/images/Hexagonal.png'
import Oval from '../../Assets/images/Oval.png'

import Fullrim from '../../Assets/images/Fullrim.svg'
import Halfrim from '../../Assets/images/Halfrim.svg'
import Rimless from '../../Assets/images/Rimless.svg'

import "./index.css";

const frameType = ['Fullrim', 'Halfrim', 'Rimless',];
const frameShapes = [
  'Aviator', 'CatsEye', 'Rectangle', 'Round', 'Square', 'Oval'];
// Mapping frame shapes to their respective imported images
const frameImages = {
  Aviator,
  CatsEye,
  Rectangle,
  Round,
  Square,
  Sports,
  Hexagonal,
  Oval,
  Fullrim,
  Halfrim,
  Rimless,
};

const genders = ['For Men', 'For Women', 'Unisex', 'For Kids'];
const frameColors = [
  { name: "Black" },
  { name: "Gold" },
  { name: "Brown" },
  { name: "Blue" },
  { name: "Silver" },
  { name: "Transparent" },
  { name: "Green" },
  { name: "Grey" },
  { name: "Pink" },
  { name: "Red" },
  { name: "White" },
  { name: "Purple" },
  { name: "Orange" },
];
const lensColors = [
  { name: "Blue", count: 0 },
  { name: "Green", count: 0 },
  { name: "Yellow", count: 0 },
  { name: "Transparent", count: 0 },
  { name: "Pink", count: 0 },
  { name: "Brown", count: 0 },
  { name: "Grey", count: 0 },
  { name: "Black", count: 0 },
  { name: "Red", count: 0 },
  { name: "Violet", count: 0 },
  { name: "White", count: 0 },
];


const ProductDisplay = () => {
  const { category } = useParams();
  const { getProductCount } = useContext(GlobleInfo);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('Both');
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [selectedFrameShape, setSelectedFrameShape] = useState([]);
  const [selectedFrameType, setSelectedFrameType] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // console.log("category_test", category)

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/product`);
        const products = response.data.result;
        setAllProducts(products);

        // Apply initial filter based on category (useParams)
        const initialFiltered = filterByCategory(products, category);
        setFilteredProducts(initialFiltered);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [category]);

  // Filter products by lens_type or frem_type
  const filterByCategory = (products, category) => {
    if (!category || category.toLowerCase() === 'both') return products;

    const filtered = products.filter(
      (product) =>
        (product.frame_shape && product.frame_shape.toLowerCase() === category.toLowerCase()) ||
        (product.frem_type && product.frem_type.toLowerCase() === category.toLowerCase())
    );
    // console.log("filtered", filtered)
    return filtered.length > 0 ? filtered : products;
  };



  // Filter products whenever any filter criteria changes
  useEffect(() => {
    const filterProducts = () => {
      let filtered = filterByCategory(allProducts, category);

      if (selectedFrameType.length > 0) {
        console.log("Filtering by frame type...");
        filtered = filtered.filter((product) => {
          // Check if `frem_type` exists and is a string
          if (product.frem_type && typeof product.frem_type === "string") {
            const trimmedProductType = product.frem_type.replace(/\s+/g, "").toLowerCase(); // Remove all spaces and convert to lowercase
            const trimmedSelectedTypes = selectedFrameType.map((frame) =>
              frame.replace(/\s+/g, "").toLowerCase() // Remove all spaces and convert to lowercase
            );
            return trimmedSelectedTypes.includes(trimmedProductType);
          }
          return false; // Exclude products with null or invalid `frem_type`
        });
      }

      if (selectedFrameShape.length > 0) {
        console.log("Filtering by frame shape...");
        filtered = filtered.filter((product) => {
          // Check if `frame_shape` exists and is a string
          if (product.frame_shape && typeof product.frame_shape === "string") {
            const trimmedProductShape = product.frame_shape.replace(/\s+/g, "").toLowerCase(); // Remove all spaces and convert to lowercase
            const trimmedSelectedShapes = selectedFrameShape.map((frame) =>
              frame.replace(/\s+/g, "").toLowerCase() // Remove all spaces and convert to lowercase
            );
            return trimmedSelectedShapes.includes(trimmedProductShape);
          }
          return false; // Exclude products with null or invalid `frame_shape`
        });
      }
      // if (selectedFrameShape.length > 0) {
      //   filtered = filtered.filter(
      //     (product) => product.frem_type && selectedFrameShape.map((frame) => frame.toLowerCase()).includes(product.frame_shape.trim().toLowerCase())
      //   );
      // }

      if (selectedGender.length > 0) {
        filtered = filtered.filter((product) => {
          if (product.gender && typeof product.gender === "string") {
            const trimmedProductGender = product.gender.trim().toLowerCase(); // Trim spaces and convert to lowercase
            const trimmedSelectedGenders = selectedGender.map((gender) =>
              gender.trim().toLowerCase() // Trim spaces and convert to lowercase
            );
            return trimmedSelectedGenders.includes(trimmedProductGender);
          }
          return false; // Exclude products with null or invalid `gender`
        });
      }      

      // If no products match after filtering, return all products
      setFilteredProducts(filtered.length > 0 ? filtered : allProducts);
      setCurrentPage(1); // Reset to the first page when filters change
    };

    filterProducts();
  }, [selectedCategory, selectedVendor, selectedFrameType, selectedFrameShape, selectedGender, allProducts, category]);

  const addToCart = (item) => {
    // Get existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const itemIndex = existingCartItems.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex !== -1) {
      // If the item exists, ensure quantity is a number and increase it
      existingCartItems[itemIndex].quantity = Number(existingCartItems[itemIndex].quantity) || 1;
      existingCartItems[itemIndex].quantity += 1;
    } else {
      // If the item doesn't exist, add it with an initial quantity of 1
      item.quantity = 1;
      existingCartItems.push(item);
    }

    // Update local storage with the modified cart
    localStorage.setItem('cart', JSON.stringify(existingCartItems));

    // Get the count of unique items in the cart
    const uniqueItemCount = existingCartItems.length;

    alert(`${item.product_title} added to cart successfully!`);

    // Update product count in the global state
    getProductCount(uniqueItemCount);
  };

  const handleFrameTypeChange = (framtype) => {
    setSelectedFrameType((prev) =>
      prev.includes(framtype) ? prev.filter((f) => f !== framtype) : [...prev, framtype]
    );
  };

  const handleFrameShapeChange = (frame) => {
    setSelectedFrameShape((prev) =>
      prev.includes(frame) ? prev.filter((f) => f !== frame) : [...prev, frame]
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGender((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  // Handle color filter selection
  const handleColorFilter = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color) // Remove if already selected
        : [...prev, color] // Add if not selected
    );
  };

  const resetFilters = () => {
    setSelectedCategory('Both');
    setSelectedVendor('All');
    setSelectedFrameType([]);
    setSelectedFrameShape([]);
    setSelectedGender([]);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Header />
      <div className="product-page">
        <div className="banner" />

        <div className="content-wrapper">
          {/* Filter Container */}
          <div className="filter-container">
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
                    // src={`../../Assets/images/${shape}.png`}
                    src={frameImages[shape]}
                    alt={shape}
                  />
                  <span className="frame-label">{shape}</span>
                </label>
              ))}
            </div>

            {/* Add Filter Section Below */}
            <h3 className="frame-color-title">Frame Color</h3>
            <div className="frame-color-container">
              <div className="frame-color-list">
                {frameColors.map((color, index) => (
                  <label
                    className="frame-color-item"
                    key={index}
                    onMouseEnter={() => setHoveredColor(color.name)} // Show tooltip on hover
                    onMouseLeave={() => setHoveredColor(null)} // Hide tooltip when not hovering
                  >
                    <input
                      type="checkbox"
                      value={color.name}
                      onChange={() => handleColorFilter(color.name)}
                      checked={selectedColors.includes(color.name)}
                    />
                    <span
                      style={{
                        backgroundColor: color.name.toLowerCase(),
                      }}
                    ></span>
                    {/* Tooltip */}
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
                    onMouseEnter={() => setHoveredColor(color.name)} // Show tooltip on hover
                    onMouseLeave={() => setHoveredColor(null)} // Hide tooltip when not hovering
                  >
                    <input
                      type="checkbox"
                      value={color.name}
                      onChange={() => handleColorFilter(color.name)}
                      checked={selectedColors.includes(color.name)}
                    />
                    <span
                      style={{
                        backgroundColor: color.name.toLowerCase(),
                      }}
                    ></span>
                    {/* Tooltip */}
                    {hoveredColor === color.name && (
                      <span className="tooltip">{color.name}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <Testing2 />

          </div>

          {/* Product Grid Section */}
          <div className="product-grid">
            {
              currentProducts.map((product, index) => {
                let colors = [];
                // Safely parse the color field and ensure it's an array
                try {
                  const parsedColor = product.color ? JSON.parse(product.color) : [];
                  colors = Array.isArray(parsedColor) ? parsedColor : [];
                } catch (error) {
                  console.error(`Failed to parse color for product ID ${product.product_id}:`, error);
                  colors = []; // Default to an empty array if parsing fails
                }

                return (
                  <div key={index} className="product-card">
                    <Link to={`/product-item/${product.product_id}`}>
                      <img className="carousel-image2" src={`${SERVER_API_URL}/${product?.product_thumnail_img}`} alt={`ImageItem ${product.product_id + 1}`} />
                    </Link>
                    <div className="product-info">
                      {product.count_in_stock === 0 && (
                        <h4 className='out-of-stock'>Out of stock</h4>
                      )}
                      <h4 className="product-hilight">{product.product_title}</h4>
                      <h4 className="product-title">{product.highlights}</h4>
                      <p className="product-price">₹{(product.product_price - (product.product_price * product.discount / 100)).toFixed(0)}/-</p>
                      <div className="button-add-to-cart">
                        <div className="product-attributes">
                          <p className="product-attribute">
                            <strong>Color:</strong>
                            <div className="color-options">
                              {
                                colors.length > 0 ? (
                                  colors.map((colorObj, colorIndex) => {
                                    const [colorName, colorCode] = Object.entries(colorObj)[0]; // Extract color name and code
                                    return (
                                      <span
                                        key={colorIndex}
                                        className="color-box"
                                        title={colorName}
                                        style={{
                                          backgroundColor: colorCode,
                                          display: 'inline-block',
                                          width: '30px',
                                          height: '16px',
                                          borderRadius: '5px',
                                          margin: '0 5px',
                                          border: '1px solid #ddd',
                                          cursor: 'pointer'
                                        }}
                                      ></span>
                                    );
                                  })
                                ) : (
                                  <span>No Colors Available</span>
                                )
                              }
                            </div>
                          </p>
                          <p className="product-attribute">
                            <strong>Material:</strong> {product.material}
                          </p>
                        </div>
                        <button className="cart-btn" onClick={() => addToCart(product)}>
                          <img src={tdesign} alt="tdesign" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

        {/* Pagination Section */}
        <div className='pagination-main-container'>
          <div className="pagination">
            <button className="prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <button className="next-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;

