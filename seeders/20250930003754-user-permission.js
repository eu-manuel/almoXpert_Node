'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserPermissions',
      [
        // Emanuel Junqueira (Admin)
        { id_usuario: 1, id_permissao: 1 }, // ADMIN
        { id_usuario: 1, id_permissao: 2 }, // MANAGE_USERS
        { id_usuario: 1, id_permissao: 3 }, // MANAGE_SUPPLIERS
        { id_usuario: 1, id_permissao: 4 }, // VIEW_REPORTS
        { id_usuario: 1, id_permissao: 5 }, // EDIT_ITEMS

        // Maria Silva (Usuário limitado)
        { id_usuario: 2, id_permissao: 4 }, // VIEW_REPORTS
        { id_usuario: 2, id_permissao: 5 }, // EDIT_ITEMS

        // João Souza (Usuário limitado)
        { id_usuario: 3, id_permissao: 4 }, // VIEW_REPORTS
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserPermissions', null, {});
  },
};
