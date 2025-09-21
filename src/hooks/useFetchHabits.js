import { useState, useEffect } from 'react';
import { fetchHabits } from '../context/contextHabits';

/**
 * Custom hook to fetch and manage activity data.
 * Fetches activity data and updates state with the fetched data.
 * Returns the current activities state.
 */
const useFetchHabits = () => {
	const [habits, setHabits] = useState([]);

	useEffect(() => {
		const getHabits = async () => {
			try {
				const fetchedHabits = await fetchHabits();
				setHabits(fetchedHabits);
			} catch (err) {
				console.error('Caught an error:', err.message);
			}
		};

		getHabits();
	}, []);

	return { habits };
};

export default useFetchHabits;
