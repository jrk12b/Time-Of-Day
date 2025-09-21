const express = require('express');
const Habit = require('../models/habitModel');

const router = express.Router();

router.get('/habits', async (req, res) => {
	try {
		// Find all habits, sorted by the `order` field in ascending order
		const habits = await Habit.find().sort({ order: 1 });
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

router.patch('/habits/:id/progress', async (req, res) => {
	try {
		const { date, value } = req.body;

		const habit = await Habit.findById(req.params.id);
		if (!habit) return res.status(404).send('Habit not found');

		habit.progress.set(date, value);
		await habit.save();

		res.json(habit);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete('/habits/:id', async (req, res) => {
	try {
		const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
		if (!deletedHabit) {
			return res.status(404).json({ message: 'Habit not found' });
		}
		res.json({ message: 'Habit deleted successfully' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/habits/reorder', async (req, res) => {
	try {
		const { habits } = req.body;

		const bulkOps = habits.map(({ id, order }) => ({
			updateOne: {
				filter: { _id: id },
				update: { order },
			},
		}));

		await Habit.bulkWrite(bulkOps);

		res.json({ message: 'Habit order updated successfully' });
	} catch (err) {
		console.error('Error updating habit order:', err);
		res.status(500).json({ message: 'Failed to update habit order' });
	}
});

// GET monthly notes for a specific monthKey
router.get('/habits/monthly-notes/:monthKey', async (req, res) => {
	const { monthKey } = req.params;
	try {
		const habit = await Habit.findOne().sort({ createdAt: 1 });
		if (!habit || !habit.monthlyNotes) return res.json({ notes: '' });
		const notes = habit.monthlyNotes.get(monthKey) || '';
		res.json({ notes });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// UPDATE monthly notes for a specific monthKey
router.put('/habits/monthly-notes/:monthKey', async (req, res) => {
	const { monthKey } = req.params;
	const { notes } = req.body;
	try {
		const habit = await Habit.findOne().sort({ createdAt: 1 });
		if (!habit) return res.status(404).json({ message: 'Habit not found' });

		habit.monthlyNotes.set(monthKey, notes);
		await habit.save();
		res.json({ message: 'Notes updated' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
