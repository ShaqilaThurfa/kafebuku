const { BorrowingHistory } = require("../models");

module.exports = class BorrowingHistories {
  static async createhistory(req, res, next) {
    const { bookId, title } = req.body;
    try {
      const history = await BorrowingHistory.create({
        userId: req.user.id,
        bookId,
        title,
        borrowed_at: new Date(),
        returned_at: null,
      });

      res.status(201).json(history);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async returned(req, res, next) {
    const { bookId } = req.body;
    const userId = req.user.id;

    try {
      const history = await BorrowingHistory.findOne({
        where: { bookId, userId, returned_at: null },
      });
      if (!history) {
        throw { name: "NotFound", message: "Borrowing record not found" };
      }
      await history.update({
        returned_at: new Date(),
      });
      res
        .status(200)
        .json({ message: "Book has been returned", data: history });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

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

  static async getAllHistories(req, res, next) {
    
    try {
      const history = await BorrowingHistory.findAll();
      res
        .status(200)
        .json(history);

    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
