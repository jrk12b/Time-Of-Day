import { useState, useEffect } from 'react';
import { fetchActivities } from '../context/contextActivities';

/**
 * Custom hook to fetch and manage activity data.
 * Fetches activity data and updates state with the fetched data.
 * Returns the current activities state.
 */
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
