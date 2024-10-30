const UserBookListController = require("../controller/UserBookListController");

const router = require("express").Router();


router.post("/user/rentbook", UserBookListController.rentBook);
router.delete("/user/returnbook", UserBookListController.returnBook);


module.exports = router