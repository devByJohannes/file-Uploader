// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB connection function
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/uploadRoutes'); // Route handler for file uploads


// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5001; // Use environment PORT or default to 5001


// Middleware to parse JSON request bodies
app.use(bodyParser.json());


// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());


// Basic route for root URL (can be used as a health check)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Mount upload routes under /api path
app.use('/api', uploadRoutes);



// Start the server and connect to the database
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB; // Call the DB connection function (was missing parentheses)
});
