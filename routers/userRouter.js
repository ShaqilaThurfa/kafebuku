const UserController = require("../controller/UserController");




const router = require("express").Router();



router.post("/user/register", UserController.register);
router.post("/user/login", UserController.login);

module.exports = router