import React from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="hero">
                <h1>Purchase Your Tickets<br></br> in one Place</h1>
                <div className="cta">
                    <Link to="/avilable-tickets" className="btn-primary" style={{ backgroundColor:'cyan', color:'black', borderRadius:'50px'}}>
                        Purchase Tickets
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="feature-card">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TZAlaBxdlQSVW7uesiFOw2SWiMug8lkxlQ&s" alt="Real-Time Analytics" className="feature-image" />
                    <h3>Real-Time Analytics</h3>
                    <p>Monitor live performance metrics and gain actionable insights instantly.</p>
                </div>
                <div className="feature-card">
                    <img src="https://newsroom.haas.berkeley.edu/wp-content/uploads/2023/10/Airline-pricing_Olivia-Natan.jpg" alt="User-Friendly Interface" className="feature-image" />
                    <h3>User-Friendly Interface</h3>
                    <p>Experience intuitive navigation and streamlined design for enhanced usability.</p>
                </div>
                <div className="feature-card">
                    <img src="https://files.cyberriskalliance.com/wp-content/uploads/2022/12/MauriceCol-e1672350611620.jpg" alt="Secure Data Management" className="feature-image" />
                    <h3>Secure Data Management</h3>
                    <p>Protect sensitive information with robust encryption and compliance measures.</p>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="call-to-action">
                <h2>Ready to Get Started?</h2>
                <p>Sign up now and take control of your ticketing process today!</p>
                <Link to="/signup" className="btn-primary">
                    Sign Up
                </Link>
            </section>   

                {/* Features Section */}
                <section id="features" className="features">
                <div className="feature-card">
                    <h3>Real-Time Collaboration</h3>
                    <p>Enable teams to work together seamlessly with instant updates and shared resources.</p>
                </div>
                <div className="feature-card">
                    <h3>AI-Powered Insights</h3>
                    <p>Utilize cutting-edge AI tools to predict trends, improve decision-making, and optimize operations.</p>
                </div>
                <div className="feature-card">
                    <h3>Customizable Solutions</h3>
                    <p>Adapt features to your business needs with flexible and scalable tools designed for growth.</p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
