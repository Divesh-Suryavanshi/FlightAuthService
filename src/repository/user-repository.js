const { User } = require("../models/");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
