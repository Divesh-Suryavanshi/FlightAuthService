const router = require("express").Router();

const userController = require("../../controllers/user-controller");

const userMiddleware = require("../../middlewares/user-middlewares");

// create user
router.post("/user", userMiddleware.validate, userController.create);

// signin
router.post("/user/signin", userMiddleware.validate, userController.signIn);

// is Authenticated
router.get("/isauthenticated", userController.isAuthenticated);

module.exports = router;
