import React from 'react';
import './index.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../../components/Header';

const ContactUs = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: '#333',
        fontSize: '14px',
        lineHeight: '2',
        transition: 'color 0.3s',
    };

    const contactRow = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        color: '#333',
    };

    const iconStyle = {
        color: '#1976f2',
        fontSize: '16px',
    };

    return (
        <>
            <Header />

            {/* Contact Section */}
            <section className="contact-us-section">
                <div className="contact-us-container">
                    <h2 className="contact-title">Contact Us</h2>
                    <p className="contact-subtitle">
                        Thank you for your interest in Matteo Bianchi. If you have any questions about our products,
                        your orders, shipping, returns, or need any general support, feel free to reach out to us via phone,
                        email, or visit our registered office.
                    </p>

                    <p className="contact-description">
                        At Matteo Bianchi, customer satisfaction is our top priority. Our dedicated support team is available
                        Monday to Saturday from 10:00 AM to 6:00 PM IST to assist you with any queries. We ensure prompt responses
                        within 24 hours on business days. Whether you need assistance with choosing the right eyewear, tracking your shipment,
                        or initiating a return, our support executives are here to help.
                    </p>

                    <p className="contact-description">
                        For business inquiries, partnerships, or bulk orders, you can directly contact our sales and operations team
                        using the details below. We also welcome your feedback and suggestions to improve our services and products.
                    </p>

                    <div className="contact-grid">
                        <div className="contact-box">
                            <h4>📞 Phone</h4>
                            <p>+91 93803 59418<br />Monday to Saturday, 10AM - 6PM IST</p>
                        </div>
                        <div className="contact-box">
                            <h4>📧 Email</h4>
                            <p>support@matteo-bianchi.com<br />For all customer support & order related queries</p>
                        </div>
                        <div className="contact-box">
                            <h4>🏢 Registered Office</h4>
                            <p>
                                M/s. Softgenics India Private Limited<br />
                                Flat No. 502, Buddha Subhash Enclave<br />
                                Jaganpura, Buddha Subhash Enclave<br />
                                Patna - 800027<br />
                                Bihar, India
                            </p>
                        </div>
                    </div>


                    <p className="contact-footer-note">
                        You can also visit our <a href="/faq">FAQ</a> page for quick answers to commonly asked questions.
                    </p>
                </div>
            </section>

            {/* Footer Section */}
            <footer style={{ backgroundColor: '#f5faff', padding: '40px 20px', fontFamily: 'sans-serif' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Top Footer Links */}


                    {/* Contact Info at Bottom */}
                    <div style={{ borderTop: '1px solid #ddd', paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h3 style={{ color: '#1976f2' }}>Contact Us</h3>
                        <div style={contactRow}><FaPhone style={iconStyle} /> <span>+91 93803 59418</span></div>
                        <div style={contactRow}><FaEnvelope style={iconStyle} /> <span>M/s. Softgenics India Private Limited</span></div>
                        <div style={contactRow}><FaMapMarkerAlt style={iconStyle} />  <span>Flat number 502, Budda Subhash enclave,
                            New jaganpura, patna Bihar 800027</span></div>
                    </div>

                    {/* Bottom Note */}
                    <div style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                        © {new Date().getFullYear()} Matteo Bianchi. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
};

export default ContactUs;
