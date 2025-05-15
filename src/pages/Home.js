import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="main-content">
            <section className="hero">
                <h1>Welcome to Dentist Smiles</h1>
                <p>Your smile is our priority.</p>
                <Link to="/booking">
                    <button>Book Your Appointment Now</button>
                </Link>
            </section>

            <section className="services-overview">
                <h2>Our Services</h2>
                <p>From cleanings to braces, we offer comprehensive dental care.</p>
                <Link to="/services">
                    <button>Explore Services</button>
                </Link>
            </section>

            <section className="testimonials">
                <h2>What Our Patients Say</h2>
                <div className="testimonial-grid">
                    <div className="testimonial-card">
                        <p>"The best dental experience I've ever had!"</p>
                        <span>- Sarah L.</span>
                    </div>
                    <div className="testimonial-card">
                        <p>"Highly recommend Dentist Smiles for their amazing service!"</p>
                        <span>- John D.</span>
                    </div>
                    <div className="testimonial-card">
                        <p>"Professional staff and modern facility. Couldn't be happier!"</p>
                        <span>- Michael R.</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;