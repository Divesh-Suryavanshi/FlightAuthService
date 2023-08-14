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
}

module.exports = UserService;
