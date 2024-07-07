import React, { useEffect, useState } from 'react';
import { fetchActivities } from '../context/activityContext';
import { AppProvider } from '../context/appContextActivities';
import TimeBudget from '../components/timeOfDay/TimeBudget';
import RemainingHours from '../components/timeOfDay/RemainingHours';
import ActivityTotal from '../components/timeOfDay/ActivityTotal';
import Graph from '../components/timeOfDay/Graph';
import ActivityList from '../components/timeOfDay/ActivityList';
import AddActivityForm from '../components/timeOfDay/AddActivityForm';
import ActivityForm from '../components/activity/activityForm';
import axios from 'axios';
import '../css/TimeGraph.css';

const TimePage = () => {
    // eslint-disable-next-line no-unused-vars
    const [activities, setActivities] = useState([]);
    const { PORT } = require('../config');

    useEffect(() => {
        const getActivities = async () => {
            const fetchedActivities = await fetchActivities();
            setActivities(fetchedActivities);
        };
        getActivities();
    }, []);

    const handleSubmitActivities = async (activities) => {
        try {
            const timestamp = new Date();
            const response = await axios.post(`http://localhost:${PORT}/api/activities`, { activities, timestamp });
            console.log('Activities submitted:', response.data);
        } catch (error) {
            console.error('Error submitting activities', error);
        }
    };

    return (
        <div>
            <hr />
            <AppProvider>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-sm">
                            <TimeBudget />
                        </div>
                        <div className="col-sm">
                            <RemainingHours />
                        </div>
                        <div className="col-sm">
                            <ActivityTotal />
                        </div>
                    </div>
                    <div className="graph">
                        <Graph />
                    </div>
                    <div className="activityList">
                        <h3 className="mt-3">Activities</h3>
                        <div className="row mt-3">
                            <div className="col-sm">
                                <ActivityList />
                            </div>
                        </div>
                    </div>
                    <div className="activityForm">
                        <h3 className="mt-3">Add Activity</h3>
                        <div className="row mt-3">
                            <div className="col-sm">
                                <AddActivityForm />
                            </div>
                        </div>
                    </div>
                    <div className="submitActivityForm">
                        <ActivityForm handleSubmitActivities={handleSubmitActivities} />
                    </div>
                </div>
            </AppProvider>
        </div>
    );
};

export default TimePage;