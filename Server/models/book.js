'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    coverUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    added_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};