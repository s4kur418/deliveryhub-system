import bcrypt from 'bcrypt'
import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const signUp = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const name = `${firstname} ${lastname}`;

    const checkSql = "SELECT * FROM customers WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (result.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = "INSERT INTO customers (customer_name, email, password) VALUES (?, ?, ?)";
            const values = [name, email, hashedPassword];

            db.query(insertSql, values, (err) => {
                if (err) {
                    console.error("Error inserting data:", err);
                    return res.status(500).json({ message: "Database error" });
                }
                res.status(200).json({ message: "User registered successfully!" });
            });
        } catch (hashError) {
            console.error(hashError);
            res.status(500).json({ message: "Error hashing password" });
        }
    });
}