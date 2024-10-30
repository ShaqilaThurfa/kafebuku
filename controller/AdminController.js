const { User } = require("../models");


module.exports = class AdminController {
  static async addAdmin(req, res, next) {
    const { fullName, email, Password, status } = req.body;

    try {
      await User.create({
        fullName,
        email,
        role: "Admin",
        Password,
        status,
      });

      res.status(201).json({ message: "Adding admin to this page" });
    } catch (error) {
      console.log(error);

      next(error);
      
    }
  }

  static async getUsers(req, res, next) {
    
    try {
      const users = await User.findAll();

      res.status(201).json(users);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async banned(req, res, next) {
    const { userId } = req.params.userId;
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      user.update({status: "banned"});
      

      res.status(200).json({ message: `User with ID ${userId} has been banned successfully.` });

    } catch (error) {
      console.error("Error banning user:", error);
    }
  }
  static async removeUser(req, res, next) {
    const { userId } = req.params.userId;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      await user.destroy();
      res.status(200).json({ message: `User with ID ${userId} has been removed successfully.` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
