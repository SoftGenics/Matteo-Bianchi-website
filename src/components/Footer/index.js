import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { IoPlay } from "react-icons/io5";
import { MdEmail, MdCall, MdTextsms, MdChat } from "react-icons/md";
import "./index.css"; // Import CSS

const footerData = {
    categories: [
        { name: "All Glasses", link: "all-glasses" },
        { name: "All Women’s Eyeglasses | Sunglasses", link: "Women" },
        { name: "All Men's Eyeglasses | Sunglasses", link: "Men" },
        { name: "Kids Glasses (Toddler | Child | Pre-Teen)", link: "kids" },
    ],
    styles: [
        { name: "Aviator Glasses", link: "/aviator-glasses" },
        { name: "Cat-Eye Glasses", link: "/cat-eye-glasses" },
        { name: "Oval Glasses", link: "/oval-glasses" },
        { name: "Rectangle Glasses", link: "/rectangle-glasses" },
        { name: "Round Glasses", link: "/round-glasses" },
        { name: "Square Glasses", link: "/square-glasses" },
    ],
    frameColors: [
        "Blue", "Black", "Brown", "Green", "Gray", "Red", "Orange", "Pink",
        "Gold", "White", "Clear/Transparent", "Purple"
    ],
    lensColors: [
        "Blue", "Black", "Violet", "Brown", "Green", "Gray", "Red", "Orange",
        "Pink", "Gold", "White", "Clear/Transparent", "Yellow"
    ],
    account: [
        { name: "Your Orders", link: "/orders" },
        { name: "Your Saved Frames", link: "/saved-frames" },
        { name: "Your Dashboard", link: "/" }
    ]
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="subscribe-section">
                    <h2>SIGNUP FOR OFFERS & TIPS</h2>
                    <div className="subscribe-box">
                        <input type="email" placeholder="Enter your email address" />
                        <button>Subscribe</button>
                    </div>

                    {/* Social Media Icons */}
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                <div className="footer-grid">
                    {/* Categories */}
                    <div className="footer-column">
                        <h3>SHOP BY CATEGORIES</h3>
                        <ul>
                            {footerData.categories.map((item, index) => (
                                <li key={index}>
                                    <IoPlay color="#00c2cb" size={13} />
                                    <Link className="link-tag" to={`/product-display/${item.link}`}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Styles */}
                    <div className="footer-column">
                        <h3>SHOP BY STYLES</h3>
                        <ul>
                            {footerData.styles.map((item, index) => (
                                <li key={index}>
                                    <IoPlay color="#00c2cb" size={13} />
                                    <Link className="link-tag" to={`/product-display/${item.name}`}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Frame Colors */}
                    <div className="footer-column">
                        <h3>SHOP BY FRAME COLORS</h3>
                        <ul>
                            {footerData.frameColors.map((color, index) => (
                                <li key={index}>
                                    <IoPlay color="#00c2cb" size={13} /> 
                                    <Link className="link-tag" to={`/product-display/${color}`}>{color}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lens Colors */}
                    <div className="footer-column">
                        <h3>SHOP BY LENS COLORS</h3>
                        <ul>
                            {footerData.lensColors.map((color, index) => (
                                <li key={index}>
                                    <IoPlay color="#00c2cb" size={13} /> 
                                    <Link className="link-tag" to={`/product-display/${color}`}>{color}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div className="footer-column">
                        <h3>YOUR ACCOUNT</h3>
                        <ul>
                            {footerData.account.map((item, index) => (
                                <li key={index}>
                                    <IoPlay color="#00c2cb" size={13} />
                                    <Link className="link-tag" to={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="footer-bottom">
                    <div className="contact-info">
                        <span><MdEmail size={18} /> Email: <a href="mailto:eyezones94@gmail.com" className="link-tag">eyezones94@gmail.com</a></span>
                        <span><MdCall size={18} /> Call: <a href="tel:+919380359418" className="link-tag">+91 93803 59418</a></span>
                        <span><MdTextsms size={18} /> Text: +91 93803 59418</span>
                        <span><MdChat size={18} /> Chat: Search or Chat</span>
                        <h1 style={{ color: "#2f78c4" }}>
                                <FloatingWhatsApp
                                    phoneNumber="+91 76677 37337"
                                    accountName="Softgenics India Pvt. Ltd."
                                    allowClickAway
                                    notification
                                    notificationDelay={60000} // 1 minute
                                /></h1>
                    </div>
                    
                    <div className="footer-bottom-down">
                        <p>© 2025 Payne Glasses LLC. All Rights Reserved.</p>
                        
                        <div className="policy-links">
                            <Link to="/privacy-policy">Privacy Policy</Link> | 
                            <Link to="/terms-of-use">Terms of Use</Link>
                        </div>

                        {/* Payment Methods */}
                        <div className="payment-methods">
                            <img src="https://cdn.razorpay.com/app/googlepay.svg" alt="Google Pay" />
                            <img src="https://checkout-static-next.razorpay.com/build/assets/images/phonepe.e101f376.svg" alt="PhonePe" />
                            <img src="https://cdn.razorpay.com/app/cred_circle.png" alt="CRED" />
                            <img src="https://cdn.razorpay.com/app/amazonpay.svg" alt="Amazon Pay" />
                            <img src="https://cdn.razorpay.com/app/bhim.svg" alt="BHIM" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
