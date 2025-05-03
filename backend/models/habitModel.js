const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
	name: { type: String, required: true },
	goal: { type: Number, required: false },
	createdAt: { type: Date, default: Date.now },
	progress: { type: Map, of: Boolean, default: {} },
});

module.exports = mongoose.model('Habits', habitSchema);
