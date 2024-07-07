import axios from 'axios';
const { PORT } = require('../config');

export const fetchActivities = async () => {
	try {
		const response = await axios.get(`http://localhost:${PORT}/api/activities`);
		return response.data;
	} catch (error) {
		console.error('Error fetching activities', error);
		throw error;
	}
};

export const handleAddOrUpdate = async (editId, name, hours, activities, setActivities) => {
	try {
		if (editId) {
			const response = await axios.put(`http://localhost:${PORT}/api/activities/${editId}`, {
				name,
				hours,
			});
			setActivities(activities.map((activity) => (activity._id === editId ? response.data : activity)));
			return null;
		} else {
			const response = await axios.post(`http://localhost:${PORT}/api/activities`, {
				name,
				hours,
			});
			setActivities([...activities, response.data]);
		}
	} catch (error) {
		console.error('Error saving activity', error);
		throw error;
	}
};

export const handleEdit = (activity, setName, setHours, setEditId) => {
	setName(activity.name);
	setHours(activity.hours);
	setEditId(activity._id);
};

export const handleDelete = async (id, activities, setActivities) => {
	try {
		await axios.delete(`http://localhost:${PORT}/api/activities/${id}`);
		setActivities(activities.filter((activity) => activity._id !== id));
	} catch (error) {
		console.error('Error deleting activity', error);
		throw error;
	}
};
