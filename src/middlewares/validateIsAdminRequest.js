const validateIsAdminRequest = (req, res, next) => {
  try {
    if (!req.body.id) {
      throw "user id is missing";
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      err: error,
      message: "User id is necessary to check whether a user is admin or not",
    });
  }
};

module.exports = validateIsAdminRequest;
