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

module.exports = router;
