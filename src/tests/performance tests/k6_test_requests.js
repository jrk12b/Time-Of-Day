import http from 'k6/http';
import { sleep, check } from 'k6';

const homeRoute = '/';
const todaysTimeRoute = '/TodaysTime';
const yourTimeRoute = '/YourTime';

const k6_thresholds = {
	http_req_duration: ['p(99)<3000'], // 99 percent of response times must be below 2000ms
	http_req_failed: ['rate<0.005'], // http errors should be less than 0.5%
	checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
	http_reqs: ['rate>0.5'], // the rate of requests per second should be greater than 0.5
};

exports.k6_thresholds = k6_thresholds;

export function k6_test_requests() {
	// a value larger than the time needed to complete a VU iteration. Used to generate a constant_request_rate
	const iteration_duration = 2;
	const start_time = new Date().getTime();

	// GET root
	console.log('GET URL: ' + homeRoute);
	const getResonseHome = http.get(homeRoute);
	check(getResonseHome, {
		'GET response status is 200': (res) => res.status === 200,
		'GET response is not null': (res) => res != null,
		'GET response is not empty': (res) => res != '',
		'GET response is not empty object': (res) => res != {},
		'GET response body is not null': (res) => res.body != null,
		'GET response body is not empty': (res) => res.body != '',
		'GET response body is not empty object': (res) => res.body != {},
	});

	// GET todaysTimeRoute
	console.log('GET URL: ' + todaysTimeRoute);
	const getResonseTodaysTime = http.get(todaysTimeRoute);
	check(getResonseTodaysTime, {
		'GET response status is 200': (res) => res.status === 200,
		'GET response is not null': (res) => res != null,
		'GET response is not empty': (res) => res != '',
		'GET response is not empty object': (res) => res != {},
		'GET response body is not null': (res) => res.body != null,
		'GET response body is not empty': (res) => res.body != '',
		'GET response body is not empty object': (res) => res.body != {},
	});

	// GET yourTimeRoute
	console.log('GET URL: ' + yourTimeRoute);
	const getResponseYourTime = http.get(yourTimeRoute);
	check(getResponseYourTime, {
		'GET response status is 200': (res) => res.status === 200,
		'GET response is not null': (res) => res != null,
		'GET response is not empty': (res) => res != '',
		'GET response is not empty object': (res) => res != {},
		'GET response body is not null': (res) => res.body != null,
		'GET response body is not empty': (res) => res.body != '',
		'GET response body is not empty object': (res) => res.body != {},
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
