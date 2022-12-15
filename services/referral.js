const { DB } = require("../models/db");
const config = require("../config")

class Referral {
  constructor() {
    this.DBService = new DB();
  }

  getReferralLink(userId){
    return `https://t.me/${config.botName}?start=reff${userId}`
  }

  /**
   * 
   * @param {number} userId Telegram id of user who is asking for referrals
   * @returns {Object[5][]} User info of referrals up to 5th level. For example: 
   * ```
   * [
   *    {children: [{name: "Olga", username: "olga_best", userId: 123456789}], level: 1}, 
   *    {children: [], level: 2},
   *    ...
   * ]
   * ```
   */
  getChildren(userId) {
    return this.DBService.getChildren(userId);
  }

  getAncestor(userId) {
    return this.DBService.getAncestor();
  }

  addUser(userId, ancestorId) {
    return this.DBService.addUser(userId, ancestorId);
  }

  /**
   * Recursive function to 
   * @param {number} userId Telegram id of user who did this transaction
   * @param {*} amount Amount of money to be transferred
   * @param {*} level Level of
   */
  transaction(userId, amount, level) {

  }
}
