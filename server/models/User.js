const db = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    return db.execute(query, [username, email, hashedPassword]);
  }

  static async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  }
}

module.exports = User;
