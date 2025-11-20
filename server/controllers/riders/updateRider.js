import { db_connection } from "../../lib/db.js";
const db = db_connection();

export const updateRider = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, vehicleType, vehicleNumber } = req.body;

  const sql =
    "UPDATE riders SET name=?, email=?, phone=?, vehicleType=?, vehicleNumber=? WHERE id=?";

  db.query(sql, [name, email, phone, vehicleType, vehicleNumber || "available", id], (err) => {
    if (err) return res.status(500).json({ message: "DB error", err });
    res.json({ message: "Rider updated" });
  });
};