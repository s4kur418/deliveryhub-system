import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const getAllRiders = (req, res) => {
  const sql = "SELECT id, name FROM riders";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", err });

    res.json(rows);
  });
};