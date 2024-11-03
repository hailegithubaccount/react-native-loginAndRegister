const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const registerRouter = require('./routes/registerRoutes');
const loginRouter = require('./routes/loginRoutes');  // Adjust the path as necessary

const app = express();
const PORT = 5000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = "mongodb+srv://root:root@cluster0.vf3an.mongodb.net/yourDatabaseName"; // Replace with your actual MongoDB connection string

// Connect to MongoDB
mongoose.connect(mongoURI, {
    
    
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Use the registration router
app.use('/api', registerRouter);
app.use('/api', loginRouter );

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
