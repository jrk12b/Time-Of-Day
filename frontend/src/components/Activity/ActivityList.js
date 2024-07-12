import React, { useContext } from 'react';
import ActivityItem from './ActivityItem';
import { AppContext } from '../../context/contextActivities';

// This component displays the current activity list by displaying all ActivityItems
const ActivityList = () => {
	const { activities } = useContext(AppContext);
	return (
		<ul className="list-group">
			{activities.map((activity) => (
				<ActivityItem
					key={activity.id}
					id={activity.id}
					name={activity.name}
					hour={activity.hour}
				/>
			))}
		</ul>
	);
};

export default ActivityList;
