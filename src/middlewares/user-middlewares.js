const validate = (req, res, next) => {
  try {
    if (!req.body.email) {
      throw "email id is missing";
    }
    if (!req.body.password) {
      throw "password is missing";
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      err: error,
      message: "Both email id and password are mandatory",
    });
  }
};

module.exports = {
  validate,
};
