import { app, server } from '../../../backend/server.js';
import { expect } from 'chai';
import moment from 'moment';
const request = await import('supertest');

// payload used for creating mock activities
const testPayload = {
	timestamp: moment('2023-07-01').valueOf(),
	activities: [
		{ name: 'mock_test1', hour: 1 },
		{ name: 'mock_test2', hour: 2 },
	],
};

// variable used to find and set the activityDocId. Used to GET, PUT, and DELETE the mocked activities
let activityDocId;

describe('Test Activity API', function () {
	this.timeout(10000);

	before(async function () {
		// Ensure the server is running
		if (!server.listening) {
			await new Promise((resolve) => server.listen(8000, resolve));
		}
	});

	// After tests, find the mocked data and delete it
	after(async function () {
		try {
			// find mocked data
			const mockData = await findActivitiesWithMockData();

			// Delete mocked data
			await deleteMockedData(mockData);

			// Close the server
			server.close();
		} catch (error) {
			console.error('Error in after hook:', error);
			throw error;
		}
		server.close();
		process.exit(0);
	});

	// Test POST a new activity
	it('POST /activity', async function () {
		const response = await request.default(app).post('/api/activities').send(testPayload);
		expect(response.status).to.equal(201);
		expect(response.body).to.be.an('object');
		expect(response.body).to.not.be.empty;

		// set the activityDocId which is used later in GET, PUT, and DELETE requests
		activityDocId = response.body._id;
	});

	// Test GET a specific activity document. And validate the activity that was just created
	it('GET /activities/:id and validate created activity', async function () {
		const getResponse = await request.default(app).get(`/api/activities/${activityDocId}`);

		expect(getResponse.status).to.equal(200);
		expect(getResponse.body).to.not.be.empty;
		expect(getResponse.body).to.have.property('_id');
		expect(getResponse.body).to.have.property('timestamp');
		expect(getResponse.body).to.have.property('activities');

		compareResponseWithTestPayload(getResponse, testPayload);
	});

	// Test GET all activities. And validate the activity that was just created
	it('GET /activities and validate created activity', async function () {
		const getResponse = await request.default(app).get('/api/activities');
		expect(getResponse.status).to.equal(200);

		// Find the created activity by _id in response.body
		const createdDocument = getResponse.body.find((activity) => activity._id === activityDocId);
		expect(createdDocument).to.exist;

		compareResponseWithTestPayload(createdDocument, testPayload);
	});

	// Test GET all activities
	it('GET /activities', async function () {
		const response = await request.default(app).get('/api/activities');
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array');

		const responseDocument = response.body[0];
		expect(responseDocument).to.have.property('_id');
		expect(responseDocument).to.have.property('timestamp');
		expect(responseDocument).to.have.property('activities');

		const responseActivities = response.body[0].activities;
		responseActivities.forEach((activity) => {
			expect(activity).to.have.property('name').that.is.a('string');
			expect(activity).to.have.property('hour').that.is.a('number');
			expect(activity).to.have.property('_id').that.is.a('string').with.lengthOf(24);
		});
	});

	// Test PUT against a specific activity within a document
	it('PUT /activities/:docId/activity/:activityId', async function () {
		// Set payload used for updating specific activity within a document
		const putActivityPayload = {
			name: 'mock_test4',
			hour: 4,
		};

		// get specific activityId and set to variable
		const response = await request.default(app).get(`/api/activities/${activityDocId}`);

		expect(response.status).to.equal(200);
		expect(response.body).to.not.be.empty;
		// Set to variable
		const activityId = response.body.activities[0]._id;

		// send the PUT to the specific activityId with the putActivityPayload
		const putResponse = await request
			.default(app)
			.put(`/api/activities/${activityDocId}/activity/${activityId}`)
			.send(putActivityPayload);

		expect(putResponse.status).to.equal(200);
		expect(putResponse.body).to.not.be.empty;

		// Validate that putActivityPayload is in putResponse
		compareResponseWithTestPayloadIncludes(putResponse, putActivityPayload);

		// get the updated activity and verify it has been updated
		const getResponse = await request.default(app).get(`/api/activities/${activityDocId}`);

		// Validate that putActivityPayload is in getResponse
		compareResponseWithTestPayloadIncludes(getResponse, putActivityPayload);
	});

	// Test PUT against a specific activity
	it('PUT /activities/:id', async function () {
		// set the putPayload
		const putPayload = {
			activities: [
				{ name: 'mock_test3', hour: 3 },
				{ name: 'mock_test4', hour: 4 },
			],
		};

		const putResponse = await request
			.default(app)
			.put(`/api/activities/${activityDocId}`)
			.send(putPayload);

		expect(putResponse.status).to.equal(200);
		expect(putResponse.body).to.be.an('object');
		expect(putResponse.body).to.not.be.empty;

		// Validate that putActivityPayload is in getResponse
		compareResponseWithTestPayload(putResponse, putPayload);
	});

	// Test GET specific activity document. Validate the updated activity
	it('GET /activities/:id and validate updated activity', async function () {
		// set the putPayload
		const putPayload = {
			activities: [
				{ name: 'mock_test3', hour: 3 },
				{ name: 'mock_test4', hour: 4 },
			],
		};

		const getResponse = await request.default(app).get(`/api/activities/${activityDocId}`);

		expect(getResponse.status).to.equal(200);
		expect(getResponse.body).to.not.be.empty;
		expect(getResponse.body).to.have.property('_id');
		expect(getResponse.body).to.have.property('timestamp');
		expect(getResponse.body).to.have.property('activities');

		// Validate that putActivityPayload is in getResponse
		compareResponseWithTestPayload(getResponse, putPayload);
	});

	// Test DELETE a specific activity within a document
	it('DELETE /activities/:docId/activity/:activityId', async function () {
		// get specific activityId and set to variable
		const getResponse = await request.default(app).get(`/api/activities/${activityDocId}`);

		expect(getResponse.status).to.equal(200);
		expect(getResponse.body).to.not.be.empty;
		// set the variable
		const activityId = getResponse.body.activities[0]._id;

		// delete the specific activityId
		const deleteresponse = await request
			.default(app)
			.delete(`/api/activities/${activityDocId}/activity/${activityId}`);

		expect(deleteresponse.status).to.equal(200);
		expect(deleteresponse.body).to.not.be.empty;

		// get activityDocId and validate deleted activity does not exist
		const getActivityResponse = await request.default(app).get(`/api/activities/${activityDocId}`);

		const getResponseActivities = getActivityResponse.body.activities;
		const getResponseNamesAndHours = getResponseActivities.map(({ name, hour, _id }) => ({
			name,
			hour,
			_id,
		}));

		const getResponseJson = JSON.stringify(getResponseNamesAndHours);

		// Validate getResponseNamesAndHours does NOT include activityId which was deleted
		const includesPayload = getResponseJson.includes(activityId);
		expect(includesPayload).to.eq(false);
	});

	// Test DELETE a specific activity document
	it('DELETE /activities/:id', async function () {
		const response = await request.default(app).delete(`/api/activities/${activityDocId}`);

		expect(response.status).to.equal(200);
		expect(response.body).to.not.be.empty;
		expect(response.body.message).to.eq('Activity deleted');
	});

	// Test GET all activity names
	it('GET all /activities/names', async function () {
		const response = await request.default(app).get('/api/activities/names');

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array');
		expect(response.body).to.not.be.empty;
		expect(response.body[0]).to.be.a('string');
	});
});

