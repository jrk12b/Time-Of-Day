// components/ActivityList.js
import React from 'react';

const YourTimeActivityList = ({
  activities,
  editActivity,
  editName,
  editHour,
  handleEditClick,
  handleUpdate,
  handleDelete,
  handleDeleteDocument,
  setEditActivity,
  setEditName,
  setEditHour,
}) => {
  return (
    <ul className="yourTimeList">
      {activities.map((activityDoc) => (
        <div key={activityDoc._id} className="yourTime">
          <button onClick={() => handleDeleteDocument(activityDoc._id)}>Delete Entire Document</button>
          <p className="dateText">Date: {new Date(activityDoc.timestamp).toLocaleDateString()}</p>
          <ul>
            {activityDoc.activities.map((activity) => (
              <li key={activity._id}>
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
                    <button onClick={() => handleUpdate(activity._id, activityDoc._id)}>Save</button>
                    <button onClick={() => setEditActivity(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    {activity.name}: {activity.hour} hours
                    <button onClick={() => handleEditClick(activity)}>Edit</button>
                    <button onClick={() => handleDelete(activity._id, activityDoc._id)}>Delete</button>
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