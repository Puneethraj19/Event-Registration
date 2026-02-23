const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add an event name'],
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
        },
        time: {
            type: String,
            required: [true, 'Please add a time'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', eventSchema);
