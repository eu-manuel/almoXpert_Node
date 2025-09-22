const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");
const Warehouse = require("./Warehouse");

// Tabela intermediária (Estoque por Almoxarifado)
const ItemWarehouse = sequelize.define("ItemWarehouse", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  quantidade: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 0 
  },
  data_entrada: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW 
  },
  data_saida: { 
    type: DataTypes.DATE, 
    allowNull: true 
  }
});

// Relações N:N
Item.belongsToMany(Warehouse, { through: ItemWarehouse, foreignKey: "id_item" });
Warehouse.belongsToMany(Item, { through: ItemWarehouse, foreignKey: "id_almoxarifado" });

module.exports = ItemWarehouse;
