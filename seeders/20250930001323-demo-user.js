// seeders/20250930-demo-user.js
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { nome: 'Emanuel Junqueira', email: 'emanuel@example.com', senha: bcrypt.hashSync('123456', 10), cargo: 'Admin' },
      { nome: 'Maria Silva', email: 'maria@example.com', senha: bcrypt.hashSync('123456', 10), cargo: 'User' },
      { nome: 'João Souza', email: 'joao@example.com', senha: bcrypt.hashSync('123456', 10), cargo: 'User' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
