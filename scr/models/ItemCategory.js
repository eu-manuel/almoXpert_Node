const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");
const Category = require("./Category");

// Tabela intermediária
const ItemCategory = sequelize.define("ItemCategory", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Definição das relações N:N
Item.belongsToMany(Category, { through: ItemCategory, foreignKey: "id_item" });
Category.belongsToMany(Item, { through: ItemCategory, foreignKey: "id_categoria" });

module.exports = ItemCategory;
