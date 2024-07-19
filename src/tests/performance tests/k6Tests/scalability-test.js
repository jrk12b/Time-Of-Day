////////////////////////////////////////////////////////////////////////////////////////////
// Scalability tests simulate a gradual increase to real-life application load for a long duration
// This test slowly scales up to 25 users for 1 hour
// For local debugging, example command:
// k6 run ./scalability-test.js --summary-export="Test.json" --http-debug=full
////////////////////////////////////////////////////////////////////////////////////////////
import { k6_test_requests, k6_thresholds } from '../k6_test_requests.js';

export const options = {
	stages: [
		{ duration: '5m', target: 5 }, // simulate ramp-up of traffic from 1 to 5 users over 5 minute.
		{ duration: '10m', target: 5 }, // stay at 5 users for 10 minutes
		{ duration: '10m', target: 10 }, // ramp-up to 10 users for 10 minutes
		{ duration: '10m', target: 15 }, // ramp-up to 15 users for 10 minutes
		{ duration: '10m', target: 20 }, // ramp-up to 20 users for 10 minutes
		{ duration: '10m', target: 25 }, // ramp-up to 25 users for 10 minutes
		{ duration: '5m', target: 0 }, // ramp-down to 0 users
	],
	thresholds: k6_thresholds,
};

export default function () {
	k6_test_requests();
}
