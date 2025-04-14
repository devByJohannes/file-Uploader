require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;


function connectDB() {

    mongoose.connect(MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true});

    const connection = mongoose.connection;

    connection.on('connected', (req,res) => {
        console.log("Mongo DB Connection Successful")
         
    })

    connection.on('error', () => {
        console.log("Mongo DB Connection unSuccessful")
    })

}

connectDB();

module.exports = mongoose;