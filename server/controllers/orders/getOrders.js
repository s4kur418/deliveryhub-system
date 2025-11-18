import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const getOrders = (req, res) => {
  const sql = `
    SELECT o.*, 
           c.customer_name AS customerName, 
           d.rider_name AS riderName
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    LEFT JOIN riders d ON o.rider_id = d.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', err });
    res.json(results);
  });
};
