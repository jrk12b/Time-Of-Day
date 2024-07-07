import React from 'react';

const Activity = ({ activity, handleEdit, handleDelete }) => {
	return (
		<li>
			{activity.name} - {activity.hours}
			<button onClick={() => handleEdit(activity)}>Edit</button>
			<button onClick={() => handleDelete(activity._id)}>Delete</button>
		</li>
	);
};

export default Activity;
