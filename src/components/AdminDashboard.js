import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
     Paper, Checkbox, Button, Typography, Dialog, DialogActions, DialogContent,
      DialogContentText, DialogTitle, TextField } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Delete';
import baseUrl from "../api/index";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [editAppointment, setEditAppointment] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');

        if (!token) {
            navigate('/admin/login');
        } else {
            baseUrl
                .get('/api/admin/verify-token', { headers: { Authorization: `Bearer ${token}` } })
                .then(() => {
                    fetchAppointments(token);
                })
                .catch(() => {
                    localStorage.removeItem('adminToken');
                    navigate('/admin/login');
                });
        }
    }, [navigate]);

    const fetchAppointments = async (token) => {
        try {
            const response = await baseUrl.get('/api/admin/appointments', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppointments(response.data);
        } catch (error) {
        
            setResponseMessage('Error fetching appointments');
            
        }
    };

    const handleAttendance = async (appointmentId, attended) => {
        const token = localStorage.getItem('adminToken');
        try {
            await baseUrl.put(
                `/api/admin/appointments/${appointmentId}/attendance`,
                { attended },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchAppointments(token);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            } else {
                setResponseMessage('Error updating attendance');
            }
            
        }
    };

    const handleCancel = async (appointmentId) => {
        const token = localStorage.getItem('adminToken');
        try {
            await baseUrl.delete(`/api/admin/appointments/${appointmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAppointments(token);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            } else {
                setResponseMessage('Error cancelling appointment');
            }
            
        }
    };

    const handleEdit = (appointment) => {
        setEditAppointment(appointment);
        setErrorMessage('');
    };

    const handleEditSubmit = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            await baseUrl.put(
                `/api/admin/appointments/${editAppointment._id}`,
                editAppointment,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResponseMessage('Appointment updated successfully');
            setEditAppointment(null);
            fetchAppointments(token);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            } else {
                setErrorMessage('Error updating appointment');
            }
            
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditAppointment({ ...editAppointment, [name]: value });
    };

    const pastAppointments = appointments.filter(
        (appointment) => new Date(appointment.date) < new Date()
    );
    const upcomingAppointments = appointments.filter(
        (appointment) => new Date(appointment.date) >= new Date()
    );

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            {responseMessage && <Typography color="primary">{responseMessage}</Typography>}

            {/* Upcoming Appointments Table */}
            <Typography variant="h6">Upcoming Appointments</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Service Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {upcomingAppointments.map((appointment) => (
                            <TableRow key={appointment._id}>
                                <TableCell>{appointment.patientName}</TableCell>
                                <TableCell>{appointment.email}</TableCell>
                                <TableCell>{appointment.phone}</TableCell>
                                <TableCell>{appointment.serviceType}</TableCell>
                                <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleEdit(appointment)}>
                                        Edit
                                    </Button>
                                    <Button color="error" startIcon={<CancelIcon />} onClick={() => handleCancel(appointment._id)}>
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Past Appointments Table */}
            <Typography variant="h6" style={{ marginTop: '20px' }}>Past Appointments</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Service Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Attended</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pastAppointments.map((appointment) => (
                            <TableRow key={appointment._id}>
                                <TableCell>{appointment.patientName}</TableCell>
                                <TableCell>{appointment.email}</TableCell>
                                <TableCell>{appointment.phone}</TableCell>
                                <TableCell>{appointment.serviceType}</TableCell>
                                <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={appointment.attended}
                                        
                                        
                                        onChange={() => handleAttendance(appointment._id, !appointment.attended)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button color="error" startIcon={<CancelIcon />} onClick={() => handleCancel(appointment._id)}>
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Appointment Dialog */}
            {editAppointment && (
                <Dialog open onClose={() => setEditAppointment(null)}>
                    <DialogTitle>Edit Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Update appointment details below.</DialogContentText>
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <TextField
                            margin="dense"
                            label="Patient Name"
                            name="patientName"
                            fullWidth
                            value={editAppointment.patientName}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            value={editAppointment.email}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            label="Phone"
                            name="phone"
                            type="tel"
                            fullWidth
                            value={editAppointment.phone}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            label="Service Type"
                            name="serviceType"
                            fullWidth
                            value={editAppointment.serviceType}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            label="Date"
                            name="date"
                            type="datetime-local"
                            fullWidth
                            value={new Date(editAppointment.date).toISOString().slice(0, -1)}
                            onChange={handleEditChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditAppointment(null)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleEditSubmit} color="primary">
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default AdminDashboard;
