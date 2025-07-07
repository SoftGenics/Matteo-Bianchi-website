import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

import './index.css'

const Otpvarify = props => {
    const navigate = useNavigate();
    const [varifyOtp, setVarifyOtp] = useState({ otp: "" });
    const [displayOtp, setDisplayOtp] = useState(false); // Initially false to hide OTP
    const [displayStoreOtp, setDisplayStoreOtp] = useState('');

    useEffect(() => {
        const duration = 120000; // Duration in milliseconds (3 minutes)
        const displayDelay = 3000; // 3 seconds delay

        // Retrieve OTP from localStorage when the component mounts
        const storedOtp = localStorage.getItem('otp');
        if (storedOtp) {
            setDisplayStoreOtp(JSON.parse(storedOtp)); // Parse and display OTP
        }

        // Set a timeout to show OTP after 3 seconds
        const displayTimeout = setTimeout(() => {
            setDisplayOtp(true); // Show OTP after 3 seconds
        }, displayDelay);

        // Set another timeout to clear the OTP display after 3 minutes
        const otpTimeout = setTimeout(() => {
            setDisplayOtp(false);
            setDisplayStoreOtp(''); // Clear displayed OTP after 3 minutes
            localStorage.removeItem('otp'); // Optionally remove OTP from localStorage
        }, duration);

        // Cleanup function to clear timeouts on component unmount
        return () => {
            clearTimeout(displayTimeout);
            clearTimeout(otpTimeout);
        };
    }, []);

    const handlerInput = (event) => {
        setVarifyOtp({ otp: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(varifyOtp.otp);

        try {
            const storedOtp = localStorage.getItem('otp'); // Retrieve OTP by key
            if (storedOtp) {
                const parsedOtp = JSON.parse(storedOtp); // Parse JSON data
                console.log("parsedOtp", parsedOtp);
                if (varifyOtp.otp === parsedOtp) {
                    navigate('/', { replace: true });
                    localStorage.removeItem('otp'); // Remove OTP after successful verification
                } else {
                    console.error("Incorrect OTP.");
                }
            } else {
                console.error("No OTP found or OTP expired.");
            }

        } catch (error) {
            console.error("Otp error:", error);
        }
    }

    return (
        <>
            {displayOtp && displayStoreOtp && (
                <div className="display-otp">
                    <h1 className="display-otp-text" style={{ color: "#000" }}>{displayStoreOtp}</h1>
                </div>
            )}

            <div className='login-main-home-container'>
                <div className='bg-login'>
                    <form className='login-home-left-cont' onSubmit={submitHandler}>
                        <p className='varify-description'>Please enter the OTP we've sent you on your mobile number</p>
                        <p className='varify-description-num'>9110189245 <Link to="/login" className="edit">Edit</Link></p>
                        <input
                            type="text"
                            className='otp-input'
                            name="otp"
                            id="otp"
                            value={varifyOtp.otp}
                            onChange={handlerInput}
                            required
                        />

                        <button className='continue-btn' type="submit">Verify</button>
                    </form>
                </div>
                {/* <div className='bg-login-rigth-cont'>X</div> */}
            </div>
        </>
    )
}

export default Otpvarify;
