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

// Fetches habit data from the backend API
export const fetchHabits = async () => {
	try {
		const response = await axios.get(`${HOST}/api/habits`);
		return response.data;
	} catch (error) {
		console.error('Error fetching habits', error);
		throw error;
	}
};

export const updateHabitGoal = async (id, newGoal) => {
	try {
		const response = await axios.put(`${HOST}/api/habits/${id}`, { goal: newGoal });
		return response.data;
	} catch (error) {
		console.error('Error updating habit goal', error);
		throw error;
	}
};

export async function updateHabitName(habitId, newName) {
	try {
		const response = await fetch(`${HOST}/api/habits/${habitId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: newName }),
		});

		if (!response.ok) throw new Error('Failed to update habit name');
		return await response.json();
	} catch (error) {
		console.error('Error updating habit name:', error);
		throw error;
	}
}
