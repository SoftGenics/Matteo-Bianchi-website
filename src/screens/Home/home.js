import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import { SERVER_API_URL } from '../../server/server';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import aviatorVector from '../../Assets/images/goggles/aviator-vector.webp';
import catsEye from '../../Assets/images/goggles/cats-eye.webp';
import rectangleVector from '../../Assets/images/goggles/rectangle-vector.webp';
import roundVector from '../../Assets/images/goggles/round-vector.webp';
import squareVector from '../../Assets/images/goggles/square-vector.webp';
import wayfarerVector from '../../Assets/images/goggles/wayfarer-vector.webp';
// import heliusGlasses from '../../Assets/images/Helius.webp'; // Add your Helius Eyewear image
import pawerGlass from '../../Assets/images/power_glass.png'
import computerGlassMen from '../../Assets/images/computer-glass-men.webp'
import sunglasses from '../../Assets/images/sunglasses-image.webp'
import prescription from '../../Assets/images/prescription-glasses.webp'
import zeroPawer from '../../Assets/images/zero-power-glasses.webp'
// import lykosEyewear from '../../Assets/images/lykos-banner.webp'
import forMenSection from '../../Assets/images/for-men-section.webp'
import forWomenSection from '../../Assets/images/for-women-section.webp'
import forChildSection from '../../Assets/images/for-child-section.webp'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './home.css';

// const glasses = [
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/M/8/M8021BU20V_1_lar.jpg",
//     glass_brand: "Tees By Fastrack ",
//     glass_name: "Premium Blue Aviator Sunglasses For Men And Women with UV Protection",
//     glass_price: "₹1,000",
//     glass_tax: "Inclusive of all taxes"
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/P/5/P513GY5V_1_lar.jpg",
//     glass_brand: "RayShield Signature ",
//     glass_name: "Stylish Grey Rectangle Sunglasses for Men with Polarized Lenses",
//     glass_price: "₹850",
//     glass_tax: "Inclusive of all taxes"
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1508UFP5MRDV_1_lar.jpg",
//     glass_brand: "Urban Eyes Elite ",
//     glass_name: "Matte Red Round Sunglasses with Anti-Glare Coating for All-Day Comfort",
//     glass_price: "₹1,200",
//     glass_tax: "Inclusive of all taxes"
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1510UFA1MBLV_1_lar.jpg",
//     glass_brand: "SunBlaze Luxe ",
//     glass_name: "Blue Mirror Finish Sunglasses for Women with Lightweight Frame",
//     glass_price: "₹999",
//     glass_tax: "Inclusive of all taxes"
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/p/4/p420bk3p_1_lar.jpg",
//     glass_brand: "VisionPro Classic ",
//     glass_name: "Classic Black Wayfarer Sunglasses for Men – Timeless Design",
//     glass_price: "₹950",
//     glass_tax: "Inclusive of all taxes"
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1278WFP6MOLV_1_lar.jpg",
//     glass_brand: "OpticOne Urban ",
//     glass_name: "Olive Green Square Frame Sunglasses with Gradient Lenses",
//     glass_price: "₹1,100",
//     glass_tax: "Inclusive of all taxes"
//   },
//   {
//     src: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1508UFP5MRDV_1_lar.jpg",
//     glass_brand: "ZoomWear Exclusive ",
//     glass_name: "Limited Edition Matte Red Aviator Sunglasses with HD Vision",
//     glass_price: "₹1,050",
//     glass_tax: "Inclusive of all taxes"
//   }
// ];

