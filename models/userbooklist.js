'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBookList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserBookList.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user' 
      });
    }
  }

  UserBookList.init({
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
          msg: 'UserId cannot be empty'
        },
        notNull: {
          msg: 'UserId cannot be null'
        }
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'BookId cannot be empty'
        },
        notNull: {
          msg: 'BookId cannot be null'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          msg: 'Title cannot be null'
        }
      }
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          msg: 'Title cannot be null'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          msg: 'Title cannot be null'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Author cannot be empty'
        },
        notNull: {
          msg: 'Author cannot be null'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status cannot be empty'
        },
        notNull: {
          msg: 'Status cannot be null'
        }
      }
    },
    added_at: {
      type: DataTypes.DATE, 
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'This column cannot be empty'
        },
        notNull: {
          msg: 'This column cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserBookList', 
  });

  return UserBookList;
};
