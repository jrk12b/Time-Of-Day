////////////////////////////////////////////////////////////////////////////////////////////
// Baseline tests simulate as little load as possible
// This test simulates 1 user for 15 seconds, averaging ~16 requests.
// For local debugging, example command:
// k6 run baseline-test.js --summary-export="Test.json" --http-debug=full
////////////////////////////////////////////////////////////////////////////////////////////
import { k6_test_requests, k6_thresholds } from '../k6_test_requests.js';

export const options = {
	stages: [
		{ duration: '5s', target: 1 }, // simulate 1 user for 5 seconds
		{ duration: '5s', target: 1 }, // stay at 1 user for 5 seconds
		{ duration: '5s', target: 0 }, // ramp-down to 0 users
	],
	thresholds: k6_thresholds,
};

export default function () {
	k6_test_requests();
}
