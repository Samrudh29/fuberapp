// Access to web framework API
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Routes
const routes = require('./app/routes');

// Redirect all api calls to routes
app.use('/api', routes);

// Redirect all the requests to the static folder to serve the static files
app.use('/', express.static('static'));

// Global error handling
app.use(function (err, req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.status(500).send(err);
})

// Start lisenting to the requests on the port number 3000
app.listen(3000, () => console.log('Listening on port 3000!'));