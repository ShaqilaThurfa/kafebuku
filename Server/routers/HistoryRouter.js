const BorrowingHistories = require("../controller/BorrowingHistoryController");
const GuardAdmin = require("../middlewares/GuardAdmin");

const router = require("express").Router();



router.get("/histories", BorrowingHistories.UserHistory);
router.get("/admin/allhistories", GuardAdmin, BorrowingHistories.getAllHistories);

module.exports = router