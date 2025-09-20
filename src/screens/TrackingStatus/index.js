import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { SERVER_API_URL } from '../../server/server'
import { ColorRing } from 'react-loader-spinner';
import axios from "axios";
import "./index.css";


const TrackingStatus = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  console.log("product_id", id)

  const transformTrackingData = (apiTracking) => {
    return {
      order_id: apiTracking.id || "N/A",
      tracking_number: apiTracking.tracking_number,
      courier: apiTracking.slug,
      status: apiTracking.tag,
      timeline: apiTracking.checkpoints.map(cp => {
        const dt = new Date(cp.checkpoint_time);
        return {
          stage: cp.subtag_message || cp.tag,
          date: dt.toISOString().split("T")[0], // yyyy-mm-dd
          time: dt.toTimeString().slice(0, 5), // HH:mm
          messages: [
            cp.message + (cp.location ? ` (${cp.location})` : "")
          ]
        };
      })
    };
  };



  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${SERVER_API_URL}/product`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  // useEffect(() => {
  //   const fetchTracking = async () => {
  //     try {
  //       const res = await axios.post(`${SERVER_API_URL}/api/tracking/track`, {
  //         courier: "dtdc",
  //         trackingNumber: "7D155069823".trim()
  //       });

  //       if (res.data?.data?.tracking) {
  //         console.log("tracking", res.data.data.tracking)
  //         const formattedData = transformTrackingData(res.data.data.tracking);
  //         setTrackingData(formattedData);
  //       } else {
  //         console.warn("⚠️ Tracking data not found:", res.data);
  //       }
  //     } catch (err) {
  //       console.error("❌ Error fetching tracking:", err.response?.data || err.message);
  //     }
  //   };

  //   fetchTracking();
  //   fetchData()
  //   fetchProducts()
  // }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/api/cashfree/orders/${id}`);
        console.log("response order", response.data)
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
    fetchProducts()
  }, [id]);

  const fetchTracking = async () => {
    try {
        const res = await axios.post(`${SERVER_API_URL}/api/tracking/track`, {
        courier: order.data.slug,
        trackingNumber: order.data.tracking_number.trim(),
      });

      if (res.data?.data?.tracking) {
        const formattedData = transformTrackingData(res.data.data.tracking);
        setTrackingData(formattedData);
      } else {
        console.warn("⚠️ Tracking data not found:", res.data);
      }
    } catch (err) {
      console.error("❌ Error fetching tracking:", err.response?.data || err.message);
    }
  };


  // ✅ Safe check: slug aur tracking_number dono honi chahiye aur empty string na ho
  useEffect(() => {
    if (!order?.data) return;  // 👈 Safe check

    if (
      order.data.slug?.trim() &&
      order.data.tracking_number?.trim()
    ) {
      fetchTracking();
    }
  }, [order]);

  if (!trackingData) return <p className="loading-cointainer-details">
    <p style={{ marginBottom: "10px", textAlign: "center" }}>👉 “Tracking details will be provided as soon as your product is shipped.”</p>
    <p style={{ marginBottom: "10px" }}>👉 "Your order has been confirmed successfully."</p>
    <p style={{ marginBottom: "10px" }}>Loading tracking details...</p>
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2']}
    />
  </p>

  return (
    <div className="ordet-main-container">
      {/* product order details */}
      <div className="order-details-container">
        {/* // Order details container */}
        <div className="order-details-container">
          <h2 className="order-details-title">Order Details</h2>
          {order && products.length > 0 ? (
            (() => {
              // order me jo product_id hai uske basis pe product filter karna
              const product = products.find(p => p.id === order.product_id);

              return product ? (
                <div className="order-product-card">
                  <img
                    src={`${SERVER_API_URL}/${product.product_thumnail_img}`}
                    alt={product.title}
                    className="order-product-image"
                  />
                  <div className="order-product-info">
                    <h3 className="product-title">{product.product_title}</h3>
                    <p className="product-attr"><span style={{ marginLeft: "0", padding: "0", width: "auto" }}>{product?.highlights}</span></p>
                    <p className="product-attr"><span style={{ marginLeft: "0", marginBottom: "30px", marginTop: "7px", width: "auto" }}>{order.data?.mobile_number}</span></p>
                    <p className="product-qty">Qty: {order.data?.product_quantity}</p>
                    <p className="product-price">Price: ₹{order.data?.selected_Lens_Or_ProductPrice}</p>
                    <p className="product-attr">Frame Shape: <span>{product?.frame_shape}</span></p>
                    <p className="product-attr">Frame Type: <span>{product?.frem_type}</span></p>
                    <p className="product-attr">Frame Material: <span>fiber</span></p>
                  </div>


                </div>
              ) : (
                <p>Product not found</p>
              );
            })()
          ) : (
            <p>Loading order details...</p>
          )}
        </div>

      </div>

      {/* shipment traking */}
      <div className="tracking-container">
        <h2 className="tracking-title">Tracking Number: {trackingData.tracking_number}</h2>
        <p className="tracking-courier">Courier: {trackingData.courier}</p>

        <div className="tracking-timeline">
          {trackingData.timeline.map((step, i) => {
            const isLast = i === trackingData.timeline.length - 1;
            return (
              <div key={i} className="timeline-item">
                <div className={`timeline-dot ${step.stage.replace(/\s+/g, "").toLowerCase()}`}></div>
                {!isLast && <div className="timeline-line"></div>}
                <div className="timeline-content">
                  <h4 className="timeline-status">
                    {step.stage}
                    <span className="timeline-date">
                      {new Date(`${step.date}T${step.time}`).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {new Date(`${step.date}T${step.time}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </h4>
                  {step.messages.map((msg, idx) => (
                    <p key={idx} className="timeline-message">{msg}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackingStatus;

