import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
            <a href="https://icons8.com/icon/68295/ticket" title="Image from freeiconspng.com"><img src="https://seeklogo.com/images/L/lis-ticket-logo-860613F1D8-seeklogo.com.png" width="350" alt="Free Ticket Transparent Background" /></a>
            </div>
            <div className="title" style={{fontFamily:'initial'}}>
                <h1>Real-Time Event Ticketing System</h1>
            </div>
            <div className="login">
                <Link to="/login" className="login-link">Login</Link>
            </div>
        </header>
    );
};

export default Header;
