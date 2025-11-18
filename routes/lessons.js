const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

// GET /lessons - return all lessons as JSON
router.get('/', async (req, res) => {
  try {
    const lessons = await getDB().collection('lesson').find({}).toArray();
    res.json(lessons);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// PUT /lessons/:id - update any fields in a lesson
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const result = await getDB()
      .collection('lesson')
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ matched: result.matchedCount, modified: result.modifiedCount });
  } catch (e) {
    res.status(400).json({ error: 'Failed to update lesson' });
  }
});

module.exports = router;
