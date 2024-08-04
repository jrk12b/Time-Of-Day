const express = require('express');
const Activity = require('../models/activityModel');

const router = express.Router();

/**
 * @swagger
 * /activities/names:
 *   get:
 *     summary: Get all distinct activity names
 *     description: Retrieve a list of all distinct activity names.
 *     responses:
 *       200:
 *         description: A list of distinct activity names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Server error
 */
router.get('/activities/names', async (req, res) => {
	try {
		// Get all distinct activity names
		const names = await Activity.distinct('activities.name');
		res.json(names);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities
 *     description: Retrieve a list of all activities.
 *     responses:
 *       200:
 *         description: A list of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   hour:
 *                     type: integer
 *                   _id:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/activities', async (req, res) => {
	try {
		// Find all the activities and return the json
		const activities = await Activity.find();
		res.json(activities);
	} catch (err) {
		res.status(500).send(err);
	}
});

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Get a single activity by ID
 *     description: Retrieve an activity by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested activity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 hour:
 *                   type: integer
 *                 _id:
 *                   type: string
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.get('/activities/:id', async (req, res) => {
	// Try to find the activity by id and return the json
	try {
		const activity = await Activity.findById(req.params.id);
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}
		res.json(activity);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /activities/{id}:
 *   put:
 *     summary: Update an activity by ID
 *     description: Update the details of an activity by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               hour:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated activity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 hour:
 *                   type: integer
 *                 _id:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.put('/activities/:id', async (req, res) => {
	// Try to find and update the activity. Return the json
	try {
		const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}
		res.json(activity);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Delete an activity by ID
 *     description: Remove an activity from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.delete('/activities/:id', async (req, res) => {
	// Try to find and delete the activity by id. Return the json
	try {
		const activity = await Activity.findByIdAndDelete(req.params.id);
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}
		res.json({ message: 'Activity deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create new activities
 *     description: Add new activities to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     hour:
 *                       type: integer
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: The created activity document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       hour:
 *                         type: integer
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 _id:
 *                   type: string
 *       500:
 *         description: Error saving activities
 */
router.post('/activities', async (req, res) => {
	const { activities, timestamp } = req.body;

	// Try to create a new document in mongoDB using activities and timestamp data
	try {
		const newDocument = new Activity({ activities, timestamp });
		await newDocument.save();
		res.status(201).json(newDocument);
	} catch (error) {
		res.status(500).json({ error: 'Error saving activities' });
	}
});

/**
 * @swagger
 * /activities/{docId}/activity/{activityId}:
 *   put:
 *     summary: Update a specific activity within a document
 *     description: Update an activity within a document by its ID.
 *     parameters:
 *       - in: path
 *         name: docId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               hour:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       hour:
 *                         type: integer
 *                 _id:
 *                   type: string
 *       404:
 *         description: Document or activity not found
 *       500:
 *         description: Server error
 */
router.put('/activities/:docId/activity/:activityId', async (req, res) => {
	const { docId, activityId } = req.params;
	const { name, hour } = req.body;
	try {
		// Try to find the document
		const activityDoc = await Activity.findById(docId);
		if (!activityDoc) {
			return res.status(404).json({ message: 'Activity document not found' });
		}

		// Within the document, find the specific activity
		const activity = activityDoc.activities.id(activityId);
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}

		// Update the activity name and hour
		activity.name = name;
		activity.hour = hour;

		// Save the updated document
		await activityDoc.save();

		res.json(activityDoc);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /activities/{docId}/activity/{activityId}:
 *   delete:
 *     summary: Delete a specific activity within a document
 *     description: Remove a specific activity by its ID from a document that contains multiple activities.
 *     parameters:
 *       - in: path
 *         name: docId
 *         required: true
 *         description: The ID of the document that contains the activity.
 *         schema:
 *           type: string
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: The ID of the activity to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated document after removing the activity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       hour:
 *                         type: integer
 *       404:
 *         description: Document or activity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/activities/:docId/activity/:activityId', async (req, res) => {
	const { docId, activityId } = req.params;
	try {
		// Try to find the document
		const activityDoc = await Activity.findById(docId);
		if (!activityDoc) {
			return res.status(404).json({ message: 'Activity document not found' });
		}

		// Remove the specific activity from the activities array
		activityDoc.activities = activityDoc.activities.filter(
			(activity) => activity._id.toString() !== activityId
		);

		// Save the updated document
		await activityDoc.save();

		res.json(activityDoc);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
