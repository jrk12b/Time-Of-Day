const express = require('express');
const Activity = require('../models/activityModel');

const router = express.Router();

// API endpoint to get activities
router.get('/activities', async (req, res) => {
	try {
		const activities = await Activity.find();
		res.json(activities);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Get a single activity by ID
router.get('/activities/:id', async (req, res) => {
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

// Update an activity by ID
router.put('/activities/:id', async (req, res) => {
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

// Delete an activity by ID
router.delete('/activities/:id', async (req, res) => {
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

// Endpoint to handle adding multiple activities
router.post('/activities', async (req, res) => {
    const { activities, timestamp } = req.body;

    try {
        const newDocument = new Activity({ activities, timestamp });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ error: 'Error saving activities' });
    }
});

module.exports = router;
