'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'Password', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password must be Input"
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
        },

      }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'Password')
  }
};
