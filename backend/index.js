// Import necessary modules
const express = require('express');
const app = express();
const port = 5000; // or whatever port your backend is using

// Add a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
