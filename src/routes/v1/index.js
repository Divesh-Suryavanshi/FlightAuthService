const router = require("express").Router();

const userController = require("../../controllers/user-controller");

// middlewares import
const {
  validateAuthRequest,
  validateIsAdminRequest,
  validateIsAuthenticatedRequest,
} = require("../../middlewares");

// create user
router.post("/user", validateAuthRequest, userController.createUser);

// signin
router.post("/user/signin", validateAuthRequest, userController.signIn);

// is Authenticated
router.get(
  "/isauthenticated",
  validateIsAuthenticatedRequest,
  userController.isAuthenticated
);

// is Admin
router.get("/isAdmin", validateIsAdminRequest, userController.isAdmin);

module.exports = router;
