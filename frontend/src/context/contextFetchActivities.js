import { useState, useEffect } from 'react';
import { fetchActivities } from './contextActivities';

const useFetchActivities = () => {
	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getActivities = async () => {
			try {
				const fetchedActivities = await fetchActivities();
				setActivities(fetchedActivities);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		getActivities();
	}, []);

	return { activities, loading, error };
};

export default useFetchActivities;
