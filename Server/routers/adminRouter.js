const AdminController = require("../controller/AdminController");
const GuardAdmin = require("../middlewares/GuardAdmin");


const router = require("express").Router();



router.put("/add-admin/:id", GuardAdmin, AdminController.addAdmin);
router.put("/turn-into-user/:id", GuardAdmin, AdminController.turnIntoUser);
router.get("/all-users", GuardAdmin, AdminController.getUsers);
router.put("/ban/:id", GuardAdmin, AdminController.banned);
router.put("/unban/:id", GuardAdmin, AdminController.Unbanned);
router.delete("/delete/:id", GuardAdmin, AdminController.removeUser);
router.get("/all-histories", GuardAdmin, AdminController.getAllHistories);

module.exports = router