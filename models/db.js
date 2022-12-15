const {Pool} = require("pg")
const config = require("../config");

class DB {
  constructor(){
    this.pool = new Pool(config.db);
  }

  getChildren(userId) {
    return this.pool.query(
      `SELECT ARRAY_AGG(json_build_object('name', users.name, 'username', users.username, 'userId', users.id)), distance AS level
      FROM referrals 
      LEFT JOIN users ON referrals.child_id = users.id 
      WHERE ancestor_id = $1
      GROUP BY distance
	    ORDER BY distance ASC`, [userId]
    )
  }

  async getAncestor(userId) {
    const res = await this.pool.query(
      `SELECT users.*
      FROM referrals
      LEFT JOIN users ON users.id = referrals.ancestor_id
      WHERE child_id = $1 AND distance = 1`, [userId]
    )
    
    if (res.rowCount > 0)
      return res.rows[0];
    else return null
  }

  async addUser(userId, ancestorId) {
    await this.pool.query(`INSERT INTO referrals (ancestor_id, child_id, distance) VALUES ($1, $1, 0)`, [userId]);
    await this.pool.query(`INSERT INTO referrals (ancestor_id, child_id, distance)
      SELECT ancestor_id, $1, distance + 1
      FROM referrals WHERE child_id = $2`, [userId, ancestorId]);
  }
}

module.exports.DB = DB;
