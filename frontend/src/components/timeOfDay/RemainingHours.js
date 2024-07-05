import React, { useContext } from 'react';
import { AppContext } from '../../context/appContextActivities';

const RemainingHours = () => {
	const { activities, hours } = useContext(AppContext);

	const totalActivities = activities.reduce((total, item) => {
		return (total = total + item.hour);
	}, 0);

	const alertType = totalActivities > hours ? 'alert-danger' : 'alert alert-secondary';

	return (
		<div className={`alert ${alertType}`}>
			<span>Hours Remaining: {hours - totalActivities}</span>
		</div>
	);
};

export default RemainingHours;
