import React, { useContext } from 'react';
import { AppContext } from '../../context/contextActivities';

const ActivitySubmit = ({ handleSubmitActivities }) => {
    const { activities } = useContext(AppContext);

    const handleButtonClick = () => {
        if (activities.length > 0) {
            handleSubmitActivities(activities);
        }
    };

    return (
        <div>
            <button className="btn btn-primary mt-3" onClick={handleButtonClick}>Submit All Activities</button>
        </div>
    );
};

export default ActivitySubmit;
