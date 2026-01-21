// seeders/20250930-demo-item.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          nome: 'Parafuso',
          descricao: 'Parafuso 5mm',
          codigo_interno: 'PFS-001',
          unidade_medida: 'un',
          estoque_minimo: 100,
          estoque_maximo: 1000,
          status: 'ativo',
        },
        {
          nome: 'Porca',
          descricao: 'Porca 5mm',
          codigo_interno: 'PNC-001',
          unidade_medida: 'un',
          estoque_minimo: 100,
          estoque_maximo: 800,
          status: 'ativo',
        },
        {
          nome: 'Cabo de Rede',
          descricao: 'Cabo Cat6 1m',
          codigo_interno: 'CNR-001',
          unidade_medida: 'un',
          estoque_minimo: 50,
          estoque_maximo: 300,
          status: 'ativo',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
