const Movement = require('../models/Movement');
const Item = require('../models/Item');
const Warehouse = require('../models/Warehouse');
const User = require('../models/User');

// Criar movimentação (entrada, saída, transferência, ajuste)
exports.createMovement = async (req, res) => {
  try {
    const {
      tipo,
      quantidade,
      observacao,
      id_item,
      id_almoxarifado,
      id_usuario,
    } = req.body;

    // RN-001: Bloqueio de Saída sem Saldo
    if (tipo === 'saida') {
      const item = await Item.findByPk(id_item);
      if (!item) return res.status(404).json({ error: 'Item não encontrado' });

      if (item.estoque_minimo !== null && quantidade > item.estoque_maximo) {
        return res
          .status(400)
          .json({
            error: 'Saída não permitida: quantidade excede estoque máximo',
          });
      }
    }

    // RN-002: Justificativa Obrigatória
    if ((tipo === 'saida' || tipo === 'ajuste') && !observacao) {
      return res
        .status(400)
        .json({
          error: 'Movimentações de saída ou ajuste precisam de justificativa',
        });
    }

    const movement = await Movement.create({
      tipo,
      quantidade,
      observacao,
      id_item,
      id_almoxarifado,
      id_usuario,
    });

    res.status(201).json(movement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas as movimentações
exports.getMovements = async (req, res) => {
  try {
    const movements = await Movement.findAll({
      include: [Item, Warehouse, User],
    });
    res.json(movements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar movimentação por ID
exports.getMovementById = async (req, res) => {
  try {
    const movement = await Movement.findByPk(req.params.id, {
      include: [Item, Warehouse, User],
    });
    if (!movement)
      return res.status(404).json({ error: 'Movimentação não encontrada' });
    res.json(movement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar movimentação (⚠️ em regra real, não deveria permitir alterar movimentações já registradas → RN-005 Auditoria Imutável)
exports.updateMovement = async (req, res) => {
  try {
    const movement = await Movement.findByPk(req.params.id);
    if (!movement)
      return res.status(404).json({ error: 'Movimentação não encontrada' });

    await movement.update(req.body);
    res.json(movement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar movimentação (⚠️ também proibido em regra real → RN-005 Auditoria Imutável, só com lógica de reversão)
exports.deleteMovement = async (req, res) => {
  try {
    const movement = await Movement.findByPk(req.params.id);
    if (!movement)
      return res.status(404).json({ error: 'Movimentação não encontrada' });

    await movement.destroy();
    res.json({ message: 'Movimentação removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
