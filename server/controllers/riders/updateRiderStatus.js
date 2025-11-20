import { db_connection } from "../../lib/db.js";
const db = db_connection();

export const updateRiderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = "UPDATE riders SET status = ? WHERE id = ?";

    db.query(sql, [status, id], (err) => {
        if(err) res.status(500).json({ message: "Error updating rider status: " + err });

        res.json({ message: "Rider Status Updated" });
    })
};