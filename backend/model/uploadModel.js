const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    uploadedText: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Upload", uploadSchema,'uploadModel');