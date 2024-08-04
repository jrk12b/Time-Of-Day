import React, { useEffect, useState } from 'react';
import { testIds } from '../testData/testIds';

import '../css/TodaysTime.css';

import { fetchActivities, handleSubmitActivities, AppProvider } from '../context/contextActivities';

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

	useEffect(() => {
		const getActivities = async () => {
			const fetchedActivities = await fetchActivities();
			setActivities(fetchedActivities);
		};
		getActivities();
	}, []);

	return (
		<div data-testid={testIds.todaysTime.todaysTime}>
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
						<h3 data-testid={testIds.todaysTime.addActivityForm.addActivityFormHeader}>
							Add Activity
						</h3>
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
							<ActivitySubmit
								handleSubmitActivities={(activities) =>
									handleSubmitActivities(activities, setSuccessMessage)
								}
							/>
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
