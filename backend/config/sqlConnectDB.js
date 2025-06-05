import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_SQL_HOST,
  user: process.env.DB_SQL_USER,
  password: process.env.DB_SQL_PASS,
  database: process.env.DB_SQL_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_SQL_CONNECTION_LIMIT,
  queueLimit: 0,
});

const testConnect = async () => {
  const bold = (text) => `\x1b[1m${text}\x1b[0m`;
  try {
    const connection = await pool.getConnection();
    console.log(bold("--→ Connected MySQL ✅"));
    connection.release();
  } catch (err) {
    console.error(bold("🚫 --→ Connection error MySQL:"), err);
  }
};

testConnect();

export default pool;
