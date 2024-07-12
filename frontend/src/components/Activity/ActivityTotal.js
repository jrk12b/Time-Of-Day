import React, { useContext } from 'react';
import { AppContext } from '../../context/contextActivities';

// This component displays how many hours have been inputted into current activities
const ActivityTotal = () => {
	const { activities } = useContext(AppContext);

	const totalActivities = activities.reduce((total, item) => {
		return (total += item.hour);
	}, 0);

	return (
		<div className="alert alert-primary">
			<span>Hours Spent So Far: {totalActivities}</span>
		</div>
	);
};

export default ActivityTotal;
