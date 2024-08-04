// components/ActivityList.js
import React from 'react';
import { testIds } from '../../testData/testIds';

// This component displays all current DB documents and activities data. Allows for deleting an entire document button, edit activities, and delete activities
const YourTimeActivityList = ({
	activities = [],
	editActivity = null,
	editName = '',
	editHour = 0,
	handleEditClick = () => {},
	handleUpdate = () => {},
	handleDelete = () => {},
	handleDeleteDocument = () => {},
	setEditActivity = () => {},
	setEditName = () => {},
	setEditHour = () => {},
}) => {
	return (
		<ul data-testid={testIds.yourTime.yourTimeActivityList} className="yourTimeList">
			{activities.map((activityDoc) => (
				<div key={activityDoc._id} className="yourTime">
					<button
						className="delete-document-button"
						onClick={() => handleDeleteDocument(activityDoc._id)}
					>
						Delete Entire Document
					</button>
					<p className="dateText">Date: {new Date(activityDoc.timestamp).toLocaleDateString()}</p>
					<ul>
						{activityDoc.activities.map((activity) => (
							<li key={activity._id} data-testid={testIds.yourTime.yourTimeActivityEntry}>
								{editActivity && editActivity._id === activity._id ? (
									<div>
										<input
											type="text"
											value={editName}
											onChange={(e) => setEditName(e.target.value)}
											placeholder="Activity Name"
										/>
										<input
											type="number"
											value={editHour}
											onChange={(e) => setEditHour(e.target.value)}
											placeholder="Hours"
										/>
										<button
											className="activity-button"
											onClick={() => handleUpdate(activity._id, activityDoc._id)}
										>
											Save
										</button>
										<button className="activity-button" onClick={() => setEditActivity(null)}>
											Cancel
										</button>
									</div>
								) : (
									<div>
										{activity.name}: {activity.hour} hours
										<button className="activity-button" onClick={() => handleEditClick(activity)}>
											Edit
										</button>
										<button
											className="activity-button"
											onClick={() => handleDelete(activity._id, activityDoc._id)}
										>
											Delete
										</button>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			))}
		</ul>
	);
};

export default YourTimeActivityList;
