////////////////////////////////////////////////////////////////////////////////////////////
// Endurance tests simulate real-life application load of concurrent users and should mimic expected production load for a long duration
// Endurance tests can be 5 min to 1 hour in length of execution.
// For local debugging, example command:
// k6 run ./endurance-test.js --summary-export="Test.json" --http-debug=full
////////////////////////////////////////////////////////////////////////////////////////////
import { k6_test_requests, k6_thresholds } from '../k6_test_requests.js';

export const options = {
	stages: [
		{ duration: '1m', target: 25 }, // simulate ramp-up of traffic from 1 to 25 users over 1 minute.
		{ duration: '5m', target: 25 }, // stay at 25 users for 5 minutes
		{ duration: '1m', target: 0 }, // ramp-down to 0 users
	],
	thresholds: k6_thresholds,
};

export default function () {
	k6_test_requests();
}
