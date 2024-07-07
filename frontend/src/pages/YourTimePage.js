import React, { useState } from 'react';
import useFetchActivities from '../context/contextFetchActivities';
import axios from 'axios';

import '../css/YourTime.css';

const YourTimePage = () => {
    const { activities, loading, error } = useFetchActivities();
    const [editActivity, setEditActivity] = useState(null);
    const [editName, setEditName] = useState('');
    const [editHour, setEditHour] = useState('');
    const { PORT } = require('../config');

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading activities: {error.message}</p>;
    }

    const handleEditClick = (activity) => {
        setEditActivity(activity);
        setEditName(activity.name);
        setEditHour(activity.hour);
    };

    const handleUpdate = async (activityId, activityDocId) => {
        try {
            const response = await axios.put(`http://localhost:${PORT}/api/activities/${activityDocId}/activity/${activityId}`, {
                name: editName,
                hour: editHour
            });
            console.log('Activity updated:', response.data);
        } catch (error) {
            console.error('Error updating activity', error);
        } finally {
            setEditActivity(null);
            setEditName('');
            setEditHour('');
        }
    };

    const handleDelete = async (activityId, activityDocId) => {
        try {
            const response = await axios.delete(`http://localhost:${PORT}/api/activities/${activityDocId}/activity/${activityId}`);
            console.log('Activity deleted:', response.data);
        } catch (error) {
            console.error('Error deleting activity', error);
        }
    };

    return (
        <div>
            <h1>Your Time</h1>
            <ul className='yourTimeList'>
                {activities.map(activityDoc => (
                    <div key={activityDoc._id} className='yourTime'>
                        <p>Timestamp: {new Date(activityDoc.timestamp).toLocaleString()}</p>
                        <ul>
                            {activityDoc.activities.map(activity => (
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
        </div>
    );
};

export default YourTimePage;