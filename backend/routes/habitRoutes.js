const express = require('express');
const Habit = require('../models/habitModel');

const router = express.Router();

router.get('/habits', async (req, res) => {
	try {
		// Find all the habits and return the json
		const habits = await Habit.find();
		res.json(habits);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post('/habits', async (req, res) => {
	try {
		const { name, goal } = req.body;

		const habit = new Habit({
			name,
			goal,
			progress: {},
		});

		await habit.save();
		res.status(201).json(habit);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.put('/habits/:id', async (req, res) => {
	try {
		const { name, goal } = req.body;

		const updatedHabit = await Habit.findByIdAndUpdate(
			req.params.id,
			{ ...(name && { name }), ...(goal && { goal }) },
			{ new: true }
		);

		res.json(updatedHabit);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
