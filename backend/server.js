const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, MONGO_URI } = require('../src/config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
	ssl: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Import the activity routes and use them
const activityRoutes = require('./routes/activityRoutes');
app.use('/api', activityRoutes);

// Set the port
const port = PORT || 8000;
const server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = { app, server };
