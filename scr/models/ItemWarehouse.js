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
  id_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: "id_item"
    }
  },
  id_almoxarifado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Warehouse,
      key: "id_almoxarifado"
    }
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
},{
  tableName: "ItemWarehouses",
  timestamps: false
});

// Associações diretas para uso com include
ItemWarehouse.belongsTo(Item, { foreignKey: "id_item" });
ItemWarehouse.belongsTo(Warehouse, { foreignKey: "id_almoxarifado" });

// Relações N:N (mantidas para uso com Item.getWarehouses(), etc)
Item.belongsToMany(Warehouse, { through: ItemWarehouse, foreignKey: "id_item" });
Warehouse.belongsToMany(Item, { through: ItemWarehouse, foreignKey: "id_almoxarifado" });

module.exports = ItemWarehouse;
