import React from 'react';
import useFetchActivities from '../context/contextFetchActivities';

import '../css/YourTime.css';

const YourTimePage = () => {
    const { activities, loading, error } = useFetchActivities();
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading activities: {error.message}</p>;
    }

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
                                    {activity.name}: {activity.hour} hours
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