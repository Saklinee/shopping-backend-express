const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lessons = await getDB().collection('lesson').find({}).toArray();
    res.json(lessons);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await getDB().collection('lesson')
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    res.json({ matched: result.matchedCount, modified: result.modifiedCount });
  } catch (e) {
    res.status(400).json({ error: 'Failed to update lesson' });
  }
});

module.exports = router;
