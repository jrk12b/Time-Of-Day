const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { exec } = require('child_process');
const swaggerSpec = require('./swagger');

const frontend = process.env.FRONTEND;
if (frontend === 'true') {
	exec('serve -s build', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing command: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
} else {
	const { PORT, MONGODB_URI } = require('../config');
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

	const habitRoutes = require('./routes/habitRoutes');
	app.use('/api', habitRoutes);

	// Set the port
	const server = app.listen(PORT, () => {
		console.log(`Server running on ${PORT}`);
	});

	module.exports = { app, server };
}
