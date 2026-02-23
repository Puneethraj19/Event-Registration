const express = require('express');
const router = express.Router();
const { registerForEvent, getRegistrationById } = require('../controllers/registrationController');

router.route('/').post(registerForEvent);
router.route('/:id').get(getRegistrationById);

module.exports = router;
