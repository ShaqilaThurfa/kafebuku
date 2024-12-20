const { User, BorrowingHistory } = require("../models");
const { Op, literal } = require("sequelize");

module.exports = class AdminController {
  static async turnIntoUser(req, res, next) {
    const id = req.params.id;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      await user.update({ role: "user" });
      await user.save();
      res
        .status(200)
        .json({ message: `User with ID ${id} has been turned into user.`, user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addAdmin(req, res, next) {
    const id = req.params.id;
    
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      await user.update({ role: "admin" });
      await user.save();
      res
        .status(200)
        .json({ message: `User with ID ${id} has been added as admin.`, user });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
        order: [["id", "ASC"]]
      });

      console.log(users);

      res.status(201).json(users);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async banned(req, res, next) {
    const id = req.params.id;

    try {
      // console.log(req.user.id, "ini apa");

      // console.log(id, 'ini id yang dibanned');

      const user = await User.findByPk(id);
      // console.log(user);
      if (id == req.user.id) {
        throw { name: "Forbidden", message: "You can't ban yourself" };
      }

      console.log(user.status, "dapet ga");

      if (user.status === "banned") {
        throw { name: "Forbidden", message: "You already banned this user" };
      }

      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      console.log("status orang", req.user.status);

      await user.update({ status: "banned" });

      await user.save();

      res
        .status(200)
        .json({ message: `User with ID ${id} has been banned successfully.` });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async Unbanned(req, res, next) {
    const id = req.params.id;
    try {
      const user = await User.findByPk(id);
      // console.log(user);

      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      await user.update({ status: "active" });
      await user.save();

      res
        .status(200)
        .json({ message: `User with ID ${id} has been banned successfully.` });
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  }

  static async removeUser(req, res, next) {
    console.log("ini id user", req.params.id);

    const id = req.params.id;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      await user.destroy();
      res
        .status(200)
        .json({ message: `User with ID ${id} has been removed successfully.` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllHistories(req, res, next) {
    try {
      const history = await BorrowingHistory.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "fullName", "email"], 
          },
        ],
        order: [
          [literal("returned_at IS NULL"), "DESC"], 
          ["returned_at", "DESC"], 
        ],
      });
      res.status(200).json(history);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
