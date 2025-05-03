const express = require('express');
const Habit = require('../models/habitModel');

const router = express.Router();

router.get('/habits/', async (req, res) => {
	try {
		const names = await Habit.distinct('activities.name');
		res.json(names);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/habits', async (req, res) => {
	try {
		const { name, goal } = req.body;

		const habit = new Habit({
			name,
			goal,
			progress: {}, // start with no progress
		});

		await habit.save();
		res.status(201).json(habit);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
