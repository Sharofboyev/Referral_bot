const { User: UserDB } = require("../models/user");
const {Referral} = require("./referral")

class User {
  constructor() {
    this.DBService = new UserDB();
    this.ReferralService = new Referral()
  }

  async create(userId, username, name){
    await this.DBService.create(userId, name, username);
  }

  async get(userId){
    return this.DBService.get(userId);
  }
}

module.exports.User = User