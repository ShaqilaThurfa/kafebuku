const UserController = require("../controller/UserController");

const router = require("express").Router();

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login)

module.exports = router