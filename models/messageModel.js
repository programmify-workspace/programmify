const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

function saveMessage(messageData) {
  const { full_name, email } = messageData;

  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO messages (full_name, email) VALUES (?, ?)';
    const values = [full_name, email];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error saving message to MySQL:', error);
        reject(error);
      } else {
        console.log('Message saved to MySQL');
        resolve(results);
      }
    });
  });
}

function getWaitlistCount() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS waitlistCount FROM messages';

    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching waitlist count from MySQL:', error);
        reject(error);
      } else {
        const waitlistCount = results[0].waitlistCount;
        console.log('Waitlist count retrieved from MySQL:', waitlistCount);
        resolve(waitlistCount);
      }
    });
  });
}

module.exports = { saveMessage, getWaitlistCount };
