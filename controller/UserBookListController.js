
const { UserBookList } = require("../models");

module.exports = class UserBookListController{
  static async rentBook(req, res, next) {
    const { bookId, title, author, coverUrl, description } = req.body;
    try {
      const booklist = await UserBookList.create({
        userId: req.user.id,
        bookId,
        title,
        author,
        coverUrl,
        description,
        status: "borrowed",
        added_at: new Date(),
      });

      res.status(201).json(booklist);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async returnBook(req, res, next) {
    const { bookId } = req.body;
    const userId = req.user.id

    try {
      const book = await UserBookList.findOne({ where: { bookId, userId, status: "borrowed" } });
      if (!book) {
        throw { name: "NotFound", message: "Book not found" };
      }
      await book.destroy();
      res.status(200).json({ message: "Book successfully returned." });

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

