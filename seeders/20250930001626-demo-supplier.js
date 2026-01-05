// seeders/20250930-demo-supplier.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Suppliers', [
      { nome: 'Fornecedor A', CNPJ: '00.000.000/0001-01', telefone: '11999990001', email: 'fornecedorA@example.com', endereco: 'Rua A, 100'},
      { nome: 'Fornecedor B', CNPJ: '00.000.000/0001-02', telefone: '11999990002', email: 'fornecedorB@example.com', endereco: 'Rua B, 200'},
      { nome: 'Fornecedor C', CNPJ: '00.000.000/0001-03', telefone: '11999990003', email: 'fornecedorC@example.com', endereco: 'Rua C, 300'},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Suppliers', null, {});
  }
};
