// models/itemSupplier.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Supplier = require('./Supplier');
const Item = require('./Item');

const ItemSupplier = sequelize.define(
  'ItemSupplier',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // preço do item fornecido por esse supplier
    },
    prazo_entrega: {
      type: DataTypes.STRING,
      allowNull: true, // ex: "7 dias"
    },
  },
  {
    tableName: 'ItemSuppliers',
    timestamps: false,
  }
);

// Definição dos relacionamentos N:N
Supplier.belongsToMany(Item, {
  through: ItemSupplier,
  foreignKey: 'supplierId',
});
Item.belongsToMany(Supplier, { through: ItemSupplier, foreignKey: 'itemId' });

module.exports = ItemSupplier;
