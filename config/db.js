import dotenv from 'dotenv'
dotenv.config()
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.getConnection().then(connection => { 
  console.log('DB is connected');
  connection.release();
}).catch(err => {
  console.log('DB connection failed \n Error: ' + err.message);
});
export default pool;
