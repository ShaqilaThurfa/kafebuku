const BorrowingHistories = require("../controller/BorrowingHistoryController");

const router = require("express").Router();

router.post("/users/createhistory", BorrowingHistories.createhistory);
router.put("/users/returningbook", BorrowingHistories.returned);
router.get("/users/histories", BorrowingHistories.UserHistory);
router.get("/admin/histories", BorrowingHistories.getAllHistories);

module.exports = router