const router = require("express").Router();

const userController = require("../../controllers/user-controller");

// create user
router.post("/user", userController.create);

// signin
router.post("/user/signin", userController.signIn);

// is Authenticated
router.get("/isauthenticated", userController.isAuthenticated);

module.exports = router;
