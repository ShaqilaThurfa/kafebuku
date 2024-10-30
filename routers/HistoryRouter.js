const BorrowingHistories = require("../controller/BorrowingHistoryController");
const GuardAdmin = require("../middlewares/GuardAdmin");

const router = require("express").Router();



router.post("/user/createhistory", BorrowingHistories.createhistory);
router.put("/user/returningbook", BorrowingHistories.returned);
router.get("/user/histories", BorrowingHistories.UserHistory);
router.get("/admin/allhistories", GuardAdmin, BorrowingHistories.getAllHistories);

module.exports = router