const validateIsAuthenticatedRequest = (req, res, next) => {
  try {
    if (!req.headers.authorisation) {
      throw "auth token is missing";
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      err: error,
      message: "Unable to check whether user is authenticated or not",
    });
  }
};

module.exports = validateIsAuthenticatedRequest;
