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

export const updateHabitProgress = async (id, date, value) => {
	const response = await fetch(`${HOST}/api/habits/${id}/progress`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ date, value }),
	});

	if (!response.ok) {
		throw new Error('Failed to update habit progress');
	}

	return response.json();
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

export const deleteHabit = async (habitId) => {
	console.log(habitId);
	const response = await fetch(`${HOST}/api/habits/${habitId}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		throw new Error('Failed to delete habit');
	}
};

export const updateHabitOrder = async (orderedHabits) => {
	const response = await fetch(`${HOST}/api/habits/reorder`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ habits: orderedHabits }),
	});
	if (!response.ok) throw new Error('Failed to update habit order');
};

export const getMonthlyNotes = async (monthKey) => {
  try {
    const response = await axios.get(`${HOST}/api/habits/monthly-notes/${monthKey}`);
    return response.data.notes;
  } catch (error) {
    console.error('Error fetching monthly notes:', error);
    throw error;
  }
};

export const updateMonthlyNotes = async (monthKey, notes) => {
  try {
    const response = await axios.put(`${HOST}/api/habits/monthly-notes/${monthKey}`, { notes });
    return response.data;
  } catch (error) {
    console.error('Error updating monthly notes:', error);
    throw error;
  }
};
