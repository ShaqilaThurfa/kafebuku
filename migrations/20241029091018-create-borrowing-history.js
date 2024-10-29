'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('borrowing_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama tabel yang dirujuk
          key: 'id' // Kolom yang dirujuk
        },
        onUpdate: 'CASCADE', // Mengupdate data saat user di-update
        onDelete: 'CASCADE' // Menghapus data saat user dihapus
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE', // Mengupdate data saat book di-update
        onDelete: 'CASCADE' // Menghapus data saat book dihapus
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Memastikan title tidak kosong
        }
      },
      borrowed_at: {
        type: Sequelize.DATE, // Gunakan DATE untuk menyimpan tanggal dan waktu
        allowNull: false,
        validate: {
          notEmpty: true, // Memastikan borrowed_at tidak kosong
        }
      },
      returned_at: {
        type: Sequelize.DATE, // Gunakan DATE untuk menyimpan tanggal dan waktu
        allowNull: true // Bisa null jika belum dikembalikan
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
    await queryInterface.dropTable('borrowing_histories');
  }
};
