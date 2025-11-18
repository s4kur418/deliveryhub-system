import bcrypt from 'bcrypt'
import { db_connection } from '../../lib/db.js';
const db = db_connection();

export const login = (req, res) => {
    const { email, password } = req.body;

    const adminQuery = "SELECT * FROM admin WHERE email = ?";
    db.query(adminQuery, [email], async (err, adminResult) => {
        if (err) return res.status(500).json({ message: "Database error" });
        
        if (adminResult.length > 0) {
            const admin = adminResult[0];

            try {
                const match = await bcrypt.compare(password, admin.password);

                if (!match) {
                    return res.status(401).json({ message: "Incorrect password" });
                }

                req.session.user = {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: "admin",
                };
                return res.json({
                    message: "Admin login successful",
                    user: req.session.user,
                });
            } catch (compareError) {
                console.error(compareError);
                res.status(500).json({ message: "Error verifying password" });
            }
            
        } else {
            const userQuery = "SELECT * FROM customers WHERE email = ?";
            db.query(userQuery, [email], async (err, userResult) => {
                if (err) return res.status(500).json({ message: "Database error" });

                if (userResult.length > 0) {
                    const user = userResult[0];
    
                    try {
                        const match = await bcrypt.compare(password, user.password);
    
                        if (!match) {
                            return res.status(401).json({ message: "Incorrect password" });
                        }
    
                        req.session.user = {
                            id: user.id,
                            name: user.customer_name,
                            email: user.email,
                            address: user.address,
                            phone_number: user.phone_number,
                            role: "user",
                        };
    
                        res.json({
                            message: "Login successful",
                            user: req.session.user,
                        });
                    } catch (compareError) {
                        console.error(compareError);
                        res.status(500).json({ message: "Error verifying password" });
                    }
                    
                } else {
                    const riderQuery = "SELECT * FROM riders WHERE email = ?";
                    db.query(riderQuery, [email], async (err, riderResult) => {
                        if (err) return res.status(500).json({ message: "Database error" });

                        if (riderResult.length > 0) {
                            const rider = riderResult[0];
                            
                            try {
                                const match = await bcrypt.compare(password, rider.password);
                                if (!match) return res.status(401).json({ message: "Incorrect password" });

                                req.session.user = {
                                    id: rider.id,
                                    name: rider.rider_name,
                                    email: rider.email,
                                    phone_number: rider.phone_number,
                                    role: "rider",
                                };

                                return res.json({
                                    message: "Rider login successful",
                                    user: req.session.user,
                                });
                            } catch (compareError) {
                                console.error(compareError);
                                return res.status(500).json({ message: "Error verifying password" });
                            }
                        } else {
                            return res.status(401).json({ message: "Email not found" });
                        }
                    });
                }
            });
        }
    });
}