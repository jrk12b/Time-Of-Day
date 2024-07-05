import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../../context/appContextActivities';

const ActivityItem = (props) => {
	const { dispatch } = useContext(AppContext);

	const handleDeleteActivity = () => {
		dispatch({
			type: 'DELETE_ACTIVITY',
			payload: props.id,
		});
	};

	return (
		<li className="list-group-item d-flex justify-content-between align-items-center">
			{props.name} | {props.hour} Hours
			<div>
				<span className="badge badge-primary badge-pill mr-3">{props.hour}</span>
				<TiDelete size="1.5em" onClick={handleDeleteActivity}></TiDelete>
			</div>
		</li>
	);
};

export default ActivityItem;
