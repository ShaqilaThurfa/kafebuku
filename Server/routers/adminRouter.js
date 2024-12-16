const AdminController = require("../controller/AdminController");
const GuardAdmin = require("../middlewares/GuardAdmin");


const router = require("express").Router();



router.post("/add-admin", GuardAdmin, AdminController.addAdmin);
router.get("/all-users", GuardAdmin, AdminController.getUsers);
router.put("/ban/:id", GuardAdmin, AdminController.banned);
router.put("/unban/:id", GuardAdmin, AdminController.Unbanned);
router.delete("/delete/:id", GuardAdmin, AdminController.removeUser);
router.get("/all-histories", GuardAdmin, AdminController.getAllHistories);

module.exports = router