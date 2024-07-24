/* eslint-disable no-prototype-builtins */
import http from 'k6/http';
import { sleep, check } from 'k6';

const k6_thresholds = {
	http_req_duration: ['p(99)<3000'], // 99 percent of response times must be below 2000ms
	http_req_failed: ['rate<0.005'], // http errors should be less than 0.5%
	checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
	http_reqs: ['rate>0.5'], // the rate of requests per second should be greater than 0.5
};

exports.k6_thresholds = k6_thresholds;

export function k6_test_requests() {
	const activitiesRoute = 'http://localhost:8000/api/activities';
	const activitiesNamesRoute = 'http://localhost:8000/api/activities/names';

	// a value larger than the time needed to complete a VU iteration. Used to generate a constant_request_rate
	const iteration_duration = 1;
	const start_time = new Date().getTime();

	// GET activities
	console.log(`GET URL: ${activitiesRoute}`);
	const getResonseActivities = http.get(activitiesRoute);
	console.log(`GET response status: ${getResonseActivities.status}`);

	// Validate GET activities response
	check(getResonseActivities, {
		'GET response status is 200': (res) => res.status === 200,
		'GET response is not null': (res) => res != null,
		'GET response is not empty': (res) => res !== '',
		'GET response body is not null': (res) => res.body != null,
		'GET response body is not empty': (res) => res.body !== '',
		'GET response body is an array': (r) => Array.isArray(JSON.parse(r.body)),
		'GET response body: each item in array has _id, timestamp, and activities': (r) => {
			const data = JSON.parse(r.body);
			return data.every(
				(item) =>
					item.hasOwnProperty('_id') &&
					item.hasOwnProperty('timestamp') &&
					item.hasOwnProperty('activities') &&
					Array.isArray(item.activities) &&
					item.activities.every(
						(activity) =>
							activity.hasOwnProperty('name') &&
							activity.hasOwnProperty('hour') &&
							activity.hasOwnProperty('_id')
					)
			);
		},
	});

	// GET activities/names
	console.log(`GET URL: ${activitiesNamesRoute}`);
	const getResponseActivitiesNames = http.get(activitiesNamesRoute);
	console.log(`GET response status: ${getResponseActivitiesNames.status}`);

	// Validate GET activities/names response
	check(getResponseActivitiesNames, {
		'GET response status is 200': (res) => res.status === 200,
		'GET response is not null': (res) => res != null,
		'GET response is not empty': (res) => res !== '',
		'GET response body is not null': (res) => res.body != null,
		'GET response body is not empty': (res) => res.body !== '',
		'GET response body is an array': (r) => Array.isArray(JSON.parse(r.body)),
	});

	// POST activities
	const testPayload = {
		timestamp: new Date().getTime(),
		activities: [
			{ name: 'mock_test1', hour: 1 },
			{ name: 'mock_test2', hour: 2 },
		],
	};
	console.log(`POST URL: ${activitiesRoute}`);
	const postResponseActivities = http.post(activitiesRoute, JSON.stringify(testPayload), {
		headers: { 'Content-Type': 'application/json' },
	});
	console.log(`POST response status: ${postResponseActivities.status}`);

	// get the created data from repsonse
	const postResponseActivitiesJSON = JSON.parse(postResponseActivities.body);
	const postResponseActivitiesData = postResponseActivitiesJSON.activities;

	// Validate POST activities response
	check(postResponseActivities, {
		'POST response status is 201': (res) => res.status === 201,
		'POST response is not null': (res) => res != null,
		'POST response is not empty': (res) => res !== '',
		'POST response body is not null': (res) => res.body != null,
		'POST response body is not empty': (res) => res.body !== '',
		'POST response body contains created data': (res) => {
			try {
				return (
					postResponseActivitiesData.length > 0 &&
					postResponseActivitiesData[0].name === 'mock_test1' &&
					postResponseActivitiesData[0].hour === 1 &&
					postResponseActivitiesData[1].name === 'mock_test2' &&
					postResponseActivitiesData[1].hour === 2
				);
			} catch (e) {
				console.error('Error parsing response body:', e);
				return false;
			}
		},
	});

	// Get the ID of created activity document so we can update and delete it later
	const postResponseActivitiesBody = JSON.parse(postResponseActivities.body);
	const postResponseActivitiesId = postResponseActivitiesBody._id;

	// GET activities/:id
	console.log(`GET URL: ${activitiesRoute}/${postResponseActivitiesId}`);
	const getResponseActivity = http.get(`${activitiesRoute}/${postResponseActivitiesId}`);
	console.log(`GET response status: ${getResponseActivity.status}`);

	// get the created data from repsonse
	const getResponseActivityJSON = JSON.parse(getResponseActivity.body);
	const getResponseActivityData = getResponseActivityJSON.activities;

	// Validate GET activities/:id response
	check(getResponseActivity, {
		'GET response status is 200': (res) => res.status === 200,
		'GET response is not null': (res) => res != null,
		'GET response is not empty': (res) => res !== '',
		'GET response body is not null': (res) => res.body != null,
		'GET response body is not empty': (res) => res.body !== '',
		'GET response body contains created data': (res) => {
			try {
				return (
					getResponseActivityData.length > 0 &&
					postResponseActivitiesData[0].name === 'mock_test1' &&
					postResponseActivitiesData[0].hour === 1 &&
					postResponseActivitiesData[1].name === 'mock_test2' &&
					postResponseActivitiesData[1].hour === 2
				);
			} catch (e) {
				console.error('Error parsing response body:', e);
				return false;
			}
		},
	});

	// PUT activities/:id
	const putActivityPayload = {
		name: 'mock_test4',
		hour: 4,
	};
	console.log(`PUT URL: ${activitiesRoute}/${postResponseActivitiesId}`);
	const putResponseActivity = http.put(
		`${activitiesRoute}/${postResponseActivitiesId}`,
		putActivityPayload
	);
	console.log(`PUT response status: ${putResponseActivity.status}`);

	// Validate PUT activity response
	check(putResponseActivity, {
		'PUT response status is 200': (res) => res.status === 200,
		'PUT response is not null': (res) => res != null,
		'PUT response is not empty': (res) => res !== '',
		'PUT response body is not null': (res) => res.body != null,
		'PUT response body is not empty': (res) => res.body !== '',
	});

	// DELETE activities
	console.log(`DELETE URL: ${activitiesRoute}/${postResponseActivitiesId}`);
	const deleteResponseActivities = http.del(`${activitiesRoute}/${postResponseActivitiesId}`);
	console.log(`DELETE response status: ${deleteResponseActivities.status}`);

	// Validate DELETE activities response
	check(deleteResponseActivities, {
		'DELETE response status is 200': (res) => res.status === 200,
		'DELETE response is not null': (res) => res != null,
		'DELETE response is not empty': (res) => res !== '',
		'DELETE response body is not null': (res) => res.body != null,
		'DELETE response body is not empty': (res) => res.body !== '',
	});

	constant_request_rate(start_time, iteration_duration);
}

// This ensures we keep a constant requests per second (RPS) rate.
function constant_request_rate(start_time, iteration_duration) {
	const end_time = new Date().getTime();
	const diff_time = (end_time - start_time) / 1000;
	const remainder_time = iteration_duration - diff_time;
	if (remainder_time > 0) {
		sleep(remainder_time);
	}
}
