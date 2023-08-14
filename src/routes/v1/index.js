const router = require("express").Router();

const { create } = require("../../controllers/user-controller");

router.post("/user", create);

module.exports = router;
