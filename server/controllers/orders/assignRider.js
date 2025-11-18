import { db_connection } from "../../lib/db.js";
const db = db_connection();

export const assignRider = (req, res) => {
  const { orderId } = req.params;
  const { rider_id } = req.body;

  const sql = "UPDATE orders SET rider_id = ?, status = 'assigned' WHERE id = ?";
  
  db.query(sql, [rider_id, orderId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", err });

    res.json({ message: "Rider assigned successfully", orderId, rider_id });
  });
};