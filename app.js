const express = require('express');
const bodyParser = require('body-parser');
const mainController = require('./controllers/mainController');
// require('dotenv').config();


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Set the MIME type for serving JavaScript files
app.get('/js/waitlist.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  // Use res.sendFile to send the JavaScript file
  res.sendFile(__dirname + '/public/js/waitlist.js');
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/waitlist', (req, res) => {
  res.sendFile(__dirname + '/public/waitlist.html');
});
// Define a route for waitlist.html
app.get('/waitlist', (req, res) => {
  res.render('waitlist');
});

// Define a route for handling form submissions from the waitlist page
app.post('/joinWaitlist', mainController.joinWaitlist);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});