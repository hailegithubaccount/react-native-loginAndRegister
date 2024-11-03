const express = require('express');
const User = require('./models/customer.js'); // Ensure this path is correct

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude the password field
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
