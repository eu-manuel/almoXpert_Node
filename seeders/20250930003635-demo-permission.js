'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissions', [
      { nome: 'ADMIN', descricao: 'Acesso total ao sistema' },
      { nome: 'MANAGE_USERS', descricao: 'Gerenciar usuários' },
      { nome: 'MANAGE_SUPPLIERS', descricao: 'Gerenciar fornecedores' },
      { nome: 'VIEW_REPORTS', descricao: 'Visualizar relatórios' },
      { nome: 'EDIT_ITEMS', descricao: 'Editar itens do estoque' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
