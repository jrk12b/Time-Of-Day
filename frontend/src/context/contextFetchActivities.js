import { useState, useEffect } from 'react';
import { fetchActivities } from './contextActivities';

const useFetchActivities = () => {
    const [activities, setActivities] = useState([]);
    console.log('fetchActivities' + JSON.stringify(activities));

    useEffect(() => {
        const getActivities = async () => {
            const fetchedActivities = await fetchActivities();
            setActivities(fetchedActivities);
        };
        getActivities();
    }, []);

    return activities;
};

export default useFetchActivities;