const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const { addEntry } = require('./controller/numberPlate-controller');

// Reuse DB connection across serverless invocations
let isConnected = false;
async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('DB connected');
}

server.use(cors());
server.use(bodyParser.json());

// Ensure DB is connected before handling any request
server.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

server.post('/vehicle/enter', addEntry);

// Local development: start the server normally
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    server.listen(port, () => console.log(`Server running on port ${port}`));
}

// Vercel: export the app as a serverless handler
module.exports = server;