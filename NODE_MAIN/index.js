const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST requests to /submit-form
app.post('/submit-form', (req, res) => {
    const { name, email, rating } = req.body; // Add the rating field here
    console.log("Received form data:", { name, email, rating }); // Log the rating value

    // Process the form data here as needed

    // Send a response with a thank-you message
    res.json({ success: true, message: "Thank you for submitting the form!" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