const Home = () => {
  const [bannerData, setBannerData] = useState([])
  const [brandHeading, setBrandHeading] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newArrivel, setNewArrivel] = useState([]);
  const [slidersData, setSlidersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log("brandHeading1", brandHeading)
  console.log("first product", allProducts)
  console.log("newArrivel", newArrivel)

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/api/carousel/all`);
        console.log("Carousel Data:", response.data);
        setBannerData(response.data)
        // Handle response data (e.g., set state)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // fetchSliders(); // Get Slider
    fetchBannerData(); // Call the async function
    fetchBrandHeading();
  }, []); // Empty dependency array ensures it runs once

  const fetchBrandHeading = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/brand`);
      setBrandHeading(response.data.result);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchAllData = async (retries = 3, delay = 1000) => {
      try {
        // Fetch sliders
        const sliderResponse = await axios.get(`${SERVER_API_URL}/api/slider`);
        if (Array.isArray(sliderResponse.data?.data)) {
          setSlidersData(sliderResponse.data.data);
        }

        // Fetch products
        const productResponse = await axios.get(`${SERVER_API_URL}/product`);
        const products = productResponse.data.result;
        setAllProducts(products);

        // New Arrvel
        const newArrivelData = await axios.get(`${SERVER_API_URL}/new/arrivel/`);
        const newArrivelProduct = newArrivelData.data.result;
        setNewArrivel(newArrivelProduct);

        setIsLoading(false); // ✅ Only after both are fetched

      } catch (error) {
        if (retries > 0) {
          setTimeout(() => fetchAllData(retries - 1, delay), delay);
        } else {
          console.error("Data fetch failed after retries", error);
          setIsLoading(false);
        }
      }
    };

    fetchAllData();
  }, []);


  // Find banners by their `exact_place`
  // const yourPerfectPairBanner = bannerData?.length > 0 ? bannerData.find(b => b.place === "Group_A" && b.exact_place === "left")?.image_url : null;

  // const crystalClearVisionBanner = bannerData?.length > 0 ? bannerData.find(b => b.place === "Group_A" && b.exact_place === "right")?.image_url : null;

  const textBanner = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_2' && b.place === "Group_A" && b.exact_place === "left")?.image_url : null;

  const heliusGlasses = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_1' && b.place === "Group_B" && b.exact_place === "center_poster")?.image_url : null;

  const lykosEyewear = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_3' && b.place === "Group_B" && b.exact_place === "center_poster")?.image_url : null;

  const stayAheadInStyleBanner = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_2' && b.place === "Group_C" && b.exact_place === "center_poster")?.image_url : null;

  const Blinkers = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_3' && b.place === "Group_C" && b.exact_place === "center_poster")?.image_url : null;

  const EyePoppin = bannerData?.length > 0 ? bannerData.find(b => b.section === 'section_4' && b.place === "Group_C" && b.exact_place === "center_poster")?.image_url : null;

  return (
    <>
      <Header />
      <div className='home-bg-container'>
        <div className='home-main-container'>
          {/* top card */}
          <div className='card-container-main'>
            {!isLoading && slidersData.length > 0 ? (
              slidersData.map((data, index) => {
                if (data.slider_name === "top_mini_image") {
                  return (
                    <Link
                      to={`/product-display/${data.slider_link}`}
                      target="_blank"
                    >
                      <div key={index} className="card-container">
                        <div className="card">
                          <img
                            src={`${SERVER_API_URL}/uploads/${data.slider_url}`}
                            alt="Eyeglasses"
                            className="card-image"
                          />
                          <h3 className="card-title">{data.slider_link}</h3>

                          {/* <div className="card-content">
                          <p>Air Light-Weight Powered Lenses</p>
                          <p>Starting from ₹2000</p>
                          <p>Air Light-Weight Powered Lenses</p>
                          <p>Starting from ₹2000</p>
                        </div> */}

                        </div>
                      </div>
                    </Link>
                  );
                } else {
                  return null;
                }
              })
            ) : null}

          </div>

          {/* // slider main */}
          <div className="slider-main-container">
            <div className="slider-navigation">
              <div className="prev-slider-btn">&#8249;</div>
              <div className="next-slider-btn">&#8250;</div>
            </div>

            {!isLoading && slidersData.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1.2}
                centeredSlides={true}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation={{
                  nextEl: ".next-slider-btn",
                  prevEl: ".prev-slider-btn",
                }}
                pagination={{ clickable: true }}
                speed={1300}
                style={{ padding: '0 5%' }}
              >
                {slidersData.map((item, index) =>
                  item.slider_name === 'banner' ? (
                    <SwiperSlide key={index}>
                      <Link
                        to={`/product-display/${item.slider_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${SERVER_API_URL}/uploads/${item.slider_url}`}
                          alt={item.slider_name}
                          style={{
                            width: '100%',
                            borderRadius: '16px',
                            objectFit: 'cover',
                            height: '300px',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                          }}
                        />
                      </Link>
                    </SwiperSlide>
                  ) : null
                )}
              </Swiper>
            ) : (
              <p>Loading...</p>
            )}

          </div>

          <div className="sunglasses-grid">
            {slidersData.map((item, index) =>
              item.slider_name === 'product_image' ? (
                <Link to={`/product-display/${item.slider_link}`}>
                  <div className="sunglasses-card" key={index}>
                    <img
                      src={`${SERVER_API_URL}/uploads/${item.slider_url}`}
                      alt={item.slider_name}
                      className="sunglasses-img"
                    />
                    <div className="sunglasses-overlay">
                      <p className="sunglasses-title">{item.slider_link}</p>
                    </div>
                  </div>
                </Link>
              ) : (null))}
          </div>

          {/* New Arrivel */}
          <div className="glasses-swiper-container" style={{ backgroundImage: 'linear-gradient(180deg, #43cea2 0%, #185a9d 100%)' }}>
            <h2 className="swiper-heading">New Arrivel</h2>

            {isLoading ? (
              <p>Loading...</p>
            ) : newArrivel?.length > 0 ? (
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                className="glasses-swiper"
              >
                {newArrivel
                  .slice(0, 6) // 👈 limit to only 6 items
                  .map((frame) => (
                    <SwiperSlide key={frame.product_id} className="glasses-slide">
                      <Link
                        to={`/product-item/${frame.product_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card"
                      >
                        <div className="glass-icons">
                          {/* <span className="heart-icon">❤️</span> */}
                        </div>
                        <img
                          src={`${SERVER_API_URL}/${frame.product_thumnail_img}`}
                          alt={frame.product_title}
                          className="glass-img"
                        />
                        <h3 className="glass-brand">{frame.product_title}</h3>
                        <p className="glass-name">{frame.highlights}</p>
                        <div className="product-discount-info">
                          <p className="original-price" style={{ color: "#272932", fontSize: "11px", fontWeight: "700" }}>₹{frame.product_price}</p>
                          <span className="discount-percentage" style={{ color: "#272932", fontSize: "12px", fontWeight: "700" }}>
                            ({frame.discount}% OFF)
                            <span className="stock-warning" style={{ color: "#00c2cb" }}>
                              For {frame.gender}
                            </span>
                          </span>
                        </div>
                        <p className="final-price" style={{ color: "#272932", fontSize: "12px", fontWeight: "700" }}>
                          ₹{(frame.product_price - (frame.product_price * frame.discount / 100)).toFixed(0)}/-
                        </p>
                        <p className="glass-tax">Inclusive of all taxes</p>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            ) : (
              <p>No products found</p>
            )}
          </div>

          {/* Glasses Categories Section */}
          <div className="glasses-category-container">
            <div className="category-banner">
              <img src={`${SERVER_API_URL}/uploads/${textBanner}`} className='text-banner' alt={textBanner} />
            </div>

            <div className="categories-grid">
              <div className="category-item">
                <Link to={`/product-display/${"Aviator"}`}><img src={aviatorVector} alt="Aviator" className="category-icon" /></Link>
                <p>Aviator</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Cats Eye"}`}><img src={catsEye} alt="Cats-Eye" className="category-icon" /></Link>
                <p>Cats Eye</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Rectangle"}`}><img src={rectangleVector} alt="Rectangle" className="category-icon" /></Link>
                <p>Rectangle</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Round"}`}><img src={roundVector} alt="Round" className="category-icon" /></Link>
                <p>Round</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Square"}`}><img src={squareVector} alt="Square" className="category-icon" /></Link>
                <p>Square</p>
              </div>
              <div className="category-item">
                <Link to={`/product-display/${"Wayfarer"}`}><img src={wayfarerVector} alt="Wayfarer" className="category-icon" /></Link>
                <p>Oval</p>
              </div>
            </div>
          </div>



          {/* glasses-swiper-container */}
          <div className="glasses-swiper-container">
            <h2 className="swiper-heading">Frequently Bought</h2>

            {isLoading ? (
              <p>Loading...</p>
            ) : allProducts?.length > 0 ? (
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                className="glasses-swiper"
              >
                {allProducts
                  .filter(frame => frame.count_in_stock > 0 && frame.count_in_stock < 7)
                  .slice(0, 6) // 👈 limit to only 6 items
                  .map((frame) => (
                    <SwiperSlide key={frame.product_id} className="glasses-slide">
                      <Link
                        to={`/product-item/${frame.product_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card"
                      >
                        <div className="glass-icons">
                          {/* <span className="heart-icon">❤️</span> */}
                        </div>
                        <img
                          src={`${SERVER_API_URL}/${frame.product_thumnail_img}`}
                          alt={frame.product_title}
                          className="glass-img"
                        />
                        <h3 className="glass-brand">{frame.product_title}</h3>
                        <p className="glass-name">{frame.highlights}</p>
                        <div className="product-discount-info">
                          <p className="original-price" style={{ color: "#272932", fontSize: "11px", fontWeight: "700" }}>₹{frame.product_price}</p>
                          <span className="discount-percentage" style={{ color: "#272932", fontSize: "12px", fontWeight: "700" }}>
                            ({frame.discount}% OFF)
                            <span className="stock-warning" style={{ color: "#00c2cb" }}>
                              For {frame.gender}
                            </span>
                          </span>
                        </div>
                        <p className="final-price" style={{ color: "#272932", fontSize: "12px", fontWeight: "700" }}>
                          ₹{(frame.product_price - (frame.product_price * frame.discount / 100)).toFixed(0)}/-
                        </p>
                        <p className="glass-tax">Inclusive of all taxes</p>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            ) : (
              <p>No products found</p>
            )}
          </div>


          {/* Top Banners */}
          {/* <Link to="#">
            <div className='your-perfect-pair'>
              <div className='yourPerfectPairBanner-container'>
                {yourPerfectPairBanner && (
                  <img
                    src={`${SERVER_API_URL}/uploads/${yourPerfectPairBanner}`} // Ensure correct URL
                    className="yourPerfectPairBanner"
                    alt="Your Perfect Pair Banner"
                  />
                )}
              </div>

              <div className='crystalClearVisionBanner-container'>
                {crystalClearVisionBanner && (
                  <img
                    src={`${SERVER_API_URL}/uploads/${crystalClearVisionBanner}`} // Ensure correct URL
                    className="crystalClearVisionBanner"
                    alt="Crystal Clear Vision Banner"
                  />
                )}
              </div>
            </div>
          </Link> */}



          {/* Helius Eyewear Section Group C*/}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_1")
                .map((heading, index) => (
                  <h2 key={index} className="Helius-Eyewear">{heading.brand_name}</h2>
                ))}
              <hr className="hr-line" />
            </div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={`/product-item/${41}`}>
              <img src={`${SERVER_API_URL}/uploads/${heliusGlasses}`} alt="Helius Glasses" className="helius-glasses-image" />
            </Link>
          </div>


          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Sunglass</h1>
              <hr className='hr-line' />
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/HeliusGlasses`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/HeliusGlasses`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Group D */}
          <div className='eyeglasses-container'>
            {brandHeading
              .filter((heading) => heading.section === "section_2")
              .map((heading, index) => (
                <h2 key={index} className='eyeglasses-title'>{heading.brand_name}</h2>
              ))}
            <hr className='hr-line' />
            <div className='eyeglasses-grid'>

              {/* Computer Glasses*/}
              <Link to={`/product-display/Computer Glass Men`}
                target="_blank"
                rel="noopener noreferrer"
                className='eyeglasses-card'
                style={{ backgroundImage: `url(${computerGlassMen})` }}
              >
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Computer Glasses</h2>
                  <p className='eyeglasses-card-description'>Protect Your Eyes - Blue Light Filtering</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </Link>

              {/* Sunglasses */}
              <Link to={`/product-display/Computer Glass Men`}
                target="_blank"
                rel="noopener noreferrer"
                className='eyeglasses-card' style={{ backgroundImage: `url(${sunglasses})` }}
              >
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Sunglasses</h2>
                  <p className='eyeglasses-card-description'>Stay Stylish - 100% UV Protection</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </Link>

              {/* Prescription Glasses */}
              <Link to={`/product-display/Computer Glass Men`}
                className='eyeglasses-card'
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundImage: `url(${prescription})` }}
              >
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Prescription</h2>
                  <p className='eyeglasses-card-description'>Perfect Clarity - Tailored to Your Needs</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </Link>

              {/* Zero Power Glasses */}
              <Link to={`/product-display/Computer Glass Men`}
                className='eyeglasses-card'
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundImage: `url(${zeroPawer})` }}
              >
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Zero Power Glasses</h2>
                  <p className='eyeglasses-card-description'>Style without Prescription</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </Link>

            </div>
          </div>

          {/* Helius Eyewear Section  Group E*/}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_3")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to={`/product-item/${42}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${SERVER_API_URL}/uploads/${lykosEyewear}`} alt="Helius Glasses" className="helius-glasses-image" />
            </Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Sunglass</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Lykos Eyewear`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Lykos Eyewear`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Card Group F */}
          <div className='eyeglasses-container'>
            {brandHeading
              .filter((heading) => heading.section === "section_4")
              .map((heading, index) => (
                <h2 key={index} className='eyeglasses-title'>{heading.brand_name}</h2>
              ))}
            <hr className='hr-line' />
            <div className='eyeglasses-grid eyeglasses-grid1'>

              {/* Computer Glasses */}
              <Link to={`/product-display/Computer Glasses`}
                target="_blank"
                rel="noopener noreferrer"
                className='eyeglasses-card eyeglasses-card1'
                style={{ backgroundImage: `url(${forMenSection})` }}
              >
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Computer Glasses</h2>
                  <p className='eyeglasses-card-description'>Protect Your Eyes - Blue Light Filtering</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </Link>

              {/* Sunglasses */}
              <Link to={`/product-display/Sunglasses`}
                target="_blank"
                rel="noopener noreferrer"
                className='eyeglasses-card eyeglasses-card1'
                style={{ backgroundImage: `url(${forWomenSection})` }}
              >
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Sunglasses</h2>
                  <p className='eyeglasses-card-description'>Stay Stylish - 100% UV Protection</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </Link>

              {/* Prescription Glasses */}
              <Link to={`/product-display/Computer Glasses`}
                target="_blank"
                rel="noopener noreferrer"
                className='eyeglasses-card eyeglasses-card1'
                style={{ backgroundImage: `url(${forChildSection})` }}
              >
                <div className='eyeglasses-info'>
                  <h2 className='eyeglasses-card-title'>Prescription</h2>
                  <p className='eyeglasses-card-description'>Perfect Clarity - Tailored to Your Needs</p>
                </div>
                <div className='eyeglasses-arrow'>&#8250;</div>
              </Link>

            </div>
          </div>

          {/* Lykos Eyewear Section Group G */}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_5")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to={`/product-item/${43}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${SERVER_API_URL}/uploads/${stayAheadInStyleBanner}`} alt="Helius Glasses" className="helius-glasses-image" />
            </Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Premium Sunglasses</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Sunglass Black FullRim Rectangle`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Sunglass Black FullRim Rectangle`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blinkers Eyeglasses Section Group H*/}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_6")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to={`/product-item/${44}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${SERVER_API_URL}/uploads/${Blinkers}`} alt="Helius Glasses" className="helius-glasses-image" />
            </Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Sunglass</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Sunglass Black FullRim Rectangle`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Sunglass Black FullRim Rectangle`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EyePoppin Eyeglasses Section Group I*/}
          <div className='single-banner-container'>
            <div className="helius-text">
              {brandHeading
                .filter((heading) => heading.section === "section_7")
                .map((heading, index) => (
                  <h2 key={index} className='Helius-Eyewear'>{heading.brand_name}</h2>
                ))}
              <hr className='hr-line' />
            </div>
            <Link to={`/product-item/${45}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${SERVER_API_URL}/uploads/${EyePoppin}`} alt="Helius Glasses" className="helius-glasses-image" />
            </Link>
          </div>

          {/* Eyeglasses-container */}
          <div className='Eyeglasses-container'>
            <div className='Eyeglasses-container-main'>
              <h1 className='Eyeglasses-text'>Sunglass</h1>
              <div className='Eyeglasses-home'>

                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Sunglass Black FullRim Rectangle`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details</h2>
                  </div>
                </div>
                <div className='pawerGlass-container'>
                  <Link to={`/product-display/Sunglass Black FullRim Rectangle`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pawerGlass} className='pawerGlass' />
                  </Link>
                  <div className='pawerglass-text-container'>
                    <p className='Power-Glasses-text'>Sunglass Glasses</p>
                    <h1 className='Rim-Rectangle-text'>Black Full Rim Rectangle</h1>
                    <h2 className='More-Details-text'>More Details </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
