'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('usuario', 'User');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('User', 'usuario');
  }
};
