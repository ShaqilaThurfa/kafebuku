const { BorrowingHistory } = require("../models");

module.exports = class BorrowingHistories {

  static async UserHistory(req, res, next) {
    const userId = req.user.id;

    try {
      const userHistories = await BorrowingHistory.findAll({
        where: { userId },
      });
      if (!userHistories) {
        throw { name: "NotFound", message: "You don't have any history yet" };
      }
      res
        .status(200)
        .json(userHistories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

};
