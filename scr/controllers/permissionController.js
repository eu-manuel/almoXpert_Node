const Permission = require("../models/Permission");

// Criar permissão
exports.createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    res.status(201).json(permission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas as permissões
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar permissão por ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return res.status(404).json({ error: "Permissão não encontrada" });
    res.json(permission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar permissão
exports.updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return res.status(404).json({ error: "Permissão não encontrada" });
    await permission.update(req.body);
    res.json(permission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar permissão
exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return res.status(404).json({ error: "Permissão não encontrada" });
    await permission.destroy();
    res.json({ message: "Permissão removida com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
