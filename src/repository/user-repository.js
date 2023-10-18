const { User, Role } = require("../models/");

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

  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong at repository layer");
      throw error;
    }
  }

  async getRoleById(id) {
    try {
      const role = await Role.findByPk(id);
      return role;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw error;
    }
  }

  async getRoleByName(name) {
    try {
      const role = await Role.findOne({
        where: {
          name,
        },
      });
      return role;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
