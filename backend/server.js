const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, MONGO_URI } = require('../frontend/src/config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const itemRoutes = require('./routes/itemRoutes');

// Use routes
app.use('/api', itemRoutes);

const port = PORT || PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
