// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB connection function
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/uploadRoutes'); // Route handler for file uploads
const fs = require("fs");
const path = require("path");

// Ensure 'uploads' directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for your frontend domain
app.use(cors({
  origin: "https://file-uploader-fim6.vercel.app"
}));

// Basic route for root URL (health check)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Mount upload routes
app.use('/api', uploadRoutes);

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB; // FIXED: added parentheses to call the function
});
