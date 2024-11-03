const express = require('express');
const User = require('./models/customer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const registerRouter = require('./routes/registerRoutes');
const loginRouter = require('./routes/loginRoutes');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://root:root@cluster0.vf3an.mongodb.net/yourDatabaseName"; // Replace with your actual database name

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/api', registerRouter);
app.use('/api', loginRouter);


app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude the password field
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
