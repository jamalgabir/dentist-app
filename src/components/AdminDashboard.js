import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Typography, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, CircularProgress, Box, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import baseUrl from "../api/index";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
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
            setLoading(true);
            const response = await baseUrl.get('/api/admin/appointments', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppointments(response.data);
        } catch (error) {
            setResponseMessage('Error fetching appointments');
        } finally {
            setLoading(false);
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
            setResponseMessage('Attendance updated successfully');
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
            setResponseMessage('Appointment cancelled successfully');
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

    if (loading) {
        return (
            <Box className="loading-spinner">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="container">
            <div className="dashboard-header">
                <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                {responseMessage && (
                    <Typography color="primary" className="response-message">
                        {responseMessage}
                    </Typography>
                )}
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <Typography variant="h6">Total Appointments</Typography>
                    <Typography variant="h4">{appointments.length}</Typography>
                </div>
                <div className="stat-card">
                    <Typography variant="h6">Upcoming</Typography>
                    <Typography variant="h4">{upcomingAppointments.length}</Typography>
                </div>
                <div className="stat-card">
                    <Typography variant="h6">Completed</Typography>
                    <Typography variant="h4">{pastAppointments.filter(a => a.attended).length}</Typography>
                </div>
            </div>

            <div className="table-container">
                <Typography variant="h6" style={{ padding: "20px" }}>Upcoming Appointments</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Patient Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Service Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {upcomingAppointments.length ? (
                                upcomingAppointments.map((appointment) => (
                                    <TableRow key={appointment._id}>
                                        <TableCell>{appointment.patientName}</TableCell>
                                        <TableCell>{appointment.email}</TableCell>
                                        <TableCell>{appointment.phone}</TableCell>
                                        <TableCell>{appointment.serviceType}</TableCell>
                                        <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label="Upcoming"
                                                className="status-chip status-upcoming"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="action-buttons">
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<EditIcon />}
                                                    onClick={() => handleEdit(appointment)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleCancel(appointment._id)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <div className="empty-state">
                                            <h3>No upcoming appointments</h3>
                                            <p>New appointments will appear here</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="table-container" style={{ marginTop: "30px" }}>
                <Typography variant="h6" style={{ padding: "20px" }}>Past Appointments</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Patient Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Service Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pastAppointments.map((appointment) => (
                                <TableRow key={appointment._id}>
                                    <TableCell>{appointment.patientName}</TableCell>
                                    <TableCell>{appointment.email}</TableCell>
                                    <TableCell>{appointment.serviceType}</TableCell>
                                    <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={appointment.attended ? "Completed" : "Missed"}
                                            className={`status-chip ${appointment.attended ? 'status-completed' : ''}`}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color={appointment.attended ? "success" : "primary"}
                                            startIcon={<CheckCircleIcon />}
                                            onClick={() => handleAttendance(appointment._id, !appointment.attended)}
                                        >
                                            {appointment.attended ? "Mark as Missed" : "Mark as Completed"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Dialog open={!!editAppointment} onClose={() => setEditAppointment(null)} className="edit-dialog">
                <DialogTitle>Edit Appointment</DialogTitle>
                <DialogContent>
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    }
                    {editAppointment && (
                        <>
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
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditAppointment(null)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;