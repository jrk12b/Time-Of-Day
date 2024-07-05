const express = require('express');
const Item = require('../models/itemModel');

const router = express.Router();

// API endpoint to get data
router.get('/items', async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Get a single item by ID
router.get('/items/:id', async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}
		res.json(item);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Create a new item
router.post('/items', async (req, res) => {
	try {
		const newItem = new Item(req.body);
		const savedItem = await newItem.save();
		res.status(201).json(savedItem);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Update an item by ID
router.put('/items/:id', async (req, res) => {
	try {
		const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}
		res.json(item);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete an item by ID
router.delete('/items/:id', async (req, res) => {
	try {
		const item = await Item.findByIdAndDelete(req.params.id);
		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}
		res.json({ message: 'Item deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
