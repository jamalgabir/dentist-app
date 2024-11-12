import React, { useState } from 'react';
import basul from "../api/index"
const AdminAppointmentForm = ({ appointment = null, onSubmitSuccess }) => {
    const [patientName, setPatientName] = useState(appointment ? appointment.patientName : '');
    const [email, setEmail] = useState(appointment ? appointment.email : '');
    const [phone, setPhone] = useState(appointment ? appointment.phone : '');  // New phone field
    const [serviceType, setServiceType] = useState(appointment ? appointment.serviceType : '');  // New service type field
    const [date, setDate] = useState(appointment ? new Date(appointment.date).toISOString().slice(0, 16) : '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (appointment) {
                // Update existing appointment
                await basul.put(`/api/admin/appointments/${appointment._id}`, {
                    patientName,
                    email,
                    phone,  // Include phone
                    serviceType,  // Include service type
                    date,
                });
            } else {
                // Create new appointment
                await basul.post('/api/admin/appointments', {
                    patientName,
                    email,
                    phone,  // Include phone
                    serviceType,  // Include service type
                    date,
                });
            }
            onSubmitSuccess();  // Callback to refresh the dashboard
        } catch (error) {
            console.error('Error submitting appointment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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

            <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />

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

            <label htmlFor="date">Appointment Date:</label>
            <input
                type="datetime-local"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <button type="submit">
                {appointment ? 'Update Appointment' : 'Create Appointment'}
            </button>
        </form>
    );
};

export default AdminAppointmentForm;
