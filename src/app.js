const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = 8000;

app.use(express.json());


const startServer = async () => {
    try {
        await connectDB();

        app.post("/signup", async(req, res) => {
            try {
                const {firstName, lastName, email, password, age, gender} = req.body;
                
                //create a new user instance
                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    age,
                    gender,
                });
                const newlyCreatedUser = await user.save();
                res.status(201).json({
                    message: "User created successfully",
                    user: newlyCreatedUser
                });
            } catch (error) {
                console.error("Error saving user: ", error.message);
                res.status(500).json({
                    message: "Failed to create user !!",
                    error: error.message
                });
            }
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
    }
}

startServer();
