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

const signIn = async (req, res) => {
  try {
    const response = await service.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      success: true,
      data: { token: response },
      err: {},
      message: "Signed in successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      err: error,
      message: "Sign in failed",
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers.authorization.slice(7);
    // console.log(token);
    const user = await service.verifyToken(token);
    console.log("authenticated?: ", user);
    return res.status(200).json({
      success: true,
      data: { id: user.id },
      err: {},
      message: "Authentication check successfull",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      err: error,
      message: "Authentication check failed",
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
};
