import React, { useState, useEffect } from "react";
import {SERVER_API_URL} from '../../server/server'
import { ColorRing } from 'react-loader-spinner';
import axios from "axios";
import "./index.css";

const TrackingStatus = () => {
  const [trackingData, setTrackingData] = useState(null);

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


  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await axios.post(`${SERVER_API_URL}/api/tracking/track`, {
          courier: "dtdc",
          trackingNumber: "7D155069823".trim()
        });

        if (res.data?.data?.tracking) {
          console.log("tracking", res.data.data.tracking)
          const formattedData = transformTrackingData(res.data.data.tracking);
          setTrackingData(formattedData);
        } else {
          console.warn("⚠️ Tracking data not found:", res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching tracking:", err.response?.data || err.message);
      }
    };

    fetchTracking();
  }, []);


  if (!trackingData) return <p className="loading-cointainer-details">
    <p>Loading tracking details...</p>
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
  );
};

export default TrackingStatus;

