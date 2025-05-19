import React, { useEffect, useState } from 'react';
import BasUlr from "../api/index";
import "./BookingForm.css";

const BookingForm = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [patientName, setPatientName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAvailableSlots();
    }, []);

    const fetchAvailableSlots = async () => {
        try {
            setIsLoading(true);
            const response = await BasUlr.get('/api/available-slots');
            setAvailableSlots(response.data.slots);
        } catch (error) {
            setResponseMessage('Error fetching available slots. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await BasUlr.post('/api/book-appointment', {
                date: selectedSlot,
                patientName,
                email,
                phone,
                serviceType,
            });
            setResponseMessage('Appointment booked successfully!');
            setPatientName('');
            setEmail('');
            setPhone('');
            setServiceType('');
            setSelectedSlot('');
            fetchAvailableSlots();
        } catch (error) {
            setResponseMessage('Error booking appointment: ' + error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-content">
                <h2>Book Your Appointment</h2>
                <p className="booking-subtitle">Schedule your visit with our experienced dental team</p>

                {responseMessage && (
                    <div className={`response-message ${responseMessage.includes('Error') ? 'error' : 'success'}`}>
                        {responseMessage}
                    </div>
                )}

                <form onSubmit={handleBooking} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="patientName">Full Name</label>
                        <input
                            id="patientName"
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="serviceType">Service Type</label>
                        <select
                            id="serviceType"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a service</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Root Canal">Root Canal</option>
                            <option value="Check-up">Check-up</option>
                            <option value="Whitening">Teeth Whitening</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="slots">Preferred Date & Time</label>
                        <select
                            id="slots"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select an available slot</option>
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {new Date(slot).toLocaleString()}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No slots available</option>
                            )}
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Booking...' : 'Book Appointment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;