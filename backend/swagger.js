const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const { HOST } = require('../config');

// Define the Swagger specification
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Time Of Day API',
			version: '1.0.0',
			description:
				'API for Time Of Day app. This documentation contains details related to activity api routes.',
		},
		servers: [
			{
				url: HOST,
				description: 'API server',
			},
		],
	},
	apis: [path.join(__dirname, './routes/activityRoutes.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
