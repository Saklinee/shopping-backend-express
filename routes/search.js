const express = require('express');
const { getDB } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);

    const isNum = !isNaN(Number(q));
    const or = [
      { topic: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } }
    ];
    if (isNum) {
      const n = Number(q);
      or.push({ price: n });
      or.push({ space: n });
    }

    const results = await getDB().collection('lesson').find({ $or: or }).toArray();
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
