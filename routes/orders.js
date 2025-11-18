const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

// POST /orders - save a new order
router.post('/', async (req, res) => {
  try {
    const { name, phone, items } = req.body;

    // Basic validation of name and phone (same rules as frontend)
    if (!/^[A-Za-z\s]+$/.test(name) || !/^\d+$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid name or phone' });
    }

    // Items must be a non-empty array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items required' });
    }

    // Normalise and validate each item (lessonId + qty)
    const normalisedItems = items
      .map(i => {
        if (!i.lessonId) return null;

        let qty = Number(i.qty || 1);
        if (!Number.isFinite(qty) || qty <= 0) qty = 1;

        return {
          lessonId: new ObjectId(i.lessonId),
          qty
        };
      })
      .filter(Boolean);

    if (normalisedItems.length === 0) {
      return res.status(400).json({ error: 'No valid items provided' });
    }

    const order = {
      name,
      phone,
      items: normalisedItems,
      createdAt: new Date()
    };

    const result = await getDB().collection('order').insertOne(order);

    res.status(201).json({ _id: result.insertedId, ...order });
  } catch (e) {
    console.error('Create order error:', e);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
