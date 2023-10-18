const validate = (req, res, next) => {
  if (req.body.email && req.body.password) {
    return next();
  }
  return res.status(401).json({
    success: false,
    data: {},
    err: "Empty fields",
    message: "Both email and password are mandatory",
  });
};

module.exports = {
  validate,
};
