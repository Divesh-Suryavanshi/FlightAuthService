require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
};
