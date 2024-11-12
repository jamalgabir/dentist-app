import React, { useEffect, useState } from 'react';
import BasUlr from "../api/index"
const BookingForm = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [patientName, setPatientName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');  // New state for phone number
    const [serviceType, setServiceType] = useState('');  // New state for service type
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        fetchAvailableSlots();
    }, []);

    const fetchAvailableSlots = async () => {
        try {
            const response = await BasUlr.get('/api/available-slots');
            setAvailableSlots(response.data.slots);
        } catch (error) {
            console.error('Error fetching available slots:', error);
            setResponseMessage('Error fetching available slots. Please try again later.');
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await BasUlr.post('/api/book-appointment', {
                date: selectedSlot,
                patientName,
                email,
                phone,  // New field: phone number
                serviceType,  // New field: service type
            });
            setResponseMessage('Appointment booked successfully!');
            // Reset form fields
            setPatientName('');
            setEmail('');
            setPhone('');
            setServiceType('');
            setSelectedSlot('');
            fetchAvailableSlots(); // Refresh available slots after booking
        } catch (error) {
            console.error('Error booking appointment:', error);
            setResponseMessage('Error booking appointment: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            {responseMessage && <p className="response-message">{responseMessage}</p>}

            <form onSubmit={handleBooking}>
                <label htmlFor="slots">Choose an available slot:</label>
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

                <input
                    type="text"
                    placeholder="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Patient Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* New Phone Input */}
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                {/* New Service Type Input */}
                <label htmlFor="serviceType">Service Type:</label>
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

                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BookingForm;
