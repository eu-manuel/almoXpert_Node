const ItemWarehouse = require("../models/ItemWarehouse");
const Item = require("../models/Item");
const Warehouse = require("../models/Warehouse");
const Movement = require("../models/Movement");
const sequelize = require("../config/db");

// Criar vínculo (entrada de item em almoxarifado) COM movimentação automática
exports.createItemWarehouse = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id_item, id_almoxarifado, quantidade, data_entrada, observacao } = req.body;
    const id_usuario = req.user.id; // Do token JWT

    // 1. Criar o vínculo item-almoxarifado
    const itemWarehouse = await ItemWarehouse.create({
      id_item,
      id_almoxarifado,
      quantidade,
      data_entrada,
    }, { transaction });

    // 2. Gerar movimentação de entrada (se quantidade > 0)
    if (quantidade && quantidade > 0) {
      await Movement.create({
        tipo: "entrada",
        quantidade,
        observacao: observacao || "Entrada inicial - item adicionado ao almoxarifado",
        id_item,
        id_almoxarifado,
        id_usuario
      }, { transaction });
    }

    await transaction.commit();
    res.status(201).json(itemWarehouse);
  } catch (err) {
    await transaction.rollback();
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

// Atualizar registro de estoque COM movimentação automática
exports.updateItemWarehouse = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const itemWarehouse = await ItemWarehouse.findByPk(req.params.id, { transaction });
    if (!itemWarehouse) {
      await transaction.rollback();
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    const { quantidade: novaQuantidade, observacao, ...updateData } = req.body;
    const id_usuario = req.user.id; // Do token JWT

    // Verifica se houve alteração de quantidade
    if (novaQuantidade !== undefined && novaQuantidade !== itemWarehouse.quantidade) {
      const diferenca = novaQuantidade - itemWarehouse.quantidade;
      
      await Movement.create({
        tipo: diferenca > 0 ? "entrada" : "saida",
        quantidade: Math.abs(diferenca),
        observacao: observacao || `${diferenca > 0 ? 'Entrada' : 'Saída'} de estoque: ${Math.abs(diferenca)} unidades`,
        id_item: itemWarehouse.id_item,
        id_almoxarifado: itemWarehouse.id_almoxarifado,
        id_usuario
      }, { transaction });

      updateData.quantidade = novaQuantidade;
    }

    await itemWarehouse.update(updateData, { transaction });
    await transaction.commit();
    res.json(itemWarehouse);
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ error: err.message });
  }
};

// Deletar vínculo COM movimentação de saída (se houver quantidade)
exports.deleteItemWarehouse = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const itemWarehouse = await ItemWarehouse.findByPk(req.params.id, { transaction });
    if (!itemWarehouse) {
      await transaction.rollback();
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    const id_usuario = req.user.id; // Do token JWT
    const { observacao } = req.body || {};

    // Se houver quantidade, gerar movimentação de saída antes de deletar
    if (itemWarehouse.quantidade > 0) {
      await Movement.create({
        tipo: "saida",
        quantidade: itemWarehouse.quantidade,
        observacao: observacao || "Saída total - vínculo item-almoxarifado removido",
        id_item: itemWarehouse.id_item,
        id_almoxarifado: itemWarehouse.id_almoxarifado,
        id_usuario
      }, { transaction });
    }

    await itemWarehouse.destroy({ transaction });
    await transaction.commit();
    res.json({ message: "Registro removido com sucesso" });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};
