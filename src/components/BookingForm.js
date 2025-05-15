import React, { useState } from 'react';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        service: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Appointment request received! We will contact you shortly to confirm.');
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                />
                <select
                    name="service"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Service</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="checkup">Check-up</option>
                    <option value="whitening">Teeth Whitening</option>
                    <option value="rootcanal">Root Canal</option>
                </select>
                <input
                    type="datetime-local"
                    name="date"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BookingForm;