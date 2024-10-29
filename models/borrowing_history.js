'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BorrowingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BorrowingHistory.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      
      BorrowingHistory.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      });
    }
  }

  BorrowingHistory.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId can not be empty'
        },
        notNull: {
          args: true,
          msg: 'UserId can not be empty'
        }
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books', // Misalkan Anda memiliki model Books
        key: 'id'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'BookId can not be empty'
        },
        notNull: {
          args: true,
          msg: 'BookId can not be empty'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title can not be empty'
        },
        notNull: {
          args: true,
          msg: 'Title can not be empty'
        }
      }
    },
    borrowed_at: {
      type: DataTypes.DATE, // Gunakan DATE untuk menyimpan tanggal dan waktu
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'This column can not be empty'
        },
        notNull: {
          args: true,
          msg: 'This column can not be empty'
        }
      }
    },
    returned_at: {
      type: DataTypes.DATE, // Gunakan DATE untuk menyimpan tanggal dan waktu
      allowNull: true, // Seharusnya ini tidak perlu menjadi `false` jika belum dikembalikan
    }
  }, {
    sequelize,
    modelName: 'BorrowingHistory',
  });

  return BorrowingHistory;
};
