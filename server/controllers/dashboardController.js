import { db_connection } from "../lib/db.js";
const db = db_connection();

export const getDashboardStats = (req, res) => {
  const stats = {};

  // Total Orders
  db.query("SELECT COUNT(*) AS total FROM orders", (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error", err });

    stats.totalOrders = rows[0].total;

    // Pending Orders
    db.query("SELECT COUNT(*) AS total FROM orders WHERE status = 'pending'", (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", err });

      stats.pendingOrders = rows[0].total;

      // Completed Orders
      db.query("SELECT COUNT(*) AS total FROM orders WHERE status = 'delivered'", (err, rows) => {
        if (err) return res.status(500).json({ message: "DB error", err });

        stats.completedOrders = rows[0].total;

        // Active Drivers
        db.query("SELECT COUNT(*) AS total FROM riders WHERE status != 'offline'", (err, rows) => {
          if (err) return res.status(500).json({ message: "DB error", err });

          stats.activeDrivers = rows[0].total;

          // Total Revenue
          db.query(
            "SELECT SUM(total_amount) AS revenue FROM orders WHERE status = 'delivered'",
            (err, rows) => {
              if (err) return res.status(500).json({ message: "DB error", err });

              stats.totalRevenue = rows[0].revenue || 0;

              // Today Orders
              db.query(
                "SELECT COUNT(*) AS total FROM orders WHERE DATE(order_date) = CURDATE()",
                (err, rows) => {
                  if (err) return res.status(500).json({ message: "DB error", err });

                  stats.todayOrders = rows[0].total;

                  res.json(stats);
                }
              );
            }
          );
        });
      });
    });
  });
};
