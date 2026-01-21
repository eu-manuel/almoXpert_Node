const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define(
  'Item',
  {
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    codigo_interno: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    unidade_medida: {
      type: DataTypes.STRING,
      allowNull: false, // ex: kg, un, cx
    },
    estoque_minimo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    estoque_maximo: {
      type: DataTypes.INTEGER,
    },
    data_cadastro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'ativo', // ativo/inativo
    },
  },
  {
    tableName: 'Items',
    timestamps: false,
  }
);

module.exports = Item;
