import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to DentistSmiles</h1>
                    <p>Experience exceptional dental care with our team of experts</p>
                    <Link to="/booking" className="btn">Book Your Appointment</Link>
                </div>
            </section>

            <section className="services-overview">
                <h2>Our Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <h3>General Dentistry</h3>
                        <p>Comprehensive dental care for the whole family</p>
                    </div>
                    <div className="service-card">
                        <h3>Cosmetic Dentistry</h3>
                        <p>Transform your smile with our expert treatments</p>
                    </div>
                    <div className="service-card">
                        <h3>Emergency Care</h3>
                        <p>24/7 emergency dental services when you need them</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>Patient Testimonials</h2>
                <div className="testimonial-grid">
                    <div className="testimonial-card">
                        <p>"The best dental experience I've ever had! Professional and caring staff."</p>
                        <h4>- Sarah Johnson</h4>
                    </div>
                    <div className="testimonial-card">
                        <p>"Transformed my smile completely. Couldn't be happier with the results!"</p>
                        <h4>- Michael Brown</h4>
                    </div>
                    <div className="testimonial-card">
                        <p>"Excellent service and very friendly staff. Highly recommended!"</p>
                        <h4>- Emily Davis</h4>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;