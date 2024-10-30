const UserBookListController = require("../controller/UserBookListController");
const Authentication = require("../middlewares/Authentication");
const NotBanned = require("../middlewares/NotBanned");

const router = require("express").Router();


router.post("/rentbook", Authentication, NotBanned,  UserBookListController.rentBook);
router.delete("/returnbook", Authentication, NotBanned, UserBookListController.returnBook);


module.exports = router