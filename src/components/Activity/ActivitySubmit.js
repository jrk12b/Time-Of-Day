import React, { useContext } from 'react';
import { AppContext } from '../../context/contextActivities';
import { testIds } from '../../testData/testIds';

// This component displays a Submit All Activities button which submits all current acitivites to the database
const ActivitySubmit = ({ handleSubmitActivities }) => {
	const { activities } = useContext(AppContext);

	const handleButtonClick = () => {
		if (activities.length > 0) {
			handleSubmitActivities(activities);
		}
	};

	return (
		<div data-testid={testIds.todaysTime.activitySubmit}>
			<button
				data-testid={testIds.todaysTime.activitySubmitButton}
				className="btn btn-primary mt-3"
				onClick={handleButtonClick}
			>
				Submit All Activities
			</button>
		</div>
	);
};

export default ActivitySubmit;
