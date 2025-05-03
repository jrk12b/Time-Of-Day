import axios from 'axios';
const { HOST } = require('../config');

export const addHabit = async (habitName, goal = 20) => {
	try {
		const response = await axios.post(`${HOST}/api/habits`, {
			name: habitName,
			goal,
		});
		return response.data;
	} catch (error) {
		console.error('Error adding habit:', error);
		throw error;
	}
};
