const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const path = require('path');

const { PORT, MONGODB_URI } = require('../config');
console.log(`PORT: ${PORT}`);
console.log(`MONGODB_URI: ${MONGODB_URI}`);
const app = express();

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
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

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../build')));

	// All other routes should be handled by React's index.html
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../build', 'index.html'));
	});
}

// Set the port
const server = app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});

module.exports = { app, server };
