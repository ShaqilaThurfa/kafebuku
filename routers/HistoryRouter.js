const BorrowingHistories = require("../controller/BorrowingHistoryController");
const GuardAdmin = require("../middlewares/GuardAdmin");

const router = require("express").Router();



router.post("/createhistory", BorrowingHistories.createhistory);
router.put("/returningbook/:bookId", BorrowingHistories.returned);
router.get("/histories", BorrowingHistories.UserHistory);
router.get("/admin/allhistories", GuardAdmin, BorrowingHistories.getAllHistories);

module.exports = router