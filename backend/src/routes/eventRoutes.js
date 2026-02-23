const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent } = require('../controllers/eventController');
const { getEventRegistrations } = require('../controllers/registrationController');

router.route('/').get(getEvents).post(createEvent);
router.route('/:id').get(getEventById);
router.route('/:id/registrations').get(getEventRegistrations);

module.exports = router;
