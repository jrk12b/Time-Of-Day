# Time Of Day

Time Of Day is a powerful and intuitive app designed to help you manage and optimize your daily schedule. With Time Of Day, you can easily input your daily activities and track how many hours you spend on each task. The app then provides detailed charts and graphs, allowing you to visualize your time distribution over weeks or months. Whether you’re aiming to improve productivity, balance work and leisure, or simply gain insights into your daily routines, Time Of Day offers the tools you need to take control of your time. Start making every hour count with Time Of Day!

- Today's Time:
  - Provides form to input your daily activities and how many hours spent on each activity.
  - Provides graph displaying your daily activities and time spent.
  - Provides input to submit all activities for the day.
- Your Time
  - Shows all previous days and activities.
  - Provides several graphs (line, pie, bar) based on your daily activities.

## Tech Stack

- `Node.js` - JavaScript runtime environment and engine.
- `React` - JavaScript front-end library.
- `Express` - Backend web application framework for building RESTful APIs.
- `MongoDB/Mongoose` - No-SQL Database.

## Testing Framework

[QA Manifesto PDF](https://www.justinkurdila.com/_files/ugd/8fbca8_1d4d65417eb94e85a41e5016e15eb902.pdf)

- `Jest` - Unit/Component Testing
  - `Time-Of-Day/src/tests/unit tests/`
  - `Time-Of-Day/src/tests/component tests/`
- `Mocha`, `Chai`, and `Supertest` - Integration API Testing
  - `Time-Of-Day/src/tests/api tests/`
  - `Mocha` serves as the test runner, managing the execution of your test cases and suites.
  - `Chai` provides the assertions to check the correctness of the responses and behavior.
  - `Supertest` handles making the HTTP requests and receiving responses for your API tests.
- `K6` - Performance Testing
  - `Time-Of-Day/src/tests/performance tests/`
- `Cypress` - UI System Testing
  - `Time-Of-Day/cypress/e2e/`

## Cypress Testing Details

- Evaluating app ui and validating all functionality/behavior.
- All Cypress tests run in github actions against the following browsers:
  - Chrome
  - Firefox
  - Edge
  - Electron
  - Safari (Webkit)

## Performance Testing Details

Four main types of performance tests:

1. Backend API Performance (`k6`)
   - Targeting API endpoints and excercising CRUD functionality.
   - Executing thousands of requests, simulating many concurrent virtual users.
   - Validating request duration, requests per second, failed/passing requests, and response data.
   - Thresholds set for each metric.
2. Frontend Browser Performance (`k6`)
   - Evauluating app UI performance.
   - Executing thousands of requests and page loads, simulating many concurrent virtual users.
   - Validating browser request duration, requests per second, failed/passing requests, [browser metrics](https://grafana.com/docs/k6/latest/using-k6/metrics/reference/#browser) FCP, LCP, FID, CLS, TTFB, and element/component loading.
   - Thresholds set for each metric.
3. Frontend Browser Page loading (`Cypress`)
   - Evauluating app UI performance.
   - Visiting each page, validating page load, and timing length of page load.
   - Thresholds set for acceptable length of time for page load.
4. Google Lighthouse Performance (`Cypress`)
   - Evauluating app UI performance.
   - Visiting each page and running [Google Lighthouse Performance Metrics](https://developer.chrome.com/docs/lighthouse/overview)
   - Thresholds set for each [metric](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

## Installation

1. Clone repo locally

- `git clone https://github.com/jrk12b/Time-Of-Day.git`

2. Install Dependencies

- `npm i`

3. Install K6 locally

- https://k6.io/docs/get-started/installation/

## Usage

All tests run in Github Actions as defined in `node.js.yml`

- To start frontent server - `npm start`
  - `http://localhost:3000/`
- To start backend server - `npm run start-server`
  - `http://localhost:8000/`
  - `http://localhost:8000/api/activities`
  - `http://localhost:8000/api-docs/`
- To start app (both backend and frontend) - `npm run start-app`
- To run unit and component tests - `npm run test`
- To run api tests - `npm run api-test`
- To open cypress - `npm run cy:open`
- To start app and open cypress - `npm run cy:open-and-serve`
- To run specific k6 test - `k6 run 'src/tests/performance tests/backend tests/baselineTest.js'`
- Cypress commands used in github actions:
  - `npm run cy:pipeline-run-chrome`
  - `npm run cy:pipeline-run-firefox`
  - `npm run cy:pipeline-run-edge`
  - `npm run cy:pipeline-run-electron`
  - `npm run cy:pipeline-run-webkit`
- k6 commands used in github actions:
  - `k6:pipeline-backend-run`
  - `k6:pipeline-browser-home`
  - `k6:pipeline-browser-todaystime`
  - `k6:pipeline-browser-yourtime`
