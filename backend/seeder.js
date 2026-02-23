const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./src/models/Event');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected for seeding'))
    .catch((err) => console.log(err));

const events = [
    {
        name: 'Tech Conference 2026',
        date: new Date('2026-05-15'),
        time: '10:00 AM',
        description: 'A deep dive into the latest technologies including AI, Cloud Computing, and Web Development. Join us for a day of learning and networking.',
        location: 'Silicon Valley Convention Center',
    },
    {
        name: 'Design Workshop',
        date: new Date('2026-06-10'),
        time: '02:00 PM',
        description: 'Learn modern UI/UX design principles and tools. Perfect for beginners and intermediate designers looking to sharpen their skills.',
        location: 'Art Center Hub, New York',
    },
    {
        name: 'Networking Night',
        date: new Date('2026-07-20'),
        time: '06:30 PM',
        description: 'Expand your professional network and meet industry leaders from top tech companies.',
        location: 'Sky Lounge, San Francisco',
    },
];

const seedDB = async () => {
    try {
        await Event.deleteMany({});
        await Event.insertMany(events);
        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
