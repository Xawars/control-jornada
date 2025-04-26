const pool = require("../db");

class User {
  static async findByEmail(email) {
    const { rows } = await pool.query(
      "SELECT id, name, email, password_hash, role FROM users WHERE email = $1",
      [email]
    );
    return rows[0] || null;
  }

  static async create({ name, email, password_hash, role }) {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role`,
      [name, email, password_hash, role]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  }
}

module.exports = User;
