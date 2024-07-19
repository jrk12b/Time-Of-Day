////////////////////////////////////////////////////////////////////////////////////////////
// Load tests simulate real-life application load of concurrent users and should mimic expected production load for a short duration
// This test simulates 15 users for 2 minutes
// For local debugging, example command:
// k6 run load-test.js --summary-export="Test.json" --http-debug=full
////////////////////////////////////////////////////////////////////////////////////////////
import { k6_test_requests, k6_thresholds } from '../k6_test_requests.js';

export const options = {
	stages: [
		{ duration: '30s', target: 15 }, // simulate ramp up to 15 users for 30 seconds
		{ duration: '1m', target: 15 }, // stay at 15 users for 1 minute
		{ duration: '30s', target: 0 }, // ramp-down to 0 users
	],
	thresholds: k6_thresholds,
};

export default function () {
	k6_test_requests();
}
