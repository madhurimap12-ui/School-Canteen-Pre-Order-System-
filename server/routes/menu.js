const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT * FROM categories WHERE is_active = true');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
});

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const [items] = await db.execute(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m 
      JOIN categories c ON m.category_id = c.id 
      WHERE m.is_available = true
      ORDER BY c.name, m.name
    `);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
});

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const [items] = await db.execute('SELECT * FROM menu_items WHERE id = ?', [req.params.id]);
    if (items.length === 0) return res.status(404).json({ message: 'Item not found!' });
    res.json(items[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
});

// Update menu item (admin)
router.put('/:id', async (req, res) => {
  try {
    const { is_available, price, name, description } = req.body;
    await db.execute(
      'UPDATE menu_items SET is_available = ?, price = ?, name = ?, description = ? WHERE id = ?',
      [is_available, price, name, description, req.params.id]
    );
    res.json({ message: 'Item updated successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
});

module.exports = router;
