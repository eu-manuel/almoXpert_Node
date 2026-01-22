const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define(
  'Category',
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Categories',
    timestamps: false,
  }
);

module.exports = Category;
