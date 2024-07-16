/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
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
