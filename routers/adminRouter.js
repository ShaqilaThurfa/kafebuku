const AdminController = require("../controller/AdminController");
const GuardAdmin = require("../middlewares/GuardAdmin");


const router = require("express").Router();



router.post("/add-admin", GuardAdmin, AdminController.addAdmin);
router.get("/all-users", GuardAdmin, AdminController.getUsers);
router.put("/ban/userId", GuardAdmin, AdminController.banned);
router.post("/delete/userId", GuardAdmin, AdminController.removeUser);

module.exports = router