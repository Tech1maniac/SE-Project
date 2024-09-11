const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (replace the URI with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/Use_info', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for users
const userSchema = new mongoose.Schema({
    user: String,
    password: String
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login2.html'); // Serve the login form
});

// Handle form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user in the database
    const foundUser = await User.findOne({ user: username });

    // Check if the user exists and the password matches
    if (foundUser) {
        if (foundUser.password === password) {
            res.send('Login successful!');
        } else {
            res.send('Incorrect password!');
        }
    } else {
        res.send('User not found!');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
