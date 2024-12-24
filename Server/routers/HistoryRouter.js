const BorrowingHistories = require("../controller/BorrowingHistoryController");


const router = require("express").Router();



router.get("/histories", BorrowingHistories.UserHistory);


module.exports = router