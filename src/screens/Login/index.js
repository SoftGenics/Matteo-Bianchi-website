import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { SERVER_API_URL } from '../../server/server';
import axios from "axios";
import yourPerfectPairBanner from '../../Assets/images/your-perfect-pair-banner.webp';

import './index.css'

const Login = () => {
    const history = useNavigate();
    const [userLogin, setUserLogin] = useState({ mobile_num: "" });

    const handlerInput = (event) => {
        setUserLogin({ mobile_num: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(userLogin)

        try {
            const response = await axios.post(
                `${SERVER_API_URL}/api/login`,
                { mobile_num: userLogin.mobile_num },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = response.data;
            console.log(data);
            if (data) {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('otp', JSON.stringify(data.otp));
                history('/otp-varify', {replace:true})
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <>
            <div className='login-main-home-container'>
                <div className='bg-login'>
                    <form className='login-home-left-cont' onSubmit={submitHandler}>
                        <img className='login-image' src={yourPerfectPairBanner} alt="yourPerfectPairBanner"/>
                        <h1 className='login-signup-heding'>Login or Sign up</h1>

                        <input placeholder='Enter a 10-digit mobile number'
                            className='mobile-input'
                            name="mobile_num"
                            id="mobile_num"
                            value={userLogin.mobile_num}
                            onChange={handlerInput}
                            required
                        />

                        <button className='continue-btn' type="submit">CONTINUE</button>
                        <p className='login-desc'> By creating an account or logging in, you agree to Purplle's Terms of Use and Privacy Policy
                            and consent to the collection and use of your personal information/sensitive personal data or information.
                        </p>
                    </form>

                </div>
                {/* <div className='bg-login-rigth-cont'>X</div> */}
            </div>
        </>
    )
}
export default Login;
