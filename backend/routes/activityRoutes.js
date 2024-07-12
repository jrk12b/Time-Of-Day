const express = require('express');
const Activity = require('../models/activityModel');

const router = express.Router();

// API endpoint to GET all activities
router.get('/activities', async (req, res) => {
	try {
		// Find all the activities and return the json
		const activities = await Activity.find();
		res.json(activities);
	} catch (err) {
		res.status(500).send(err);
	}
});

// API endpoint to GET a single activity via id
router.get('/activities/:id', async (req, res) => {
	// Try to find the activity by id and return the json
	try {
		const activity = await Activity.findById(req.params.id);
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}
		res.json(activity);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// API endpoint to UPDATE a single activity via id
router.put('/activities/:id', async (req, res) => {
	// Try to find and update the activity. Return the json
	try {
		const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}
		res.json(activity);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// API endpoint to DELETE a single activity via id
router.delete('/activities/:id', async (req, res) => {
	// Try to find and delete the activity by id. Return the json
	try {
		const activity = await Activity.findByIdAndDelete(req.params.id);
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}
		res.json({ message: 'Activity deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// API endpoint to POST multiple activities
router.post('/activities', async (req, res) => {
	const { activities, timestamp } = req.body;

	// Try to create a new document in mongoDB using activities and timestamp data
	try {
		const newDocument = new Activity({ activities, timestamp });
		await newDocument.save();
		res.status(201).json(newDocument);
	} catch (error) {
		res.status(500).json({ error: 'Error saving activities' });
	}
});

// API endpoint to UPDATE a single activity by ID within one document.
// A document can contain many activities
router.put('/activities/:docId/activity/:activityId', async (req, res) => {
	const { docId, activityId } = req.params;
	const { name, hour } = req.body;
	try {
		// Try to find the document
		const activityDoc = await Activity.findById(docId);
		if (!activityDoc) {
			return res.status(404).json({ message: 'Activity document not found' });
		}

		// Within the document, find the specific activity
		const activity = activityDoc.activities.id(activityId);
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}

		// Update the activity name and hour
		activity.name = name;
		activity.hour = hour;

		// Save the updated document
		await activityDoc.save();

		res.json(activityDoc);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// API endpoint to DELETE a single activity by ID within one document.
// A document can contain many activities
router.delete('/activities/:docId/activity/:activityId', async (req, res) => {
	const { docId, activityId } = req.params;
	try {
		// Try to find the document
		const activityDoc = await Activity.findById(docId);
		if (!activityDoc) {
			return res.status(404).json({ message: 'Activity document not found' });
		}

		// Remove the specific activity from the activities array
		activityDoc.activities = activityDoc.activities.filter(
			(activity) => activity._id.toString() !== activityId
		);

		// Save the updated document
		await activityDoc.save();

		res.json(activityDoc);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