// This function gets all activities, finds the activities contains mock data, and then returns the document ids
// Used to delete the mockData in After()
async function findActivitiesWithMockData() {
	try {
		const response = await request.default(app).get('/api/activities');

		expect(response.status).to.equal(200);

		const mockedData = response.body
			.filter((doc) =>
				doc.activities.some((activity) => activity.name.toLowerCase().includes('mock_test'))
			)
			.map((doc) => doc._id);
		return mockedData;
	} catch (error) {
		console.error('Error finding activities:', error);
		throw error;
	}
}

/**
 * Deletes documents from the database by their IDs and verifies the deletion.
 *
 * @param {Array} mockedData - An array of document IDs to be deleted.
 */
async function deleteMockedData(mockedData) {
	for (const data of mockedData) {
		const response = await request.default(app).delete(`/api/activities/${data}`);

		expect(response.status).to.equal(200);
		expect(response.body).to.not.be.empty;
		expect(response.body.message).to.eq('Activity deleted');
	}
	console.log('All mocked data deleted');
}

function compareResponseWithTestPayload(response, testPayload) {
	// get the names and hours from the response activities

	// Check if response needs response.body.activities OR response.activities
	let responseActivities;
	if (response.body && response.body.activities) {
		responseActivities = response.body.activities;
	} else if (response.activities) {
		responseActivities = response.activities;
	} else {
		throw new Error('No activities found in the response');
	}

	// Check if testPayload contains activities or is the activities array itself
	let testPayloadActivities;
	let testPayloadNamesAndHours;
	if (testPayload.activities) {
		testPayloadActivities = testPayload.activities;
		testPayloadNamesAndHours = testPayloadActivities.map(({ name, hour }) => ({ name, hour }));
	} else {
		testPayloadNamesAndHours = testPayload;
	}

	const responseNamesAndHours = responseActivities.map(({ name, hour }) => ({ name, hour }));
	// get the names and hours from the testPayload

	// Validate the responseNamesAndHours equal testPayloadNamesAndHours
	const isEqual =
		JSON.stringify(responseNamesAndHours) === JSON.stringify(testPayloadNamesAndHours);
	expect(isEqual).to.eq(true);
}

function compareResponseWithTestPayloadIncludes(response, testPayload, equals = true) {
	// get the names and hours from the response activities

	// Check if response needs response.body.activities OR response.activities
	let responseActivities;
	if (response.body && response.body.activities) {
		responseActivities = response.body.activities;
	} else if (response.activities) {
		responseActivities = response.activities;
	} else {
		throw new Error('No activities found in the response');
	}

	// Check if testPayload contains activities or is the activities array itself
	let testPayloadActivities;
	let testPayloadNamesAndHours;
	if (testPayload.activities) {
		testPayloadActivities = testPayload.activities;
		testPayloadNamesAndHours = testPayloadActivities.map(({ name, hour }) => ({ name, hour }));
	} else {
		testPayloadNamesAndHours = testPayload;
	}

	const responseNamesAndHours = responseActivities.map(({ name, hour }) => ({ name, hour }));
	// get the names and hours from the testPayload

	const getResponseJson = JSON.stringify(responseNamesAndHours);
	const putPayloadJson = JSON.stringify(testPayloadNamesAndHours);

	const includesPayload = getResponseJson.includes(putPayloadJson);
	expect(includesPayload).to.eq(equals);
}
