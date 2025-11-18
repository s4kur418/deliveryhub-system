import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const createOrder = (req, res) => {
  const { customer_id, pickup_address, delivery_address, items, notes, total_amount } = req.body;

  const sql = `
    INSERT INTO orders (customer_id, pickup_address, delivery_address, items, notes, total_amount)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [customer_id, pickup_address, delivery_address, items, notes || null, total_amount], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', err });
    res.status(201).json({ message: 'Order created', orderId: result.insertId });
  });
};
