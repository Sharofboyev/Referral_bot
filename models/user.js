const pool = require("./index");
class User {
  constructor(){
    this.pool = pool
  }

  async create(userId, name, username){
    await this.pool.query(`INSERT INTO users (id, name, username) 
    VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING`, [userId, name, username]);
  }

  async get (userId){
    let res = await this.pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (res.rowCount > 0) return res.rows[0]
    else return null;
  }
}

module.exports.User = User