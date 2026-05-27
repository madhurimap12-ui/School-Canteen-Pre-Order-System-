const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided!' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token!' });
  }
};

// Place new order
router.post('/', verifyToken, async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { items, total_amount } = req.body;

    const [orderResult] = await conn.execute(
      'INSERT INTO orders (user_id, total_amount, status, payment_status) VALUES (?, ?, "confirmed", "completed")',
      [req.user.id, total_amount]
    );
    const orderId = orderResult.insertId;

    for (const item of items) {
      await conn.execute(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
        [orderId, item.menu_item_id, item.quantity, item.price_at_purchase]
      );
    }

    await conn.commit();
    res.status(201).json({ id: orderId, total_amount, status: 'confirmed' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: 'Failed to place order!', error: err.message });
  } finally {
    conn.release();
  }
});

// Get my orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC',
      [req.user.id]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
});

// Get all orders (admin)
router.get('/all', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied!' });
    }
    const [orders] = await db.execute(
      'SELECT o.*, u.first_name, u.last_name, u.email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.order_date DESC'
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
});

// Update order status (admin)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied!' });
    }
    const { status } = req.body;
    await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message });
  }
});

module.exports = router;