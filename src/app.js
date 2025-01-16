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

       app.get("/getUser", async (req, res) => {
            try {
                const userEmail = req.query.email;
                if(!userEmail){
                    return res.status(400).json({
                        message: "Email is required as a query parameter!!",
                    });
                }
                const fetchedUser = await User.find({email: userEmail});

                if(fetchedUser.length === 0){
                        return res.status(404).json({
                            message: "User not found!!!",
                        });
                }

                res.json({
                    message: "User is successfully fetched for you...",
                    user: fetchedUser
                });
            } catch (error) {
                console.error("Internal server error", error.message);
                res.status(500).json({
                    message: "Internal server error",
                    error: error.message
                });
            }
       });

       app.get("/feed", async (req, res) => {
            try {
                const fetchedAllUsers = await User.find({});

                if(fetchedAllUsers.length === 0){
                    return res.status(404).json({
                        message: "Users not found !!",
                    });
                }
                res.json({
                    message:" Here are all the users ...",
                    users: fetchedAllUsers
                });
                 
            } catch (error) {
                console.error("Internal serever error", error.message);
                res.status(500).json({
                    message: "Internal server error",
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
