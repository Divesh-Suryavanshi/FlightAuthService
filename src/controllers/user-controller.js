const UserService = require("../services/user-service");
const service = new UserService();

const create = async (req, res) => {
  try {
    const response = await service.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: response,
      error: {},
      message: "Successfully created a user",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      error,
      message: "Successfully created a user",
      success: true,
    });
  }
};

module.exports = {
  create,
};