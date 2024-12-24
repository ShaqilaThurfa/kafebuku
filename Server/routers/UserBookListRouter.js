const UserBookListController = require("../controller/UserBookListController");
const Authentication = require("../middlewares/Authentication");
const NotBanned = require("../middlewares/NotBanned");

const router = require("express").Router();

router.get("/mybooklist", Authentication, UserBookListController.UserBookList)
router.post("/borrowbook", Authentication, NotBanned,  UserBookListController.rentBook);
router.put("/returnbook/:bookId", Authentication, NotBanned, UserBookListController.returned);


module.exports = router