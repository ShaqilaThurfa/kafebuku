const UserController = require("../controller/UserController");


// const UserController = require("../controller/UserController");

const router = require("express").Router();



router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googlelogin', UserController.googleLogin);

module.exports = router