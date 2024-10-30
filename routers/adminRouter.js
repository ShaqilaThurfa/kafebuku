const AdminController = require("../controller/AdminController");


const router = require("express").Router();



router.post("/admin/add-admin", AdminController.addAdmin);
router.get("/admin/all-users", AdminController.getUsers);
router.put("/admin/ban/userId", AdminController.banned);
router.post("/admin/delete/userId", AdminController.removeUser);

module.exports = router