const Item = require("../models/Item");
const Category = require("../models/Category");
const ItemCategory = require("../models/ItemCategory");

// Listar todas as associações
exports.getAllRelations = async (req, res) => {
  try {
    const relations = await ItemCategory.findAll({
      include: [Item, Category]
    });
    res.json(relations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Relacionar item a categoria
exports.addRelation = async (req, res) => {
  try {
    const { itemId, categoryId } = req.body;

    const item = await Item.findByPk(itemId);
    const category = await Category.findByPk(categoryId);

    if (!item || !category) {
      return res.status(404).json({ error: "Item ou Categoria não encontrados" });
    }

    // Cria vínculo na tabela intermediária
    await ItemCategory.create({ id_item: itemId, id_categoria: categoryId });

    res.json({ message: "Relacionamento criado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remover vínculo entre item e categoria
exports.removeRelation = async (req, res) => {
  try {
    const { itemId, categoryId } = req.body;

    const relation = await ItemCategory.findOne({
      where: { id_item: itemId, id_categoria: categoryId }
    });

    if (!relation) {
      return res.status(404).json({ error: "Relacionamento não encontrado" });
    }

    await relation.destroy();
    res.json({ message: "Relacionamento removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
