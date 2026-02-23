const Registration = require('../models/Registration');
const validator = require('validator');

// @desc    Register for an event
// @route   POST /api/register
// @access  Public
const registerForEvent = async (req, res) => {
    const { name, email, phone, eventId } = req.body;

    // Validation
    if (!name || !email || !phone || !eventId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validator.isMobilePhone(phone) || phone.length !== 10) {
        return res.status(400).json({ message: 'Invalid phone number. Must be 10 digits.' });
    }

    try {
        // Check for duplicate registration
        const existingRegistration = await Registration.findOne({ email, eventId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'You are already registered for this event with this email' });
        }

        const registration = new Registration({
            name,
            email,
            phone,
            eventId,
        });

        const createdRegistration = await registration.save();
        res.status(201).json(createdRegistration);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all registrations for an event
// @route   GET /api/events/:id/registrations
// @access  Public
const getEventRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ eventId: req.params.id });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get registration by ID
// @route   GET /api/register/:id
// @access  Public
const getRegistrationById = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        res.json(registration);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    registerForEvent,
    getRegistrationById,
    getEventRegistrations,
};
