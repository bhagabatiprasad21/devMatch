const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection successfull..."); 
    }
    catch (error) {
        console.error("An error occured", error.message); 
    }
    
}

module.exports = {connectDB};