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
      type: DataTypes.DATE, 
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
      type: DataTypes.DATE, 
      allowNull: true, 
    }
  }, {
    sequelize,
    modelName: 'BorrowingHistory',
    tableName: 'borrowing_histories'
  });

  return BorrowingHistory;
};
