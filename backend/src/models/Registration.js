const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add your name'],
        },
        email: {
            type: String,
            required: [true, 'Please add your email'],
        },
        phone: {
            type: String,
            required: [true, 'Please add your phone number'],
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Event',
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate registration for same email and same event
registrationSchema.index({ email: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
