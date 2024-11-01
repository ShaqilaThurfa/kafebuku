const AdminController = require("../controller/AdminController");
const GuardAdmin = require("../middlewares/GuardAdmin");


const router = require("express").Router();



router.post("/add-admin", GuardAdmin, AdminController.addAdmin);
router.get("/all-users", GuardAdmin, AdminController.getUsers);
router.put("/ban/:id", AdminController.banned);
router.post("/delete/:id", AdminController.removeUser);

module.exports = router