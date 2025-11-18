import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const updateOrder = (req, res) => {
  const { status, driver_id, delivery_date } = req.body;
  const sql = `
    UPDATE orders 
    SET status = ?, driver_id = ?, delivery_date = ? 
    WHERE id = ?
  `;
  db.query(sql, [status, driver_id || null, delivery_date || null, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Database error', err });
    res.json({ message: 'Order updated' });
  });
};
