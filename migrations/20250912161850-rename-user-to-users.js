'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('User', 'Users');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('Users', 'User');
  }
};

