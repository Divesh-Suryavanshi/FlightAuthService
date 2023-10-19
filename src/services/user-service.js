const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/serverConfig");

const UserRepository = require("../repository/user-repository");
const repository = new UserRepository();

class UserService {
  async createUser(data) {
    try {
      const response = await repository.createUser(data);
      return response;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async createToken(id) {
    try {
      const user = await this.getUserById(id);
      const token = jwt.sign({ email: user.email, id: user.id }, SECRET);
      return token;
    } catch (error) {
      console.log("Something went wrong while generating a token");
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await repository.getUserByEmail(email);
      return user;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const response = await repository.getUserById(id);
      return response;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.getUserByEmail(email);
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
      const token = await this.createToken(user.id);
      return { email: user.email, id: user.id, token };
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      let user = jwt.verify(token, SECRET);
      if (!user) {
        throw "Invalid token";
      }
      return user;
    } catch (error) {
      console.log("something went wrong in token authentication");
      throw error;
    }
  }

  async getRoleById(id) {
    try {
      const role = await repository.getRoleById(id);
      return role;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async isAdmin(id) {
    try {
      const admin = await repository.getRoleByName("admin");
      const user = await this.getById(id);
      const result = await user.hasRole(admin);
      return result;
    } catch (error) {
      console.log("something went wrong at repository layer");
      throw error;
    }
  }
}

module.exports = UserService;
