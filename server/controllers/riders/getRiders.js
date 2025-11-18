import { db_connection } from "../../lib/db.js";
const db = db_connection();

export const getRiders = (req, res) => {
  const sql = "SELECT * FROM riders ORDER BY id DESC";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error", err });
    res.json(rows);
  });
};