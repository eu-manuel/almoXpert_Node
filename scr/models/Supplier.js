// models/supplier.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Supplier = sequelize.define(
  'Supplier',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CNPJ: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Suppliers',
    timestamps: false,
  }
);

module.exports = Supplier;
