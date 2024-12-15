
const { UserBookList, BorrowingHistory, sequelize } = require("../models");

module.exports = class UserBookListController{
  static async rentBook(req, res, next) {
    const { bookId, title, author, coverUrl, description } = req.body;
  
    const transaction = await sequelize.transaction();
    try {
      
      const booklist = await UserBookList.create(
        {
          userId: req.user.id,
          bookId,
          title,
          author,
          coverUrl,
          description,
          status: "borrowed",
          added_at: new Date(),
        },
        { transaction } 
      );
  
     
      const history = await BorrowingHistory.create(
        {
          userId: req.user.id,
          bookId,
          title,
          borrowed_at: new Date(),
          returned_at: null,
        },
        { transaction } 
      );
  
      
      await transaction.commit();
  
      res.status(201).json({ booklist, history });
    } catch (error) {
      console.log(error);
  
     
      await transaction.rollback();
  
      next(error);
    }
  }
  

  static async returned(req, res, next) {
    const { bookId } = req.params;
    const userId = req.user.id;

    
    const transaction = await sequelize.transaction();
    try {
      
      const book = await UserBookList.findOne({ 
        where: { bookId, userId },
        transaction 
      });
      if (!book) {
        throw { name: "NotFound", message: "Book not found" };
      }

      await book.destroy({ transaction });

      
      const history = await BorrowingHistory.findOne({
        where: { userId, bookId, returned_at: null },
        transaction 
      });
      if (!history) {
        throw { name: "NotFound", message: "Borrowing record not found" };
      }

      
      await history.update({
        returned_at: new Date()
      }, { transaction });

      
      await transaction.commit();

      res.status(200).json({ message: "Book has been returned", data: history });
    } catch (error) {
      console.log(error);

      
      await transaction.rollback();

      next(error);
    }
  }


  static async UserBookList(req, res, next) {
    const userId = req.user.id

    try {
      const book = await UserBookList.findAll({ where: { userId, status: "borrowed" } });
      if (!book) {
        throw { name: "NotFound", message: "Book not found" };
      }
      
      res.status(200).json(book);

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

