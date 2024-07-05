const mongoose = require('mongoose');

// mongodb database schema
const itemSchema = new mongoose.Schema({
	name: String,
	description: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
