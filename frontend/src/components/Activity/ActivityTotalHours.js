import React, { useContext } from 'react';
import { AppContext } from '../../context/contextActivities';
import { testIds } from '../../testData/testIds';

// This component displays how many hours have been inputted into current activities
const TotalHours = () => {
	const { activities } = useContext(AppContext);

	const totalActivities = activities.reduce((total, item) => {
		return (total += item.hour);
	}, 0);

	return (
		<div data-testid={testIds.totalHours} className="alert alert-primary">
			<span>Hours Spent So Far: {totalActivities}</span>
		</div>
	);
};

export default TotalHours;
