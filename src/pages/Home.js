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

            <section className="gallery">
                <h2>Our Facility</h2>
                <div className="gallery-grid">
                    <div className="gallery-item">
                        <img src="https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg" alt="Modern dental office" />
                        <div className="gallery-overlay">
                            <p>State-of-the-art Equipment</p>
                        </div>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg" alt="Treatment room" />
                        <div className="gallery-overlay">
                            <p>Comfortable Treatment Rooms</p>
                        </div>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg" alt="Dental tools" />
                        <div className="gallery-overlay">
                            <p>Advanced Dental Tools</p>
                        </div>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.pexels.com/photos/3845733/pexels-photo-3845733.jpeg" alt="Waiting area" />
                        <div className="gallery-overlay">
                            <p>Welcoming Reception</p>
                        </div>
                    </div>
                </div>
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