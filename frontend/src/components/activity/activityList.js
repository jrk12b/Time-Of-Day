import React from 'react';
import Activity from './activity';

const ActivityList = ({ activities, handleEdit, handleDelete }) => {
	return (
		<ul>
			{activities.map((activity) => (
				<Activity key={activity._id} activity={activity} handleEdit={handleEdit} handleDelete={handleDelete} />
			))}
		</ul>
	);
};

export default ActivityList;
