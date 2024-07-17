import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../../context/contextActivities';
import { testIds } from '../../testData/testIds';

// This component displays the current activities in today's activities: displaying the name, hours, and option to delete the activity
const ActivityItem = (props) => {
	const { dispatch } = useContext(AppContext);

	// Create handleDeleteActivity function which deletes a specific activity
	const handleDeleteActivity = () => {
		dispatch({
			type: 'DELETE_ACTIVITY',
			payload: props.id,
		});
	};

	return (
		<li
			data-testid={testIds.todaysTime.activityItem}
			className="list-group-item d-flex justify-content-between align-items-center"
		>
			{props.name} | {props.hour} Hour(s)
			<div>
				<TiDelete
					size="1.5em"
					onClick={handleDeleteActivity}
					data-testid={testIds.todaysTime.activityDelete}
				></TiDelete>
			</div>
		</li>
	);
};

export default ActivityItem;
