const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: String,
    hour: Number,
});

const activityDocumentSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    activities: [activitySchema],
});

module.exports = mongoose.model('Activities', activityDocumentSchema);