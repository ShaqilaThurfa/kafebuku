'use strict';

const bcrypt = require("bcrypt");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserBookList, {
        foreignKey: 'userId',
        as: 'bookLists' 
      });

      User.hasMany(models.borrowing_history, {
        foreignKey: 'userId',
        as: 'borrowingHistory' 
      });
    }
  }

  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name must be input"
        },
        notNull: {
          args: true,
          msg: "Name must be input"
        },
        len: {
          args: [5],
          msg: "Name must be at least 5 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email must be unique"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email must be input"
        },
        notNull: {
          msg: "Email must be input"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      }
    },
    password: { // Ubah ke lowercase
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password must be input"
        },
        notNull: {
          args: true,
          msg: "Password must be input"
        },
        len: {
          args: [8],
          msg: "Password must be at least 8 characters long"
        },
        is: {
          args: /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
          msg: "Password must contain at least one special character"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User"
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); // Pastikan menggunakan password yang benar
      }
    }
  });

  return User;
};
