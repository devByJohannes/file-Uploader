// Import required modules
const Upload = require('../model/uploadModel'); // Mongoose model for saving uploads
const Tesseract = require('tesseract.js'); // OCR library for extracting text from images
const pdfParse = require('pdf-parse'); // Library to extract text from PDF files
const fs = require('fs'); // Node.js file system module for reading and deleting files


// Controller for handling file upload and text extraction
const fileUploadController = async (req, res) => {
  // Extract fields from the request
  const { firstName, lastName, dateOfBirth } = req.body;
  const file = req.file;

  let rawText = ''; // To store extracted text from the uploaded file
  const fullName = `${firstName} ${lastName}`; // Concatenate first and last name
  const birthDate = new Date(dateOfBirth); // Convert string to Date object
  const age = new Date().getFullYear() - birthDate.getFullYear(); // Calculate age

  try {
    // Handle PDF files
    if (file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(file.path); // Read PDF file as a buffer
      const data = await pdfParse(dataBuffer); // Extract text from PDF
      rawText = data.text;
    } 
    // Handle image files using OCR
    else if (file.mimetype.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(file.path, 'eng'); // OCR with English language
      rawText = text;
    } 
    // Unsupported file type
    else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Remove the uploaded file from the server after processing
    fs.unlinkSync(file.path);

    // Save extracted data and user info to MongoDB
    const uploadData = new Upload({
      firstName,
      lastName,
      dateOfBirth,
      uploadedText: rawText,
    });

    await uploadData.save(); // Save to database

    // Send success response with additional details
    res.json({
      message: "Upload successful",
      fullName,
      age,
      rawText,
      id: uploadData._id, // Return document ID
    });

  } catch (err) {
    // Log and return error if something goes wrong
    console.error(err);
    res.status(500).json({ error: 'Error processing file' });
  }
};

// Export the controller function
module.exports = {
  fileUploadController
};
