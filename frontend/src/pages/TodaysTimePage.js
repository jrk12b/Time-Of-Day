import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { testIds } from '../testIds';

import '../css/TodaysTime.css';

import { fetchActivities, AppProvider } from '../context/contextActivities';

import TimeBudget from '../components/Activity/ActivityTimeBudget';
import RemainingHours from '../components/Activity/ActivityRemainingHours';
import TodaysTimeGraph from '../components/Graphs/TodaysTimeGraphs/TodaysTimeGraph';

import TotalHours from '../components/Activity/ActivityTotalHours';
import ActivityList from '../components/Activity/ActivityList';
import ActivityAddForm from '../components/Activity/ActivityAddForm';
import ActivitySubmit from '../components/Activity/ActivitySubmit';

const TimePage = () => {
	// eslint-disable-next-line no-unused-vars
	const [activities, setActivities] = useState([]);
	const [successMessage, setSuccessMessage] = useState('');
	const { PORT } = require('../config');

	useEffect(() => {
		const getActivities = async () => {
			const fetchedActivities = await fetchActivities();
			setActivities(fetchedActivities);
		};
		getActivities();
	}, []);

	const handleSubmitActivities = async (activities) => {
		try {
			const timestamp = new Date();
			const response = await axios.post(`http://localhost:${PORT}/api/activities`, {
				activities,
				timestamp,
			});
			console.log('Activities submitted:', response.data);

			// Show success message
			setSuccessMessage('Activities submitted successfully!');

			// Hide the message after 3 seconds
			setTimeout(() => {
				setSuccessMessage('');
			}, 3000);
		} catch (error) {
			console.error('Error submitting activities', error);
		}
	};

	return (
		<div data-testid={testIds.todaysTime.todayDiv}>
			<hr />
			<AppProvider>
				<div className="container">
					<div className="row mt-3">
						<div className="col-sm">
							<TimeBudget />
						</div>
						<div className="col-sm">
							<RemainingHours />
						</div>
						<div className="col-sm">
							<TotalHours />
						</div>
					</div>
					<div className="graph">
						<TodaysTimeGraph />
					</div>
					<div className="activityForm">
						<h3>Add Activity</h3>
						<div>
							<ActivityAddForm />
						</div>
					</div>
					<div className="activityContainer">
						<div className="activityList">
							<h3 className="mt-3">Activities</h3>
							<div className="row mt-3">
								<div className="col-sm">
									<ActivityList />
								</div>
							</div>
						</div>
						<div className="ActivitySubmit">
							<ActivitySubmit handleSubmitActivities={handleSubmitActivities} />
						</div>
					</div>
					{successMessage && <p className="success-message">{successMessage}</p>}{' '}
					{/* Display success message */}
				</div>
			</AppProvider>
		</div>
	);
};

export default TimePage;
