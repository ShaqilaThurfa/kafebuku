'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserBookLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Menambahkan ini jika userId harus selalu ada
        references: {
          model: 'Users', // Nama tabel User
          key: 'id' // Kolom yang dirujuk
        },
        onUpdate: 'CASCADE', // Opsi saat user di-update
        onDelete: 'SET NULL' // Opsi saat user dihapus, bisa diganti dengan CASCADE jika ingin menghapus data UserBookList
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Jika bookId juga harus ada
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      added_at: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserBookLists');
  }
};
