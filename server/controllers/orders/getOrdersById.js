import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const getOrdersById = (req, res) => {
  const { customer_id } = req.params;

  const sql = `SELECT o.*, 
           c.customer_name AS customerName, 
           d.rider_name AS riderName
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    LEFT JOIN riders d ON o.rider_id = d.id WHERE customer_id = ?`;
  db.query(sql, [customer_id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", err });

    res.json(rows);
  });
};