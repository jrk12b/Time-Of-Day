const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the activity schema
const activitySchema = new Schema({
	name: String,
	hour: Number,
});

// define the entire document, including a timestamp and activitySchema
const activityDocumentSchema = new Schema({
	timestamp: { type: Date, default: Date.now },
	activities: [activitySchema],
});

module.exports = mongoose.model('Activities', activityDocumentSchema);
