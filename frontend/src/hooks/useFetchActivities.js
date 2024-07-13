import { useState, useEffect } from 'react';
import { fetchActivities } from '../context/contextActivities';

const useFetchActivities = () => {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const getActivities = async () => {
			try {
				const fetchedActivities = await fetchActivities();
				setActivities(fetchedActivities);
			} catch (err) {
				console.error('Caught an error:', err.message);
			}
		};

		getActivities();
	}, []);

	return { activities };
};

export default useFetchActivities;
