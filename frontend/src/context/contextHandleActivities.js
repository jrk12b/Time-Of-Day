import axios from 'axios';

// Handles adding or updating multiple activities in the application.
const handleSubmitActivities = async (activities, port) => {
	try {
		const timestamp = new Date();
		const response = await axios.post(`http://localhost:${port}/api/activities`, {
			activities,
			timestamp,
		});
		console.log('Activities submitted:', response.data);
	} catch (error) {
		console.error('Error submitting activities', error);
	}
};

export { handleSubmitActivities };
