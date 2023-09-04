const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});


function saveMessage(messageData, callback) {
  const { full_name, email } = messageData;

  const sql = 'INSERT INTO messages (full_name, email) VALUES (?, ?)';
  const values = [full_name, email];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error saving message to MySQL:', error);
      callback(error, null);
    } else {
      console.log('Message saved to MySQL');
      callback(null, results);
    }
  });
}

module.exports = { saveMessage };

