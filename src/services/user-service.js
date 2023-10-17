const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SALT_ROUNDS, SECRET } = require("../config/serverConfig");

const UserRepository = require("../repository/user-repository");
const repository = new UserRepository();

class UserService {
  async create(data) {
    try {
      const response = await repository.create(data);
      return response;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async createToken(id) {
    try {
      const user = await this.getById(id);
      const token = jwt.sign(user, SECRET);
      console.log("token: ", token);
      return token;
    } catch (error) {
      console.log("Something went wrong while generating a token");
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const user = await repository.getByEmail(email);
      return user;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await repository.getById(id);
      return response;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.getByEmail(email);
      if (!user) {
        throw "User doesn't exists";
      }

      const isPasswordCorrect = bcrypt.compareSync(
        plainPassword,
        user.password
      );

      if (!isPasswordCorrect) {
        throw "Incorrect password";
      }

      const token = await this.createToken(email, user.id);
      return token;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }
}

module.exports = UserService;
