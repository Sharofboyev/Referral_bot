require("dotenv").config();

module.exports = {
  token: process.env.BOT_TOKEN,
  botName: process.env.BOT_NAME,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};
