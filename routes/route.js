const express = require('express');
const path = require('path');
const { sendEmailController } = require('../controller/emailController');

const router = express.Router();

// Serve static files from the 'public' folder
router.use(express.static(path.join(__dirname, '..', 'public')));

// Set the route for the root URL
router.get('/', (req, res) => {
    // Use path.join with the 'public' folder as the base directory
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.post('/waitlist', sendEmailController);

module.exports = router;
