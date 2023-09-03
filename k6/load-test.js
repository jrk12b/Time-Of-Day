// load-test.js
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
	http.get('https://example.com');
	sleep(1);
}
