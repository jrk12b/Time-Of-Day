import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/TodaysTime.css';

import { fetchActivities, AppProvider } from '../context/contextActivities';

import TimeBudget from '../components/Graph/GraphTimeBudget';
import RemainingHours from '../components/Graph/GraphRemainingHours';
import Graph from '../components/Graph/Graph';

import ActivityTotal from '../components/Activity/ActivityTotal';
import ActivityList from '../components/Activity/ActivityList';
import AddActivityForm from '../components/Activity/ActivityAddForm';
import ActivitySubmit from '../components/Activity/ActivitySubmit';

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
                    <div className="ActivitySubmit">
                        <ActivitySubmit handleSubmitActivities={handleSubmitActivities} />
                    </div>
                </div>
            </AppProvider>
        </div>
    );
};

export default TimePage;