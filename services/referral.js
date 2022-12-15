const { Referral: DB } = require("../models/referral");
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

  /**
   * Finds referrer of user. If user has no referree, returns null
   * @param {number} userId 
   * @returns {Promise<*>} User info or null. For example:
   * ```
   *  {name: "Olga", username: "olga_best", userId: 123456789}
   * ``` 
   */
  getAncestor(userId) {
    return this.DBService.getAncestor(userId);
  }

  addUser(userId, ancestorId) {
    return this.DBService.addUser(userId, ancestorId);
  }

  transaction(userId, amount, level) {

  }
}

module.exports.Referral = Referral
