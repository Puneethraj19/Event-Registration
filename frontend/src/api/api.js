import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const fetchEvents = () => API.get('/events');
export const fetchEventById = (id) => API.get(`/events/${id}`);
export const registerUser = (registrationData) => API.post('/register', registrationData);
export const fetchRegistrationById = (id) => API.get(`/register/${id}`);
export const fetchEventRegistrations = (id) => API.get(`/events/${id}/registrations`);

export default API;
