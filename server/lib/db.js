import mysql from "mysql"
import dotenv from 'dotenv'
dotenv.config();

let conn;
const connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME
};

export const db_connection = () => {
    if (!conn) {
        conn = mysql.createConnection({
            host: connection.host,
            user: connection.user,
            password: connection.password,
            database: connection.db_name
        });
    }
    return conn;
}