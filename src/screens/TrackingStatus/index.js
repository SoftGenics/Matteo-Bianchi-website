import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { SERVER_API_URL } from "../../server/server";
import "./index.css";

const TrackingStatus = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mobile_num, setMobile_num] = useState("");

  const [trackingData, setTrackingData] = useState(null);
  const [trackingSteps, setTrackingSteps] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const mobile = decodedToken.mobile_num;

      setMobile_num(mobile);
      fetchProducts(mobile); // ✅ direct value pass karo
    }
  }, []);



  // ------------------------------
  // Tracking Steps
  // ------------------------------
  console.log("mob", product)

  // 👇 getStatus
  const getTrackingSteps = (tracking, order) => {

    const activities = tracking?.shipment_track_activities || [];
    const status = Number(tracking?.shipment_status);

    const hasActivity = (activityName) =>
      activities.some(
        item =>
          item.activity?.trim().toLowerCase() ===
          activityName.trim().toLowerCase()
      );

    const getDate = (activityName) => {
      const item = activities.find(
        item =>
          item.activity?.trim().toLowerCase() ===
          activityName.trim().toLowerCase()
      );

      return item?.date || "";
    };

    return [

      // Order Confirmed
      {
        title: "Order Confirmed",
        completed: true,
        blink: status === 0,
        date: order?.createdAt,
      },

      // Pickup Requested
      {
        title: "Pickup Requested",
        completed:
          hasActivity("Pickup Awaited") ||
          status >= 19,

        blink: status === 19,

        date: getDate("Pickup Awaited"),
      },

      // Pickup Scheduled
      {
        title: "Pickup Scheduled",
        completed:
          hasActivity("Pickup scheduled") ||
          status >= 20,

        blink: status === 20,

        date:
          getDate("Pickup scheduled"),
      },

      // Shipped
      {
        title: "Shipped",

        completed:
          hasActivity("Picked up") ||
          hasActivity("Shipment Booked") ||
          status >= 42 ||
          status === 18 ||
          status === 17 ||
          status === 21 ||
          status === 7,

        blink:
          status === 42,

        date:
          getDate("Picked up") ||
          getDate("Shipment Booked"),
      },

      // In Transit
      {
        title: "In Transit",

        completed:
          hasActivity("In Transit") ||
          status === 18 ||
          status === 17 ||
          status === 21 ||
          status === 7,

        blink:
          status === 18,

        date:
          getDate("In Transit"),
      },

      // Out For Delivery
      {
        title: "Out For Delivery",

        completed:
          hasActivity("Out for Delivery") ||
          status === 17 ||
          status === 21 ||
          status === 7,

        blink:
          status === 17,

        date:
          getDate("Out for Delivery"),
      },

      // Undelivered / RTO
      {
        title: "Undelivered",

        completed: status === 21,

        failed: status === 21,

        blink: status === 21,

        date: getDate("Undelivered"),
      },

      // Delivered
      {
        title: "Delivered",

        completed:
          status === 7,

        blink:
          status === 7,

        date:
          getDate("Delivered"),
      }

    ];

  };

  const getStatus = (status) => {

    switch (Number(status)) {

      case 7:
        return "Delivered";

      case 17:
        return "Out For Delivery";

      case 18:
        return "In Transit";

      case 21:
        return "Undelivered";

      case 42:
        return "Picked Up";

      case 20:
        return "Not Picked";

      case 19:
        return "Pickup Awaited";

      case 6:
        return "Shipment Booked";

      case 0:
        return "Pending";

      default:
        return "Processing";
    }
  };

  // ------------------------------
  // Fetch Products
  // ------------------------------

  const fetchProducts = async (mobile) => {
    console.log("fetchProducts", mobile)
    try {
      const response = await axios.post(`${SERVER_API_URL}/api/cashfree/all/UserOder`,
        {
          mobile_number: mobile
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const foundProduct = response.data.find(
        item => String(item.id) === String(id)
      );

      if (!foundProduct) return;

      setProduct(foundProduct);

      if (foundProduct.tracking_number?.trim()) {
        fetchTracking(
          foundProduct.tracking_number,
          foundProduct
        );
      } else {
        // Pending state
        setTrackingData({
          tracking_number: "",
          courier: foundProduct.courier_name || "",
          status: 0,
          activities: [],
          track_url: "",
        });

        setTrackingSteps([
          {
            title: "Order Confirmed",
            completed: true,
            blink: true,
            date: foundProduct.createdAt,
          },
          {
            title: "Pickup Requested",
            completed: false,
            blink: false,
            date: "",
          },
          {
            title: "Pickup Scheduled",
            completed: false,
            blink: false,
            date: "",
          },
          {
            title: "Shipped",
            completed: false,
            blink: false,
            date: "",
          },
          {
            title: "Delivered",
            completed: false,
            blink: false,
            date: "",
          },
        ]);
      }


    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------
  // Fetch Tracking
  // ------------------------------

  const fetchTracking = async (trackingNumber, order) => {

    try {

      const res = await axios.post(
        `${SERVER_API_URL}/shiprocket/track-shipment`, { tracking_number: trackingNumber.trim(), }
      );

      console.log("Tracking :", res.data);

      if (res.data?.success && res.data?.data?.tracking_data) {

        const tracking = res.data.data.tracking_data;

        setTrackingData({
          tracking_number: trackingNumber,
          courier: order?.courier_name || "",
          activities: tracking.shipment_track_activities || [],
          track_url: tracking.track_url,
          status: tracking.shipment_status,
        });

        setTrackingSteps(
          getTrackingSteps(tracking, order)
        );

      }

    } catch (err) {
      console.log(err);
    }

  };

  // ------------------------------
  // Order Loaded
  // ------------------------------

  useEffect(() => {
    if (mobile_num) {
      fetchProducts(mobile_num);
    }
  }, [mobile_num]);

  // ------------------------------
  // Loading
  // ------------------------------

  if (!product || !trackingData) {

    return (

      <div className="loading-cointainer-details">

        <p>Your order has been confirmed successfully.</p>

        <p>
          Tracking details will appear once the courier picks up your parcel.
        </p>

        <div className="loader-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            colors={[
              "#FF6B6B",
              "#FFD93D",
              "#6BCB77",
              "#4D96FF",
              "#845EC2",
            ]}
          />
        </div>

      </div>

    );

  }
  return (
    <div className="tracking-page">

      {/* ================= Product Card ================= */}

      <div className="order-card">

        <img
          src={`${SERVER_API_URL}/${product?.product_image}`}
          alt={product?.product_image}
          className="order-image"
        />

        <div className="order-info">

          <h2>{product?.product_name}</h2>

          <p className="price">
            <strong>Amount :</strong>{" "}
            ₹ {product?.selected_Lens_Or_ProductPrice}
          </p>

          <p>
            <strong>ORDER ID :</strong>{" "}
            {product?.order_id || "-"}
          </p>

          <p>
            <strong>Deliverry Status:</strong>{" "}
            {getStatus(trackingData?.status, product?.delivery_status)},  {product?.product_quantity} Item,
          </p>

          <p>
            <strong>Courier Name :</strong> {product?.courier_name}
          </p>

          <p>
            <strong>Customer :</strong>{" "}
            {product.mobile_number}
          </p>

          <p>
            <strong>Tracking Number :</strong>{" "}
            {product?.tracking_number}
          </p>

          {/* <p>
            <strong>Quantity :</strong>{" "}
            {product?.product_quantity}
          </p> */}


        </div>

      </div>

      {/* ================= Shipment Details ================= */}

      <div className="shipment-card">

        <h2>Shipment Tracking</h2>

        <div className="shipment-details">

          <div>

            <span>Current Status</span>

            <h4>{getStatus(trackingData?.status)}</h4>

          </div>

          <div>

            <span>Courier</span>

            <h4>{product.courier_name || "-"}</h4>

          </div>

          <div>

            <span>Status Code</span>

            <h4>{trackingData.status}</h4>

          </div>

        </div>

      </div>

      {/* ================= Flipkart Progress ================= */}

      <div className="tracking-progress">

        {trackingSteps.map((step, index) => (

          <React.Fragment key={index}>

            <div className="tracking-step">

              <div
                className={
                  step.failed
                    ? "circle failed"
                    : step.blink
                      ? "circle blink"
                      : step.completed
                        ? "circle active"
                        : "circle"
                }
              >
                {step.completed || step.failed ? "✓" : ""}
              </div>

              <p>{step.title}</p>

              <small className="tracking-date">

                {step.date && !isNaN(new Date(step.date))

                  ? new Date(step.date).toLocaleString("en-IN", {

                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",

                  })

                  : "--"}

              </small>

            </div>

            {index !== trackingSteps.length - 1 && (

              <div
                className={
                  (trackingSteps[index].completed || trackingSteps[index].failed) &&
                    (trackingSteps[index + 1].completed ||
                      trackingSteps[index + 1].failed)
                    ? "line active"
                    : "line"
                }
              />

            )}

          </React.Fragment>

        ))}

      </div>

    </div>
  );
};

export default TrackingStatus;