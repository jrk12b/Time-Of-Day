const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
	name: { type: String, required: true },
	goal: { type: Number, required: false },
	createdAt: { type: Date, default: Date.now },
	progress: { type: Map, of: Boolean, default: {} },
	order: { type: Number, required: false, default: 0 },
	monthlyNotes: { type: Map, of: String, default: {} },
});

module.exports = mongoose.model('Habits', habitSchema);
