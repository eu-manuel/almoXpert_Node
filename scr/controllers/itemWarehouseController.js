const ItemWarehouse = require("../models/ItemWarehouse");
const Item = require("../models/Item");
const Warehouse = require("../models/Warehouse");

// Criar vínculo (entrada de item em almoxarifado)
exports.createItemWarehouse = async (req, res) => {
  try {
    const { id_item, id_almoxarifado, quantidade, data_entrada } = req.body;

    const itemWarehouse = await ItemWarehouse.create({
      id_item,
      id_almoxarifado,
      quantidade,
      data_entrada,
    });

    res.status(201).json(itemWarehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os vínculos (estoque por almoxarifado)
exports.getItemWarehouses = async (req, res) => {
  try {
    const itemWarehouses = await ItemWarehouse.findAll({
      include: [Item, Warehouse],
    });
    res.json(itemWarehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar vínculo por ID
exports.getItemWarehouseById = async (req, res) => {
  try {
    const itemWarehouse = await ItemWarehouse.findByPk(req.params.id, {
      include: [Item, Warehouse],
    });
    if (!itemWarehouse) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }
    res.json(itemWarehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar registro de estoque (ex: saída de item)
exports.updateItemWarehouse = async (req, res) => {
  try {
    const itemWarehouse = await ItemWarehouse.findByPk(req.params.id);
    if (!itemWarehouse) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    await itemWarehouse.update(req.body);
    res.json(itemWarehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar vínculo
exports.deleteItemWarehouse = async (req, res) => {
  try {
    const itemWarehouse = await ItemWarehouse.findByPk(req.params.id);
    if (!itemWarehouse) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    await itemWarehouse.destroy();
    res.json({ message: "Registro removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
