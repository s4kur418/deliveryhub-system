import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const deleteOrder = (req, res) => {
  const sql = `DELETE FROM orders WHERE id = ?`;
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Database error', err });
    res.json({ message: 'Order deleted' });
  });
};
