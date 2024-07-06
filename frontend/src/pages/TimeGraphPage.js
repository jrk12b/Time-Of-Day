import React from 'react';
import { AppProvider } from '../context/appContextActivities';
import TimeBudget from '../components/timeOfDay/TimeBudget';
import RemainingHours from '../components/timeOfDay/RemainingHours';
import ActivityTotal from '../components/timeOfDay/ActivityTotal';
import Graph from '../components/timeOfDay/Graph';
import ActivityList from '../components/timeOfDay/ActivityList';
import AddActivityForm from '../components/timeOfDay/AddActivityForm';
import './TimeGraph.css';

const TimePage = () => {
	return (
		<div>
			<hr></hr>
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
							<ActivityTotal />
						</div>
					</div>
					<div className="Center">
						<Graph />
					</div>
					<h3 className="mt-3">Activities</h3>
					<div className="row mt-3">
						<div className="col-sm">
							<ActivityList />
						</div>
					</div>
					<h3 className="mt-3">Add Activity</h3>
					<div className="row mt-3">
						<div className="col-sm">
							<AddActivityForm />
						</div>
					</div>
				</div>
			</AppProvider>
		</div>
	);
};

export default TimePage;
