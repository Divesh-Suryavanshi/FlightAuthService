const UserService = require("../services/user-service");
const service = new UserService();

const createUser = async (req, res) => {
  try {
    const response = await service.createUser({
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

const isAdmin = async (req, res) => {
  try {
    const result = await service.isAdmin(req.body.id);
    let message;
    if (result) {
      message = "User is an admin";
    }
    return res.status(200).json({
      success: true,
      data: result,
      err: {},
      message: message || "User is not an admin",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      err: error,
      message: "Unable to check whether a user is admin or not",
    });
  }
};

module.exports = {
  createUser,
  signIn,
  isAuthenticated,
  isAdmin,
};
