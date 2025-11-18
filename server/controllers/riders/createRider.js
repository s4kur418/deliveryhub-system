import bcrypt from 'bcrypt'
import { db_connection } from "../../lib/db.js";
const db = db_connection();

export const createRider = (req, res) => {
  const { name, email, password, phone, vehicleType, vehicleNumber } = req.body;

  const checkSql = "SELECT * FROM riders WHERE email = ?";
  
  db.query(checkSql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", err });
    
    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertSql = "INSERT INTO riders (rider_name, email, password, phone_number, vehicle_type, vehicle_number) VALUES (?, ?, ?, ?, ?, ?)";
      
      db.query(insertSql, [name, email, hashedPassword, phone, vehicleType, vehicleNumber], (err, result) => {
        if (err) return res.status(500).json({ message: "DB error", err });
        res.json({ message: "Rider created", id: result.insertId });
      });

    } catch (hashError) {
      console.error(hashError);
      res.status(500).json({ message: "Error hashing password" });
    }
  });
};
