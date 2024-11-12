import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your message has been sent! We will get back to you shortly.');
        // Integrate API for sending message if needed
    };

    return (
        <section>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
                <textarea name="message" placeholder="Your Message" onChange={handleChange} required></textarea>
                <button type="submit">Send Message</button>
            </form>
            <p>Or give us a call at (555) 123-4567</p>
        </section>
    );
};

export default Contact;
