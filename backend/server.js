const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { PORT, MONGO_URI } = require('../config');
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
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server };
