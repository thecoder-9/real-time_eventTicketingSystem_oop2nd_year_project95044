import React from "react";
import "../css/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Your trusted ticketing platform for all your event needs.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: <a href="mailto:support@ticketingsystem.com">support@ticketingsystem.com</a></p>
                    <p>Phone: +1 (123) 456-7890</p>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Ticketing System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;