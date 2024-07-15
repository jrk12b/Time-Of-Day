import React, { useContext } from 'react';
import { AppContext } from '../../context/contextActivities';
import { testIds } from '../../testData/testIds';

// This component displays how many hours remaining you have in your day
const RemainingHours = () => {
	const { activities, hours } = useContext(AppContext);

	const totalActivities = activities.reduce((total, activity) => {
		return (total = total + activity.hour);
	}, 0);

	const alertType = totalActivities > hours ? 'alert-danger' : 'alert alert-secondary';

	return (
		<div data-testid={testIds.remainingHours} className={`alert ${alertType}`}>
			<span>Hours Remaining: {hours - totalActivities}</span>
		</div>
	);
};

export default RemainingHours;
