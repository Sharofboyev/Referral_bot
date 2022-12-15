const { DB } = require("../models/db");

class Referral {
  constructor() {
    this.DBService = new DB();
  }

  getChildren(userId) {
    return this.DBService.getChildren();
  }

  getAncestor(userId) {
    return this.DBService.getAncestor();
  }

  addUser(userId, ancestorId) {
    return this.DBService.addUser(userId, ancestorId);
  }

  transaction(userId, amount) {}
}
