const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, phone, items } = req.body;
    if (!/^[A-Za-z\s]+$/.test(name) || !/^\d+$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid name or phone' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items required' });
    }
    const order = {
      name,
      phone,
      items: items.map(i => ({ lessonId: new ObjectId(i.lessonId), qty: Number(i.qty || 1) })),
      createdAt: new Date()
    };
    const result = await getDB().collection('order').insertOne(order);
    res.status(201).json({ _id: result.insertedId, ...order });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
